const STORAGE_KEY = 'taskmaster_tasks';
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const pendingCountSpan = document.getElementById('count');
const formError = document.getElementById('form-error');

const taskCategory = document.getElementById('task-category');
const courseInputGroup = document.getElementById('course-input-group');
const taskCourse = document.getElementById('task-course');
const taskUrgent = document.getElementById('task-urgent');

const filterStatus = document.getElementById('filter-status');
const filterCategory = document.getElementById('filter-category');
const searchText = document.getElementById('search-text');

let tasks = [];

taskCategory.addEventListener('change', () => {
    if (taskCategory.value === 'Kuliah') {
        courseInputGroup.style.display = 'block';
    } else {
        courseInputGroup.style.display = 'none';
        taskCourse.value = '';
    }
});

function loadTasks() {
    try {
        const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (storedTasks && Array.isArray(storedTasks)) {
            tasks = storedTasks;
        } else {
            tasks = [];
        }
    } catch (error) {
        console.error("Error loading tasks:", error);
        tasks = [];
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    updatePendingCount();
}

function renderTasks() {
    taskList.innerHTML = '';
    const currentFilterStatus = filterStatus.value;
    const currentFilterCategory = filterCategory.value;
    const currentSearchText = searchText.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(task => {
        const statusMatch = currentFilterStatus === 'all' || 
                           (currentFilterStatus === 'completed' ? task.completed : !task.completed);
        
        const categoryMatch = currentFilterCategory === 'all' || 
                              task.category === currentFilterCategory;

        const searchMatch = !currentSearchText || 
                           (task.name && task.name.toLowerCase().includes(currentSearchText)) ||
                           (task.course && task.course.toLowerCase().includes(currentSearchText));

        return statusMatch && categoryMatch && searchMatch;
    });

    filteredTasks.sort((a, b) => {
        if (a.urgent !== b.urgent) {
            return a.urgent ? -1 : 1;
        }
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        return new Date(a.deadline) - new Date(b.deadline);
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li style="text-align: center; color: #777;">Ups! Nggak ada tugas yang cocok.</li>`;
        updatePendingCount();
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.urgent ? 'urgent' : ''}`;
        li.dataset.id = task.id;
        
        const courseDisplay = (task.category === 'Kuliah' && task.course) ? ` | Matkul: ${task.course}` : '';
        
        li.innerHTML = `
            <div class="task-details">
                <div class="task-name">${task.name}</div>
                <div class="task-meta">
                    Kategori: ${task.category} ${courseDisplay} | Deadline: ${new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn" title="Edit Tugas" onclick="editTask('${task.id}')">✏️</button>
                <button class="complete-btn" title="${task.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}" onclick="toggleComplete('${task.id}')">${task.completed ? '🔄' : '✅'}</button>
                <button class="delete-btn" title="Hapus Tugas" onclick="deleteTask('${task.id}')">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    updatePendingCount();
}

function updatePendingCount() {
    const pendingCount = tasks.filter(task => !task.completed).length;
    pendingCountSpan.textContent = pendingCount;
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('task-name').value.trim();
    const categoryInput = taskCategory.value;
    const courseInput = (categoryInput === 'Kuliah' ? taskCourse.value.trim() : '');
    const deadlineInput = document.getElementById('task-deadline').value;
    const urgentInput = taskUrgent.checked;

    if (!nameInput) {
        formError.textContent = 'Nama Tugas harus diisi!';
        return;
    }
    if (!categoryInput) {
        formError.textContent = 'Kategori Tugas harus dipilih!';
        return;
    }

    const today = new Date(new Date().toDateString());
    const deadlineDate = new Date(deadlineInput);

    if (!deadlineInput || deadlineDate < today) {
        formError.textContent = 'Deadline harus valid dan tidak boleh di masa lalu.';
        return;
    }
    
    formError.textContent = '';

    const newTask = {
        id: Date.now().toString(),
        name: nameInput,
        category: categoryInput,
        course: courseInput,
        deadline: deadlineInput,
        completed: false,
        urgent: urgentInput,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskForm.reset();
    courseInputGroup.style.display = 'none';
});

window.toggleComplete = function(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
    }
}

window.deleteTask = function(id) {
    if (confirm('Yakin mau hapus tugas ini? Tindakan ini permanen.')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

window.editTask = function(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return;
    let task = tasks[taskIndex];
    
    const newName = prompt(`Edit Nama Tugas (${task.name}):`, task.name);
    if (newName === null || newName.trim() === '') {
        if (newName !== null) alert('Nama tugas nggak boleh kosong!');
        return;
    }

    let newCourse = task.course;
    if (task.category === 'Kuliah') {
         newCourse = prompt(`Edit Mata Kuliah (${task.course || '-'}):`, task.course || '');
         if (newCourse === null) return;
    }

    const newDeadline = prompt(`Edit Deadline (YYYY-MM-DD): (${task.deadline}):`, task.deadline);
    if (newDeadline === null) return;
    
    const today = new Date(new Date().toDateString());
    const deadlineDate = new Date(newDeadline);

    if (!newDeadline || isNaN(deadlineDate.getTime()) || deadlineDate < today) {
        alert('Deadline baru harus valid dan tidak boleh di masa lalu!');
        return;
    }
    
    const newUrgent = confirm(`Apakah tugas ini Urgent/Prioritas? (Saat ini: ${task.urgent ? 'YA' : 'TIDAK'})`);

    task.name = newName.trim();
    task.course = newCourse.trim();
    task.deadline = newDeadline;
    task.urgent = newUrgent;
    
    saveTasks();
    renderTasks();
}

filterStatus.addEventListener('change', renderTasks);
filterCategory.addEventListener('change', renderTasks);
searchText.addEventListener('input', renderTasks);

loadTasks();