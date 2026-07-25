// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("lifeosTasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = localStorage.getItem("lifeosTasks");

    if (tasks) {
        return JSON.parse(tasks);
    }

    return [];
}
