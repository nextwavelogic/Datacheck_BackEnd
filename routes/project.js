const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Project = require('../model/project');

// Create a new project
router.post('/create', async (req, res) => {
  const { name, description, totalCost, startDate, endDate, deadlineHours, userId,contractor_name, contractor_phonenumber,contractor_expertise} = req.body;
  const newProject = new Project({ 
    name, 
    description, 
    totalCost, 
    startDate, 
    endDate, 
    deadlineHours, 
  userId,
  contractor_name,
  contractor_phonenumber,
  contractor_expertise,
  });
  try {
    const savedProject = await newProject.save();
    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/projects', async (req, res) => {
  const { userId } = req.query;
  try {
    const projects = await Project.find({ userId }); // Directly use userId as string
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;