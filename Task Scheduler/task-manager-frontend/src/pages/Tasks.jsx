import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import "../styles/Tasks.css";

const Tasks = () => {
  const {
    tasks,
    loading,
    pagination,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({});

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setShowForm(false);
  };

  const handleUpdateTask = async (taskData) => {
    await updateTask(editingTask._id, taskData);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTasks({ ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    fetchTasks({ page: 1 });
  };

  const handlePageChange = (page) => {
    fetchTasks({ ...filters, page });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  if (loading && tasks.length === 0) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Task Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + New Task
        </button>
      </div>

      <TaskFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {(showForm || editingTask) && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              isEditing={!!editingTask}
            />
          </div>
        </div>
      )}

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          <>
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <div className="task-actions">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-meta">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>

                    {task.deadline && (
                      <span className="deadline">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="assigned-user">
                    <strong>Assigned to:</strong> {task.assignedUser?.name} (
                    {task.assignedUser?.email})
                  </div>

                  <div className="task-dates">
                    <small>
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  Previous
                </button>

                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
