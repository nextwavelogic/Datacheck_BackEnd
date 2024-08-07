const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Initialize the Express app
const app = express();
app.use(bodyParser.json());

// MongoDB connection URL
const mongoURI = 'mongodb+srv://shahjay1407:Jayrsh1234@datacheckapp.rppvwnf.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for the organization data
const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a model based on the schema
const Organization = mongoose.model('Organization', organizationSchema);

// Define a route to handle POST requests for new organizations
app.post('/add-organization', async (req, res) => {
  try {
    const { organizationName, phoneNumber, email, password } = req.body;

    // Check if the email already exists
    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new organization with the hashed password
    const newOrganization = new Organization({
      organizationName,
      phoneNumber,
      email,
      password: hashedPassword
    });

    // Save the organization to the database
    await newOrganization.save();
    res.status(201).json({ message: 'Organization added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define a route to handle GET requests to retrieve organizations
app.get('/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
