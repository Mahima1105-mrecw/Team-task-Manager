const express = require("express");

const Project = require("../models/Project");
const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// DASHBOARD STATS
router.get("/stats", authMiddleware, async (req, res) => {

    try {

        const totalProjects = await Project.countDocuments();

        const totalTasks = await Task.countDocuments();

        const completedTasks = await Task.countDocuments({
            status: "Done"
        });

        const pendingTasks = await Task.countDocuments({
            status: { $ne: "Done" }
        });

        res.json({
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;