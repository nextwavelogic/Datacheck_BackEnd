const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Your desired port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://shahjay1407:Jayrsh1234@datacheckapp.rppvwnf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mongoose Schema and Model
const projectSchema = new mongoose.Schema({
    projectId: Number,
    progress: Number
});

const Project = mongoose.model('Project', projectSchema);

// API Route to update project progress
app.post('/update-progress', async (req, res) => {
    const { projectId, progress } = req.body;

    try {
        const project = await Project.findOneAndUpdate(
            { projectId },
            { progress },
            { new: true, upsert: true }
        );

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});