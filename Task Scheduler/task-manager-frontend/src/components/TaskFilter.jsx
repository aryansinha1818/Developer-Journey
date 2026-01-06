import React from "react";
import "../styles/TaskFilter.css";

const TaskFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== undefined
  );

  return (
    <div className="task-filter">
      <h3>Filters</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="deadline">Deadline Before</label>
          <input
            type="date"
            id="deadline"
            value={filters.deadline || ""}
            onChange={(e) => handleFilterChange("deadline", e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            value={filters.sortBy || "createdAt"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="createdAt">Created Date</option>
            <option value="deadline">Deadline</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortOrder">Order</label>
          <select
            id="sortOrder"
            value={filters.sortOrder || "desc"}
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={onClearFilters} className="clear-filters">
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
