// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

// // Initialize the Express app
// const app = express();
// app.use(bodyParser.json());

// // MongoDB connection URL
// const mongoURI = 'mongodb+srv://shahjay1407:Jayrsh1234@datacheckapp.rppvwnf.mongodb.net/test?retryWrites=true&w=majority';

// // Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Define a schema for the organization data
// const organizationSchema = new mongoose.Schema({
//   organizationName: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // Define a schema for the project data
// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   totalCost: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   deadlineHours: { type: Number, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
// });

// // Create models based on the schemas
// const Organization = mongoose.model('Organization', organizationSchema);
// const Contractor = mongoose.model('Contractor', organizationSchema);
// const Project = mongoose.model('Project', projectSchema);

// // Define a route to handle POST requests for new organizations
// app.post('/add-organization', async (req, res) => {
//   try {
//     const { organizationName, phoneNumber, email, password } = req.body;

//     // Hash the password before saving
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new organization
//     const newOrganization = new Organization({
//       organizationName,
//       phoneNumber,
//       email,
//       password: hashedPassword
//     });

//     // Save the organization to the database
//     await newOrganization.save();
//     res.status(201).json({ message: 'Organization added successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Define a route to handle POST requests for new contractors
// app.post('/add-contractor', async (req, res) => {
//   try {
//     const { organizationName, phoneNumber, email, password } = req.body;

//     // Hash the password before saving
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new contractor
//     const newContractor = new Contractor({
//       organizationName,
//       phoneNumber,
//       email,
//       password: hashedPassword
//     });

//     // Save the contractor to the database
//     await newContractor.save();
//     res.status(201).json({ message: 'Contractor added successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Define a route to handle POST requests for login
// app.post('/login', async (req, res) => {
//   const { email, password, userType } = req.body;

//   try {
//     let user;
//     if (userType === 'Client') {
//       user = await Organization.findOne({ email });
//     } else if (userType === 'Contractor') {
//       user = await Contractor.findOne({ email });
//     }

//     if (!user) {
//       console.log(`Server running on port`);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the hashed password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Fetch the projects for the logged-in user
//     const projects = await Project.find({ userId: user._id });
//     res.status(200).json({ message: 'Login successful', projects });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Define a route to handle GET requests to retrieve organizations
// app.get('/organizations', async (req, res) => {
//   try {
//     const organizations = await Organization.find();
//     res.status(200).json(organizations);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Define a route to handle GET requests to retrieve contractors
// app.get('/contractors', async (req, res) => {
//   try {
//     const contractors = await Contractor.find();
//     res.status(200).json(contractors);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Define a route to handle POST requests for creating projects
// app.post('/create-project', async (req, res) => {
//   try {
//     const { name, description, totalCost, startDate, endDate, deadlineHours, userId } = req.body;

//     // Create a new project
//     const newProject = new Project({
//       name,
//       description,
//       totalCost,
//       startDate,
//       endDate,
//       deadlineHours,
//       userId
//     });

//     // Save the project to the database
//     await newProject.save();
//     res.status(201).json({ message: 'Project created successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Define a route to handle GET requests for projects
// app.get('/projects', async (req, res) => {
//   let contractorPhoneNumber = req.query.contractor_phonenumber;
//   contractorPhoneNumber = contractorPhoneNumber.trim(); // Trim the newline character

//   try {
//     const projects = await Project.find({ contractor_phonenumber: contractorPhoneNumber });
//     res.json(projects);
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
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

// Define a schema for the project data
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  totalCost: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  deadlineHours: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
});

// Create models based on the schemas
const Organization = mongoose.model('Organization', organizationSchema);
const Contractor = mongoose.model('Contractor', organizationSchema);
const Project = mongoose.model('Project', projectSchema);

// Define a route to handle POST requests for new organizations
app.post('/add-organization', async (req, res) => {
  try {
    const { organizationName, phoneNumber, email, password } = req.body;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new organization
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

// Define a route to handle POST requests for new contractors
app.post('/add-contractor', async (req, res) => {
  try {
    const { organizationName, phoneNumber, email, password } = req.body;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new contractor
    const newContractor = new Contractor({
      organizationName,
      phoneNumber,
      email,
      password: hashedPassword
    });

    // Save the contractor to the database
    await newContractor.save();
    res.status(201).json({ message: 'Contractor added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define a route to handle POST requests for login
app.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    if (userType === 'Client') {
      user = await Organization.findOne({ email });
    } else if (userType === 'Contractor') {
      console.log('E>>>>>>>>>>>${I a am inside contracotr}');
      user = await Contractor.findOne({ email });
      console.log(user);
    }


    if (!user) {
      console.log('I m inside if(!user)');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Fetch the projects for the logged-in user
    const projects = await Project.find({ userId: user._id });
    res.status(200).json({ message: 'Login successful', projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Define a route to handle GET requests to retrieve contractors
app.get('/contractors', async (req, res) => {
  try {
    const contractors = await Contractor.find();
    res.status(200).json(contractors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define a route to handle POST requests for creating projects
app.post('/create-project', async (req, res) => {
  try {
    const { name, description, totalCost, startDate, endDate, deadlineHours, userId } = req.body;

    // Create a new project
    const newProject = new Project({
      name,
      description,
      totalCost,
      startDate,
      endDate,
      deadlineHours,
      userId
    });

    // Save the project to the database
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define a route to handle GET requests for projects
app.get('/projects', async (req, res) => {
  let contractorPhoneNumber = req.query.contractor_phonenumber;
  contractorPhoneNumber = contractorPhoneNumber.trim(); // Trim the newline character

  try {
    const projects = await Project.find({ contractor_phonenumber: contractorPhoneNumber });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
