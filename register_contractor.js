const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://shahjay1407:Jayrsh1234@datacheckapp.rppvwnf.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  expertise: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Organization = mongoose.model('Contractors', organizationSchema);

app.post('/add-contractors', async (req, res) => {
  try {
    const { organizationName, phoneNumber, expertise, email, password } = req.body;

    // Check if the email already exists
    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newOrganization = new Organization({
      organizationName,
      phoneNumber,
      expertise,
      email,
      password: hashedPassword
    });

    await newOrganization.save();
    res.status(201).json({ message: 'Organization added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/contractors', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
