(function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let showCompleted = false;

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const activeTasks = document.getElementById("activeTasks");
    const completedTasks = document.getElementById("completedTasks");
    const activeCount = document.getElementById("activeCount");
    const toggleCompletedBtn = document.getElementById("toggleCompletedBtn");
    const completedSection = document.getElementById("completedSection");

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const text = taskInput.value.trim();
        if (!text) return;

        tasks.push({
            id: Date.now(),
            text,
            completed: false
        });

        saveTasks();
        taskInput.value = "";
        taskInput.focus();
        render();
    });

    toggleCompletedBtn.addEventListener("click", function () {
        showCompleted = !showCompleted;
        render();
    });

    function render() {
        const pendingTasks = tasks.filter(function (task) {
            return !task.completed;
        });

        const completed = tasks.filter(function (task) {
            return task.completed;
        });

        activeCount.textContent = pendingTasks.length + " active";
        activeTasks.innerHTML = "";
        completedTasks.innerHTML = "";

        if (pendingTasks.length === 0) {
            activeTasks.innerHTML = '<div class="empty">No pending tasks yet.</div>';
        } else {
            pendingTasks.forEach(function (task) {
                activeTasks.appendChild(createTaskItem(task, false));
            });
        }

        if (completed.length === 0) {
            completedTasks.innerHTML = '<div class="empty">No completed tasks yet.</div>';
        } else {
            completed.forEach(function (task) {
                completedTasks.appendChild(createTaskItem(task, true));
            });
        }

        completedSection.classList.toggle("hidden", !showCompleted || completed.length === 0);
        toggleCompletedBtn.textContent = showCompleted ? "Hide completed" : "Show completed";
    }

    function createTaskItem(task, isCompleted) {
        const item = document.createElement("div");
        item.className = "task-item" + (isCompleted ? " completed" : "");

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const actionBtn = document.createElement("button");
        actionBtn.className = isCompleted ? "secondary-btn" : "primary-btn";
        actionBtn.textContent = isCompleted ? "Restore" : "Complete";
        actionBtn.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            render();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "danger-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            const index = tasks.findIndex(function (entry) {
                return entry.id === task.id;
            });
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTasks();
                render();
            }
        });

        actions.append(actionBtn, deleteBtn);
        item.append(text, actions);
        return item;
    }
    render();
})();