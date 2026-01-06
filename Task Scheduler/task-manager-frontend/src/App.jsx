import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <TaskProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Layout>
        </TaskProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
