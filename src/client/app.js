let tasks = [];

// Get the form element
const form = document.getElementById('task-form');

// Handle form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form submission (refreshing the page)
    event.preventDefault();

    // Get the values from the inputs
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Create new task object
    const newTask = {
        title: title,
        description: description
    };

    // Add the task to the array
    tasks.push(newTask);

    // Log the tasks array
    console.log(tasks);

    // Reset form inputs
    form.reset();
});