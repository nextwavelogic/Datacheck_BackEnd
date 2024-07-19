const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/create', async (req, res) => {
  const { name, description, totalCost, startDate, endDate, deadlineHours, userId } = req.body;
  const newProject = new Project({ name, description, totalCost, startDate, endDate, deadlineHours, userId });
  try {
    const savedProject = await newProject.save();
    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get projects for a user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const projects = await Project.find({ userId });
    res.send({ projects });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
