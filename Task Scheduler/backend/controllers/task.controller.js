const Task = require("../models/task.model");
const User = require("../models/user.model");

const createTask = async (req, res) => {
  try {
    const { title, description, status, deadline, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and assignedTo are required" });
    }

    let user;

    if (assignedTo.includes("@")) {
      user = await User.findOne({ email: assignedTo });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User with this email does not exist" });
      }
    } else {
      user = await User.findOne({ name: assignedTo });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User with this name does not exist" });
      }
    }

    const task = new Task({
      title,
      description,
      status,
      deadline,
      assignedUser: user._id,
    });

    await task.save();
    await task.populate("assignedUser", "name email");

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const {
      status,
      deadline,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (deadline) {
      filter.deadline = {
        $lte: new Date(deadline),
      };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(filter)
      .populate("assignedUser", "name email")
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip);

    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / parseInt(limit));

    res.status(200).json({
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalTasks,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      filters: {
        status,
        deadline,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline, assignedTo } = req.body;

    const updates = { title, description, status, deadline };

    if (assignedTo) {
      let user;

      if (assignedTo.includes("@")) {
        user = await User.findOne({ email: assignedTo });
        if (!user) {
          return res
            .status(404)
            .json({ message: "User with this email does not exist" });
        }
      } else {
        user = await User.findOne({ name: assignedTo });
        if (!user) {
          return res
            .status(404)
            .json({ message: "User with this name does not exist" });
        }
      }

      updates.assignedUser = user._id;
    }

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("assignedUser", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
