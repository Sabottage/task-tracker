const mongoose = require('mongoose');

// Define the schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Create the model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;