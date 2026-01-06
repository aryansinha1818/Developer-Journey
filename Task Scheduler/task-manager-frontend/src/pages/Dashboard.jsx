import { useTasks } from "../context/TaskContext";
import { useUsers } from "../context/UserContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { users } = useUsers();

  const stats = {
    totalTasks: tasks.length,
    pendingTasks: tasks.filter((task) => task.status === "pending").length,
    inProgressTasks: tasks.filter((task) => task.status === "in-progress")
      .length,
    completedTasks: tasks.filter((task) => task.status === "completed").length,
    totalUsers: users.length,
    overdueTasks: tasks.filter(
      (task) =>
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== "completed"
    ).length,
  };

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-number">{stats.totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="stat-number pending">{stats.pendingTasks}</div>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <div className="stat-number in-progress">{stats.inProgressTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <div className="stat-number completed">{stats.completedTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Overdue</h3>
          <div className="stat-number overdue">{stats.overdueTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-number">{stats.totalUsers}</div>
        </div>
      </div>

      <div className="recent-tasks">
        <h2>Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          <div className="tasks-list">
            {recentTasks.map((task) => (
              <div key={task._id} className="task-item">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span>Assigned to: {task.assignedUser?.name}</span>
                  {task.deadline && (
                    <span>
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
