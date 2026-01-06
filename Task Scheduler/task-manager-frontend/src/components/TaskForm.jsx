import React, { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";
import "../styles/Tasks.css";

const TaskForm = ({ task, onSubmit, onCancel, isEditing = false }) => {
  const { users } = useUsers();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    deadline: "",
    assignedTo: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        deadline: task.deadline ? task.deadline.split("T")[0] : "",
        assignedTo: task.assignedUser?.email || task.assignedUser?.name || "",
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.assignedTo.trim())
      newErrors.assignedTo = "Assigned user is required";
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      newErrors.deadline = "Deadline cannot be in the past";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? "error" : ""}
        />
        {errors.deadline && (
          <span className="error-text">{errors.deadline}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assignedTo">Assigned To * (Email or Name)</label>
        <input
          type="text"
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className={errors.assignedTo ? "error" : ""}
          placeholder="Enter email or name"
        />
        {errors.assignedTo && (
          <span className="error-text">{errors.assignedTo}</span>
        )}
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {isEditing ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
