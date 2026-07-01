const express = require("express");

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT
router.post("/", authMiddleware, async (req, res) => {

    try {

        // only admin can create project
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const { title, description, members } = req.body;

        const project = await Project.create({
            title,
            description,
            members,
            createdBy: req.user.id
        });

        res.status(201).json(project);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});



// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await Project.find()
        .populate("members", "name email")
        .populate("createdBy", "name email");

        res.json(projects);

    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;