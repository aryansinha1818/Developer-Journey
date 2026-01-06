import React, { createContext, useContext, useState, useEffect } from "react";
import { taskService } from "../services/api";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({});

  const fetchTasks = async (params = {}) => {
    setLoading(true);
    try {
      const response = await taskService.getTasks(params);
      setTasks(response.tasks);
      setPagination(response.pagination);
      setFilters(response.filters);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      await fetchTasks();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      await fetchTasks();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    loading,
    pagination,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
