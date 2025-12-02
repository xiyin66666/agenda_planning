class AgendaApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('agendaTasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.displayCurrentDate();
        this.loadTasks();
        this.setupEventListeners();
        this.updateStats();
    }

    displayCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('current-date').textContent = 
            now.toLocaleDateString('en-US', options);
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('add-task-btn').addEventListener('click', () => this.addTask());
        
        // Enter key in input field
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.loadTasks();
            });
        });

        // Clear completed tasks
        document.getElementById('clear-completed').addEventListener('click', () => this.clearCompleted());

        // Save tasks
        document.getElementById('save-tasks').addEventListener('click', () => this.saveToLocalStorage());
    }

    addTask() {
        const input = document.getElementById('task-input');
        const priority = document.getElementById('priority-select').value;
        const time = document.getElementById('task-time').value;
        const title = input.value.trim();

        if (title === '') {
            alert('Please enter a task description');
            return;
        }

        const task = {
            id: Date.now(),
            title: title,
            priority: priority,
            time: time,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task); // Add to beginning
        this.saveToLocalStorage();
        this.loadTasks();
        input.value = '';
        input.focus();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
        this.loadTasks();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
            this.loadTasks();
        }
    }

    clearCompleted() {
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveToLocalStorage();
            this.loadTasks();
        }
    }

    loadTasks() {
        const taskList = document.getElementById('task-list');
        
        // Filter tasks based on current filter
        let filteredTasks = this.tasks;
        if (this.currentFilter === 'pending') {
            filteredTasks = this.tasks.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {
            filteredTasks = this.tasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No ${this.currentFilter === 'all' ? '' : this.currentFilter} tasks yet</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" 
                       ${task.completed ? 'checked' : ''}
                       onchange="app.toggleTask(${task.id})">
                <div class="task-content">
                    <div class="task-title ${task.completed ? 'completed' : ''}">
                        ${this.escapeHtml(task.title)}
                    </div>
                    <div class="task-meta">
                        <span><i class="far fa-clock"></i> ${task.time}</span>
                        <span class="priority priority-${task.priority}">
                            <i class="fas fa-flag"></i> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                    </div>
                </div>
                <div class="task-actions">
                    <button onclick="app.deleteTask(${task.id})" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        this.updateStats();
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        // Today's tasks
        const today = new Date().toDateString();
        const todayTasks = this.tasks.filter(task => {
            const taskDate = new Date(task.createdAt).toDateString();
            return taskDate === today;
        }).length;

        document.getElementById('total-tasks').textContent = `${totalTasks} tasks`;
        document.getElementById('completed-tasks').textContent = `${completedTasks} completed`;
        document.getElementById('completion-rate').textContent = `${completionRate}%`;
        document.getElementById('today-count').textContent = todayTasks;
    }

    saveToLocalStorage() {
        localStorage.setItem('agendaTasks', JSON.stringify(this.tasks));
        this.updateStats();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AgendaApp();
});