const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Connect to database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use the routes for CRUD operations
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});