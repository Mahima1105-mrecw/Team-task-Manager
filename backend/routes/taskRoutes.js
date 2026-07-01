const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, dueDate, project, assignedTo } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            project,
            assignedTo
        });

        res.status(201).json(task);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});



// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
        .populate("project", "title")
        .populate("assignedTo", "name email");

        res.json(tasks);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});



// UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(updatedTask);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;