import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({});
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchStats();
        fetchProjects();
        fetchTasks();

    }, []);

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/dashboard/stats",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setStats(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/projects",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setProjects(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/tasks",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="dashboard-container">

            <button
                onClick={handleLogout}
                style={{
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    float: "right"
                }}
            >
                Logout
            </button>

            <h1 className="dashboard-title">
                Team Task Manager Dashboard
            </h1>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total Projects</h3>
                    <p>{stats.totalProjects}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p>{stats.totalTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Completed Tasks</h3>
                    <p>{stats.completedTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Pending Tasks</h3>
                    <p>{stats.pendingTasks}</p>
                </div>

            </div>

            <h2 className="section-title">
                Projects
            </h2>

            <div>

                {projects.map((project) => (

                    <div
                        key={project._id}
                        className="card"
                    >

                        <h3>{project.title}</h3>

                        <p>{project.description}</p>

                    </div>

                ))}

            </div>

            <h2 className="section-title">
                Tasks
            </h2>

            <div>

                {tasks.map((task) => (

                    <div
                        key={task._id}
                        className="card"
                    >

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            <strong>Status:</strong> {task.status}
                        </p>

                        <p>
                            <strong>Project:</strong> {task.project?.title}
                        </p>

                        <p>
                            <strong>Due Date:</strong>{" "}
                            {new Date(task.dueDate).toLocaleDateString()}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Dashboard;