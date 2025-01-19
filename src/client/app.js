let tasks = [];
let currentEditIndex = null;

// Load tasks from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    displayTasks(); // Display tasks after loading them
})

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const submitButton = document.getElementById('submit-btn');
const taskHeader = document.getElementById('task-header');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent refreshing the page

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const newTask = {
        title: title,
        description: description
    };

    if (currentEditIndex !== null) {
        tasks[currentEditIndex] = newTask;
        currentEditIndex = null;
        submitButton.textContent = 'Add Task';
    } else {
        tasks.push(newTask);
    }

    displayTasks();

    // Save tasks to localStorage after adding a new task
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear form fields after submission
    form.reset();
});

function displayTasks() {
    taskList.innerHTML = ""; // Clear the existing tasks

    if (tasks.length === 0) {
        taskHeader.textContent = 'No tasks added yet';
        return;
    }

    taskHeader.textContent = 'Task List';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('mb-2', 'border', 'border-gray-300', 'p-2', 'rounded');

        const title = document.createElement('h3');
        title.classList.add('font-bold');
        title.textContent = task.title;

        const description = document.createElement('p');
        description.textContent = task.description;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        const editButton = document.createElement('button');
        editButton.classList.add('bg-yellow-500', 'text-white', 'px-2', 'py-1', 'rounded', 'hover:bg-yellow-600');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));

        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1); // Remove 1 task at the given index
    displayTasks();

    // Save updated tasks to localStorage after deletion
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(index) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    title.value = tasks[index].title;
    description.value = tasks[index].description;

    currentEditIndex = index;
    submitButton.textContent = 'Edit Task';
}