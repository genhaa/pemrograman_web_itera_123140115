document.addEventListener('DOMContentLoaded', () => {

    class Item {
        constructor(id, selesai = false) {
            this.id = id;
            this.selesai = selesai;
        }

        toggleSelesai() {
            this.selesai = !this.selesai;
        }
    }

    class Tugas extends Item {
        constructor(id, nama, deadline, selesai = false) {
            super(id, selesai);
            this.nama = nama;
            this.deadline = deadline; 
        }
    }

    class Buku extends Item {
        constructor(id, judul, target, platform, selesai = false) {
            super(id, selesai);
            this.judul = judul;
            this.target = target;
            this.platform = platform;
        }
    }

    let daftarTugas = [];
    let daftarBuku = [];
    let currentDate = new Date(); 

    const tugasList = document.getElementById('tugas-list');
    const bukuList = document.getElementById('buku-list');
    
    const addTugasBtn = document.getElementById('add-tugas-btn');
    const tugasModal = document.getElementById('tugas-modal');
    const tugasModalTitle = document.getElementById('tugas-modal-title');
    const tugasForm = document.getElementById('tugas-form');
    const tugasIdInput = document.getElementById('tugas-id');
    const namaTugasInput = document.getElementById('nama-tugas');
    const deadlineTugasInput = document.getElementById('deadline-tugas');
    
    const addBukuBtn = document.getElementById('add-buku-btn');
    const bukuModal = document.getElementById('buku-modal');
    const bukuModalTitle = document.getElementById('buku-modal-title');
    const bukuForm = document.getElementById('buku-form');
    const bukuIdInput = document.getElementById('buku-id');
    const judulBukuInput = document.getElementById('judul-buku');
    const targetBukuInput = document.getElementById('target-buku');
    const platformBukuInput = document.getElementById('platform-buku');

    const modalBackdrop = document.getElementById('modal-backdrop');

    const currentMonthYearEl = document.getElementById('current-month-year');
    const calendarDaysEl = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');

    const brainDumpArea = document.getElementById('brain-dump-area');
    const saveBrainDumpBtn = document.getElementById('save-brain-dump-btn');

    const loadData = (key) => {
        return new Promise(resolve => {
            setTimeout(() => { 
                const data = localStorage.getItem(key);
                resolve(data ? JSON.parse(data) : null);
            }, 200);
        });
    };

    const saveData = (key, data) => {
        return new Promise(resolve => {
            setTimeout(() => { 
                localStorage.setItem(key, JSON.stringify(data));
                resolve();
            }, 100);
        });
    };

    const openModal = (modal) => {
        modal.classList.remove('hidden');
        modalBackdrop.classList.remove('hidden');
    };

    const closeModal = () => {
        tugasModal.classList.add('hidden');
        bukuModal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');
        
        tugasForm.reset();
        bukuForm.reset();
        tugasIdInput.value = '';
        bukuIdInput.value = '';
        tugasModalTitle.textContent = 'Tambah Tugas Baru';
        bukuModalTitle.textContent = 'Tambah Buku Baru';
    };

    const renderTugasList = () => {
        tugasList.innerHTML = ''; 
        if (daftarTugas.length === 0) {
            tugasList.innerHTML = '<li class="empty-state">Belum ada tugas, nih.</li>';
            return;
        }
        
        daftarTugas.forEach(tugas => {
            const li = document.createElement('li');
            li.dataset.id = tugas.id;
            li.className = tugas.selesai ? 'done' : '';

            li.innerHTML = `
                <div class="item-info">
                    <input type="checkbox" class="toggle-selesai" data-type="tugas" ${tugas.selesai ? 'checked' : ''}>
                    <div class="item-text">
                        <span>${tugas.nama}</span>
                        <small>Deadline: ${tugas.deadline}</small>
                    </div>
                </div>
                <div class="item-controls">
                    <button class="edit-btn" data-type="tugas">✏️</button>
                    <button class="delete-btn" data-type="tugas">🗑️</button>
                </div>
            `;
            tugasList.appendChild(li);
        });
    };

    const renderBukuList = () => {
        bukuList.innerHTML = ''; 
        if (daftarBuku.length === 0) {
            bukuList.innerHTML = '<li class="empty-state">Belum ada buku, nih.</li>';
            return;
        }

        daftarBuku.forEach(buku => {
            const li = document.createElement('li');
            li.dataset.id = buku.id;
            li.className = buku.selesai ? 'done' : '';

            li.innerHTML = `
                <div class="item-info">
                    <input type="checkbox" class="toggle-selesai" data-type="buku" ${buku.selesai ? 'checked' : ''}>
                    <div class="item-text">
                        <span>${buku.judul}</span>
                        <small>${buku.target} | Platform: ${buku.platform}</small>
                    </div>
                </div>
                <div class="item-controls">
                    <button class="edit-btn" data-type="buku">✏️</button>
                    <button class="delete-btn" data-type="buku">🗑️</button>
                </div>
            `;
            bukuList.appendChild(li);
        });
    };

    const renderKalender = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); 

        const today = new Date();
        const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        currentMonthYearEl.textContent = currentDate.toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric'
        });

        calendarDaysEl.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const deadlines = daftarTugas.map(tugas => tugas.deadline); 

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDaysEl.innerHTML += '<div class="empty-day"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            if (dateString === todayString) {
                dayEl.classList.add('today');
            }

            if (deadlines.includes(dateString)) {
                dayEl.classList.add('has-deadline');
            }
            
            calendarDaysEl.appendChild(dayEl);
        }
    };

    const handleTugasFormSubmit = async (e) => {
        e.preventDefault();
        const id = tugasIdInput.value;
        const nama = namaTugasInput.value;
        const deadline = deadlineTugasInput.value;

        if (id) {
            const tugas = daftarTugas.find(t => t.id == id); 
            if (tugas) {
                tugas.nama = nama;
                tugas.deadline = deadline;
            }
        } else {
            const newTugas = new Tugas(Date.now(), nama, deadline);
            daftarTugas.push(newTugas);
        }

        await saveData('daftarTugas', daftarTugas);
        renderTugasList();
        renderKalender(); 
        closeModal();
    };

    const handleBukuFormSubmit = async (e) => {
        e.preventDefault();
        const id = bukuIdInput.value;
        const judul = judulBukuInput.value;
        const target = targetBukuInput.value;
        const platform = platformBukuInput.value;

        if (id) {
            const buku = daftarBuku.find(b => b.id == id);
            if (buku) {
                buku.judul = judul;
                buku.target = target;
                buku.platform = platform;
            }
        } else {
            const newBuku = new Buku(Date.now(), judul, target, platform);
            daftarBuku.push(newBuku);
        }

        await saveData('daftarBuku', daftarBuku);
        renderBukuList();
        closeModal();
    };

    const handleTugasListClick = async (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;
        
        const id = li.dataset.id;
        const tugas = daftarTugas.find(t => t.id == id);
        if (!tugas) return;

        if (target.classList.contains('delete-btn')) {
            daftarTugas = daftarTugas.filter(t => t.id != id); 
            await saveData('daftarTugas', daftarTugas);
            renderTugasList();
            renderKalender(); 
        } else if (target.classList.contains('edit-btn')) {
            tugasModalTitle.textContent = 'Edit Tugas';
            tugasIdInput.value = tugas.id;
            namaTugasInput.value = tugas.nama;
            deadlineTugasInput.value = tugas.deadline;
            openModal(tugasModal);
        } else if (target.classList.contains('toggle-selesai')) {
            tugas.toggleSelesai();
            await saveData('daftarTugas', daftarTugas);
            renderTugasList();
        }
    };
    
    const handleBukuListClick = async (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;
        
        const id = li.dataset.id;
        const buku = daftarBuku.find(b => b.id == id);
        if (!buku) return;

        if (target.classList.contains('delete-btn')) {
            daftarBuku = daftarBuku.filter(b => b.id != id);
            await saveData('daftarBuku', daftarBuku);
            renderBukuList();
        } else if (target.classList.contains('edit-btn')) {
            bukuModalTitle.textContent = 'Edit Buku';
            bukuIdInput.value = buku.id;
            judulBukuInput.value = buku.judul;
            targetBukuInput.value = buku.target;
            platformBukuInput.value = buku.platform;
            openModal(bukuModal);
        } else if (target.classList.contains('toggle-selesai')) {
            buku.toggleSelesai();
            await saveData('daftarBuku', daftarBuku);
            renderBukuList();
        }
    };

    const changeMonth = (offset) => {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderKalender();
    };

    const handleSaveBrainDump = async () => {
        await saveData('brainDump', brainDumpArea.value);
        saveBrainDumpBtn.textContent = 'Tersimpan!';
        setTimeout(() => {
            saveBrainDumpBtn.textContent = 'Simpan';
        }, 1500);
    };

    const initApp = async () => {
        const [tugasData, bukuData, brainDumpData] = await Promise.all([
            loadData('daftarTugas'),
            loadData('daftarBuku'),
            loadData('brainDump')
        ]);

        daftarTugas = (tugasData || []).map(t => new Tugas(t.id, t.nama, t.deadline, t.selesai));
        daftarBuku = (bukuData || []).map(b => new Buku(b.id, b.judul, b.target, b.platform, b.selesai));
        brainDumpArea.value = brainDumpData || '';

        renderTugasList();
        renderBukuList();
        renderKalender();
    };

    addTugasBtn.addEventListener('click', () => openModal(tugasModal));
    addBukuBtn.addEventListener('click', () => openModal(bukuModal));
    modalBackdrop.addEventListener('click', closeModal);

    tugasForm.addEventListener('submit', handleTugasFormSubmit);
    bukuForm.addEventListener('submit', handleBukuFormSubmit);

    tugasList.addEventListener('click', handleTugasListClick);
    bukuList.addEventListener('click', handleBukuListClick);

    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));

    saveBrainDumpBtn.addEventListener('click', handleSaveBrainDump);

    initApp();
});