document.addEventListener('DOMContentLoaded', () => {
    // 定义书籍数据
    const books = [
        { id: 'BX1', name: '必修一' },
        { id: 'BX2', name: '必修二' },
        { id: 'BX3', name: '必修三' },
        { id: 'XBX1', name: '选择性必修一' },
        { id: 'XBX2', name: '选择性必修二' },
        { id: 'XBX3', name: '选择性必修三' },
        { id: 'XBX4', name: '选择性必修四' }
    ];

    // DOM元素
    const bookSelection = document.getElementById('book-selection');
    const unitSection = document.getElementById('unit-section');
    const unitSelection = document.getElementById('unit-selection');
    const playerSection = document.getElementById('player-section');
    const currentSelection = document.getElementById('current-selection');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const themeToggle = document.getElementById('theme-toggle');

    // 当前状态
    let currentBook = null;
    let currentUnit = null;

    // 生成书籍卡片
    function renderBooks() {
        bookSelection.innerHTML = '';
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'bg-white rounded-lg shadow p-4 text-center card-hover cursor-pointer';
            bookCard.innerHTML = `
                <div class="text-primary text-2xl mb-2"><i class="fa fa-book"></i></div>
                <h3 class="font-medium">${book.name}</h3>
            `;
            bookCard.addEventListener('click', () => selectBook(book));
            bookSelection.appendChild(bookCard);
        });
    }

    // 生成单元卡片
    function renderUnits() {
        unitSelection.innerHTML = '';
        for (let i = 1; i <= 4; i++) {
            const unitCard = document.createElement('div');
            unitCard.className = 'bg-white rounded-lg shadow p-4 text-center card-hover cursor-pointer';
            unitCard.innerHTML = `
                <div class="text-secondary text-2xl mb-2"><i class="fa fa-list-ol"></i></div>
                <h3 class="font-medium">第${i}单元</h3>
            `;
            unitCard.addEventListener('click', () => selectUnit(i));
            unitSelection.appendChild(unitCard);
        }
    }

    // 选择书籍
    function selectBook(book) {
        currentBook = book;
        currentUnit = null;
        unitSection.classList.remove('hidden');
        playerSection.classList.add('hidden');
        renderUnits();
        // 高亮选中的书籍
        document.querySelectorAll('#book-selection > div').forEach(card => {
            card.classList.remove('ring-2', 'ring-primary');
        });
        event.currentTarget.classList.add('ring-2', 'ring-primary');
    }

    // 选择单元
    function selectUnit(unit) {
        currentUnit = unit;
        playerSection.classList.remove('hidden');
        currentSelection.textContent = `${currentBook.name} - 第${currentUnit}单元`;
        audioPlayer.src = `https://vip.123pan.cn/1821587641/WordsAudio/${currentBook.id}/U${currentUnit}.mp3`;
        // 重置播放按钮
        playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
        // 高亮选中的单元
        document.querySelectorAll('#unit-selection > div').forEach(card => {
            card.classList.remove('ring-2', 'ring-secondary');
        });
        event.currentTarget.classList.add('ring-2', 'ring-secondary');
        // 更新导航按钮状态
        updateNavButtons();
    }

    // 更新导航按钮状态
    function updateNavButtons() {
        prevBtn.disabled = currentUnit <= 1;
        nextBtn.disabled = currentUnit >= 4;
    }

    // 播放/暂停切换
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
        }
    });

    // 上一单元
    prevBtn.addEventListener('click', () => {
        if (currentUnit > 1) {
            selectUnit(currentUnit - 1);
            // 自动播放
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
        }
    });

    // 下一单元
    nextBtn.addEventListener('click', () => {
        if (currentUnit < 4) {
            selectUnit(currentUnit + 1);
            // 自动播放
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
        }
    });

    // 音频播放结束时自动播放下一个
    audioPlayer.addEventListener('ended', () => {
        if (currentUnit < 4) {
            selectUnit(currentUnit + 1);
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
        }
    });

    // 主题切换
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('fa-moon-o')) {
            icon.classList.replace('fa-moon-o', 'fa-sun-o');
        } else {
            icon.classList.replace('fa-sun-o', 'fa-moon-o');
        }
    });

    // 初始化页面
    renderBooks();
});
