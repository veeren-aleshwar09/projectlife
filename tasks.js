(function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = [];

    function saveTasks() {
        localStorage.setItem("lifeosTasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        try {
            return JSON.parse(localStorage.getItem("lifeosTasks") || "[]");
        } catch (error) {
            return [];
        }
    }

    function renderTasks() {
        if (!taskList) return;

        taskList.innerHTML = "";

        if (tasks.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "No tasks yet. Add one above.";
            empty.style.opacity = "0.7";
            taskList.appendChild(empty);
            return;
        }

        tasks.forEach((task) => {
            const taskItem = document.createElement("div");

            taskItem.className = `task${task.completed ? " completed" : ""}`;
            taskItem.dataset.id = task.id;

            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button class="delete">Delete</button>
            `;

            taskList.appendChild(taskItem);
        });
    }

    function updateDashboard() {

        const totalTasks = document.getElementById("totalTasks");
        const completedTasks = document.getElementById("completedTasks");
        const pendingTasks = document.getElementById("pendingTasks");
        const progressPercent = document.getElementById("progressPercent");

        const total = tasks.length;

        const completed = tasks.filter(task => task.completed).length;

        const pending = total - completed;

        const progress = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        totalTasks.textContent = total;

        completedTasks.textContent = completed;

        pendingTasks.textContent = pending;

        progressPercent.textContent = `${progress}%`;

        const progressFill = document.getElementById("progressFill");
        const progressText = document.getElementById("progressText");

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${progress}%`;

    }

    function addTask() {

        const text = taskInput.value.trim();

        if (!text) return;

        tasks.unshift({
            id: Date.now(),
            text: text,
            completed: false
        });

        saveTasks();

        taskInput.value = "";

        renderTasks();
        updateDashboard();

    }

    function toggleTask(id) {

        tasks = tasks.map(task => {

            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;

        });

        saveTasks();

        renderTasks();
        updateDashboard();

    }

    function deleteTask(id) {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();

        renderTasks();
        updateDashboard();

    }

    function bindEvents() {

        addTaskBtn.addEventListener("click", addTask);

        taskInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                addTask();

            }

        });

        taskList.addEventListener("click", (event) => {

            if (event.target.classList.contains("delete")) {

                const task = event.target.closest(".task");

                deleteTask(Number(task.dataset.id));

            }

        });

        taskList.addEventListener("change", (event) => {

            if (event.target.type === "checkbox") {

                const task = event.target.closest(".task");

                toggleTask(Number(task.dataset.id));

            }

        });

    }

    function init() {

        tasks = loadTasks();

        bindEvents();

        renderTasks();
        updateDashboard();

    }

    init();

})();