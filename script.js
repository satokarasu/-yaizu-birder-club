const quizData = [
    {
        question: "焼津でよく見られる、魚を捕る際に水面に急降下する鳥は？",
        options: ["ウミネコ", "カワセミ", "ミサゴ", "アオサギ"],
        correct: 2,
        explanation: "ミサゴは魚を捕る際に水面に急降下する猛禽類で、焼津港でもよく観察されます。"
    },
    {
        question: "朝霧川でよく見られる、青い羽が美しい小鳥は？",
        options: ["オオルリ", "カワセミ", "ルリビタキ", "アオジ"],
        correct: 1,
        explanation: "カワセミは「渓流の宝石」と呼ばれる美しい青い鳥で、朝霧川でもよく観察されます。"
    },
    {
        question: "高草山で春によく聞かれる「ホーホケキョ」の鳴き声の鳥は？",
        options: ["メジロ", "ウグイス", "ホオジロ", "ヒヨドリ"],
        correct: 1,
        explanation: "ウグイスは「ホーホケキョ」という美しい鳴き声で知られ、春の高草山でよく聞かれます。"
    },
    {
        question: "焼津港で最もよく見られる白い海鳥は？",
        options: ["ウミネコ", "カモメ", "オオセグロカモメ", "ユリカモメ"],
        correct: 1,
        explanation: "カモメは焼津港で最もよく見られる海鳥で、漁港周辺でよく観察されます。"
    },
    {
        question: "田尻海岸でよく見られる、長い足で浅瀬を歩く鳥は？",
        options: ["アオサギ", "コサギ", "ダイサギ", "すべて正解"],
        correct: 3,
        explanation: "田尻海岸では、アオサギ、コサギ、ダイサギなど複数のサギ類が観察できます。"
    },
    {
        question: "焼津周辺で見られる最大の猛禽類は？",
        options: ["ノスリ", "オオタカ", "ミサゴ", "トビ"],
        correct: 3,
        explanation: "トビは焼津周辺で見られる最大の猛禽類で、海岸線や山間部でよく観察されます。"
    },
    {
        question: "春の渡りの時期に焼津で観察される小さな黄色い鳥は？",
        options: ["メジロ", "キビタキ", "ウグイス", "ホオジロ"],
        correct: 1,
        explanation: "キビタキは春の渡りの時期に焼津でも観察される美しい黄色い鳥です。"
    },
    {
        question: "焼津の住宅地でよく見られる、頭が黒い小鳥は？",
        options: ["シジュウカラ", "ヤマガラ", "エナガ", "メジロ"],
        correct: 0,
        explanation: "シジュウカラは頭が黒く、焼津の住宅地や公園でよく観察される身近な鳥です。"
    },
    {
        question: "朝霧川で冬によく見られる、群れで泳ぐ鳥は？",
        options: ["マガモ", "コガモ", "カルガモ", "すべて正解"],
        correct: 3,
        explanation: "朝霧川では冬になると、マガモ、コガモ、カルガモなど様々なカモ類が群れで観察されます。"
    },
    {
        question: "焼津周辺で見られるフクロウの仲間は？",
        options: ["フクロウ", "アオバズク", "コミミズク", "すべて正解"],
        correct: 3,
        explanation: "焼津周辺では、フクロウ、アオバズク、コミミズクなど複数のフクロウ類が観察されています。"
    }
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = quizData.length;
let userAnswers = [];

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('start-quiz').style.display = 'none';
    document.getElementById('restart-quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question').innerHTML = `
        <h4>問題 ${currentQuestion + 1}/${totalQuestions}</h4>
        <p>${question.question}</p>
    `;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-question').style.display = 'none';
    updateStats();
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(btn => btn.disabled = true);
    
    userAnswers.push(selectedIndex);
    
    if (selectedIndex === question.correct) {
        score++;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = `
        <div class="result-explanation">
            <h4>${selectedIndex === question.correct ? '正解！' : '不正解'}</h4>
            <p>${question.explanation}</p>
        </div>
    `;
    
    if (currentQuestion < totalQuestions - 1) {
        document.getElementById('next-question').style.display = 'inline-block';
    } else {
        showFinalResults();
    }
    
    updateStats();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('result').style.display = 'none';
    loadQuestion();
}

function showFinalResults() {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    
    if (percentage >= 90) {
        message = '素晴らしい！野鳥マスターです！🏆';
    } else if (percentage >= 70) {
        message = 'とても良くできました！🎉';
    } else if (percentage >= 50) {
        message = '良い調子です！もう少し頑張りましょう！👍';
    } else {
        message = '今度はもっと観察してからチャレンジしましょう！📚';
    }
    
    document.getElementById('result').innerHTML = `
        <div class="final-results">
            <h3>クイズ完了！</h3>
            <div class="final-score">
                <div class="score-circle">
                    <span class="score-percentage">${percentage}%</span>
                    <span class="score-detail">${score}/${totalQuestions}問正解</span>
                </div>
            </div>
            <p class="result-message">${message}</p>
        </div>
    `;
    
    document.getElementById('restart-quiz').style.display = 'inline-block';
}

function updateStats() {
    const accuracy = currentQuestion > 0 ? Math.round((score / currentQuestion) * 100) : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('question-count').textContent = `${currentQuestion}/${totalQuestions}`;
    document.getElementById('score').textContent = `${score * 10}点`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('restart-quiz').addEventListener('click', startQuiz);
    
    updateStats();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Memory Game
const memoryGameData = {
    cards: ['🦅', '🦆', '🐦', '🦉', '🦜', '🕊️', '🦢', '🦩'],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: 0,
    gameTimer: null,
    gameStarted: false
};

function startMemoryGame() {
    const gameContainer = document.getElementById('memory-game');
    gameContainer.style.display = 'block';
    
    // スマホでスクロールして表示
    setTimeout(() => {
        gameContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
    
    resetMemoryGame();
}

function resetMemoryGame() {
    memoryGameData.flippedCards = [];
    memoryGameData.matchedPairs = 0;
    memoryGameData.moves = 0;
    memoryGameData.timer = 0;
    memoryGameData.gameStarted = false;
    
    if (memoryGameData.gameTimer) {
        clearInterval(memoryGameData.gameTimer);
    }
    
    createMemoryBoard();
    updateMemoryStats();
}

function createMemoryBoard() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    
    // カードを2枚ずつ作成してシャッフル
    const gameCards = [...memoryGameData.cards, ...memoryGameData.cards];
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.innerHTML = `
            <div class="card-face">${card}</div>
            <div class="card-back">?</div>
        `;
        
        // タッチとクリック両方に対応
        const flipHandler = () => flipCard(index, card);
        cardElement.addEventListener('click', flipHandler);
        cardElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            flipHandler();
        });
        
        board.appendChild(cardElement);
    });
}

function flipCard(index, card) {
    if (!memoryGameData.gameStarted) {
        startMemoryTimer();
        memoryGameData.gameStarted = true;
    }
    
    const cardElements = document.querySelectorAll('.memory-card');
    const cardElement = cardElements[index];
    
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
        return;
    }
    
    if (memoryGameData.flippedCards.length === 2) {
        return;
    }
    
    cardElement.classList.add('flipped');
    memoryGameData.flippedCards.push({ index, card, element: cardElement });
    
    if (memoryGameData.flippedCards.length === 2) {
        memoryGameData.moves++;
        updateMemoryStats();
        
        setTimeout(() => {
            checkMemoryMatch();
        }, 1000);
    }
}

function checkMemoryMatch() {
    const [card1, card2] = memoryGameData.flippedCards;
    
    if (card1.card === card2.card) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        memoryGameData.matchedPairs++;
        
        if (memoryGameData.matchedPairs === memoryGameData.cards.length) {
            setTimeout(() => {
                clearInterval(memoryGameData.gameTimer);
                alert(`🎉 おめでとうございます！\n${memoryGameData.moves}手 ${memoryGameData.timer}秒でクリアしました！`);
            }, 500);
        }
    } else {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
    }
    
    memoryGameData.flippedCards = [];
    updateMemoryStats();
}

function startMemoryTimer() {
    memoryGameData.gameTimer = setInterval(() => {
        memoryGameData.timer++;
        updateMemoryStats();
    }, 1000);
}

function updateMemoryStats() {
    document.getElementById('timer').textContent = memoryGameData.timer;
    document.getElementById('moves').textContent = memoryGameData.moves;
    document.getElementById('pairs').textContent = memoryGameData.matchedPairs;
}

function closeMemoryGame() {
    document.getElementById('memory-game').style.display = 'none';
    if (memoryGameData.gameTimer) {
        clearInterval(memoryGameData.gameTimer);
    }
}

// Sound Quiz Game
const soundQuizData = {
    questions: [
        {
            question: "「ホーホケキョ」と美しく鳴く鳥は？",
            description: "春の訪れを告げる美しい鳴き声で有名です。藪の中から聞こえてくることが多く、姿を見るのは意外と難しい鳥です。",
            options: ["ウグイス", "メジロ", "ホオジロ", "ヒヨドリ"],
            correct: 0,
            explanation: "ウグイスは「ホーホケキョ」という美しい鳴き声で知られ、春の代表的な鳥です。"
        },
        {
            question: "「ピーヒョロロロ」と鳴く猛禽類は？",
            description: "空高く舞い上がり、翼を広げて滑空する姿が特徴的です。鳴き声は遠くまで響き、山間部でよく聞かれます。",
            options: ["ノスリ", "トビ", "ハヤブサ", "オオタカ"],
            correct: 1,
            explanation: "トビは「ピーヒョロロロ」という特徴的な鳴き声で知られる大型の猛禽類です。"
        },
        {
            question: "「ケーン、ケーン」と鳴く大型の鳥は？",
            description: "水辺でよく見られる長い足の鳥です。魚や小動物を捕食し、首を素早く動かして獲物を捕らえます。",
            options: ["コサギ", "ダイサギ", "アオサギ", "ゴイサギ"],
            correct: 2,
            explanation: "アオサギは「ケーン、ケーン」という鳴き声で知られる大型のサギです。"
        },
        {
            question: "「チュンチュン」と鳴く身近な小鳥は？",
            description: "住宅地や公園でよく見られる小鳥で、人を恐れずに近づいてきます。茶色と白の羽色が特徴的です。",
            options: ["スズメ", "メジロ", "シジュウカラ", "ヒヨドリ"],
            correct: 0,
            explanation: "スズメは「チュンチュン」という鳴き声で知られる最も身近な小鳥の一つです。"
        },
        {
            question: "「ツピツピツピ」と連続して鳴く鳥は？",
            description: "黒い頭と白い頬が特徴的な小鳥です。シードベルや虫を好み、アクロバティックな動きで餌を探します。",
            options: ["シジュウカラ", "ヤマガラ", "コガラ", "ヒガラ"],
            correct: 0,
            explanation: "シジュウカラは「ツピツピツピ」という連続した鳴き声が特徴的な小鳥です。"
        }
    ],
    currentQuestion: 0,
    score: 0,
    answered: false
};

function startSoundQuiz() {
    const gameContainer = document.getElementById('sound-quiz');
    gameContainer.style.display = 'block';
    
    // スマホでスクロールして表示
    setTimeout(() => {
        gameContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
    
    soundQuizData.currentQuestion = 0;
    soundQuizData.score = 0;
    soundQuizData.answered = false;
    loadSoundQuestion();
}

function loadSoundQuestion() {
    const question = soundQuizData.questions[soundQuizData.currentQuestion];
    
    document.getElementById('sound-question-num').textContent = soundQuizData.currentQuestion + 1;
    document.getElementById('sound-correct').textContent = soundQuizData.score;
    
    document.getElementById('sound-description').innerHTML = `
        <h5>鳴き声の特徴</h5>
        <p>${question.description}</p>
        <p><strong>問題：</strong>${question.question}</p>
    `;
    
    const optionsContainer = document.getElementById('sound-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'sound-option';
        button.textContent = option;
        button.onclick = () => selectSoundAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('sound-result').style.display = 'none';
    document.getElementById('sound-next').style.display = 'none';
    soundQuizData.answered = false;
}

function selectSoundAnswer(selectedIndex) {
    if (soundQuizData.answered) return;
    
    soundQuizData.answered = true;
    const question = soundQuizData.questions[soundQuizData.currentQuestion];
    const options = document.querySelectorAll('.sound-option');
    
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === question.correct) {
        soundQuizData.score++;
    }
    
    document.getElementById('sound-result').style.display = 'block';
    document.getElementById('sound-result').innerHTML = `
        <h4>${selectedIndex === question.correct ? '正解！' : '不正解'}</h4>
        <p>${question.explanation}</p>
    `;
    
    if (soundQuizData.currentQuestion < soundQuizData.questions.length - 1) {
        document.getElementById('sound-next').style.display = 'inline-block';
    } else {
        setTimeout(() => {
            showSoundQuizResult();
        }, 2000);
    }
}

function nextSoundQuestion() {
    soundQuizData.currentQuestion++;
    loadSoundQuestion();
}

function showSoundQuizResult() {
    const percentage = Math.round((soundQuizData.score / soundQuizData.questions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '素晴らしい！鳴き声マスターです！🎵';
    } else if (percentage >= 60) {
        message = 'よくできました！🎉';
    } else {
        message = '次回はもっと耳を澄ませてみましょう！👂';
    }
    
    document.getElementById('sound-result').innerHTML = `
        <h3>クイズ完了！</h3>
        <p><strong>正解数：${soundQuizData.score}/${soundQuizData.questions.length}問</strong></p>
        <p><strong>正解率：${percentage}%</strong></p>
        <p>${message}</p>
    `;
    
    document.getElementById('sound-next').style.display = 'none';
}

function closeSoundQuiz() {
    document.getElementById('sound-quiz').style.display = 'none';
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('mobile-menu-open');
    toggle.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('mobile-menu-open')) {
                nav.classList.remove('mobile-menu-open');
                toggle.classList.remove('active');
            }
        });
    });
});


// Show message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        ${type === 'success' ? 'background: #4CAF50; color: white;' : 'background: #2196F3; color: white;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Activity record editing functionality
let editingRecord = null;
let recordData = [];

// Load record data from localStorage
function loadRecordData() {
    const saved = localStorage.getItem('birder-records');
    if (saved) {
        recordData = JSON.parse(saved);
    }
}

// Save record data to localStorage  
function saveRecordData() {
    localStorage.setItem('birder-records', JSON.stringify(recordData));
}

// Initialize record editing
function initRecordEditing() {
    loadRecordData();
    addRecordEditButtons();
    createRecordEditModal();
}

// Add edit buttons to record cards
function addRecordEditButtons() {
    const recordCards = document.querySelectorAll('.record-card');
    recordCards.forEach((card, index) => {
        // Skip if edit button already exists
        if (card.querySelector('.edit-record-btn')) return;
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-record-btn';
        editBtn.innerHTML = '✏️ 編集';
        editBtn.onclick = () => editRecord(index, card);
        editBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            border: none;
            border-radius: 3px;
            background: #007bff;
            color: white;
            cursor: pointer;
            font-size: 12px;
        `;
        
        card.style.position = 'relative';
        card.appendChild(editBtn);
    });
}

// Create record edit modal
function createRecordEditModal() {
    const modal = document.createElement('div');
    modal.id = 'record-edit-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>活動記録編集</h2>
                <button class="close-btn" onclick="closeRecordEditModal()">&times;</button>
            </div>
            <form id="record-edit-form">
                <div class="form-group">
                    <label for="record-date">日付:</label>
                    <input type="text" id="record-date" required>
                </div>
                <div class="form-group">
                    <label for="record-title">タイトル:</label>
                    <input type="text" id="record-title" required>
                </div>
                <div class="form-group">
                    <label for="record-participants">参加者数:</label>
                    <input type="number" id="record-participants" min="1">
                </div>
                <div class="form-group">
                    <label for="record-species">観察種数:</label>
                    <input type="number" id="record-species" min="0">
                </div>
                <div class="form-group">
                    <label for="record-highlights">注目の鳥（カンマ区切り）:</label>
                    <input type="text" id="record-highlights">
                </div>
                <div class="form-group">
                    <label for="record-note">記録メモ:</label>
                    <textarea id="record-note" rows="4"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit">保存</button>
                    <button type="button" onclick="closeRecordEditModal()">キャンセル</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add form submit handler
    document.getElementById('record-edit-form').addEventListener('submit', saveRecordEdit);
}

// Edit record function
function editRecord(index, card) {
    editingRecord = { index, card };
    
    // Extract current data from card
    const date = card.querySelector('.record-date')?.textContent || '';
    const title = card.querySelector('h3')?.textContent || '';
    const participantsText = card.textContent.match(/参加者：(\d+)名/)?.[1] || '';
    const speciesText = card.textContent.match(/観察種数：(\d+)種/)?.[1] || '';
    const highlights = Array.from(card.querySelectorAll('.highlight')).map(h => h.textContent).join(', ');
    const note = card.querySelector('.record-note')?.textContent || '';
    
    // Fill form with current data
    document.getElementById('record-date').value = date;
    document.getElementById('record-title').value = title;
    document.getElementById('record-participants').value = participantsText;
    document.getElementById('record-species').value = speciesText;
    document.getElementById('record-highlights').value = highlights;
    document.getElementById('record-note').value = note;
    
    // Show modal
    document.getElementById('record-edit-modal').style.display = 'block';
}

// Save record edit
function saveRecordEdit(e) {
    e.preventDefault();
    
    if (!editingRecord) return;
    
    const formData = {
        date: document.getElementById('record-date').value,
        title: document.getElementById('record-title').value,
        participants: document.getElementById('record-participants').value,
        species: document.getElementById('record-species').value,
        highlights: document.getElementById('record-highlights').value.split(',').map(s => s.trim()).filter(s => s),
        note: document.getElementById('record-note').value
    };
    
    // Update the card
    updateRecordCard(editingRecord.card, formData);
    
    // Save to localStorage
    recordData[editingRecord.index] = formData;
    saveRecordData();
    
    // Close modal
    closeRecordEditModal();
    
    // Show success message
    showMessage('活動記録を更新しました！', 'success');
}

// Update record card display
function updateRecordCard(card, data) {
    // Update date
    const dateElement = card.querySelector('.record-date');
    if (dateElement) dateElement.textContent = data.date;
    
    // Update title
    const titleElement = card.querySelector('h3');
    if (titleElement) titleElement.textContent = data.title;
    
    // Update participants and species text
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (p.textContent.includes('参加者：')) {
            p.textContent = `参加者：${data.participants}名`;
        } else if (p.textContent.includes('観察種数：')) {
            p.textContent = `観察種数：${data.species}種`;
        }
    });
    
    // Update highlights
    const highlightsContainer = card.querySelector('.record-highlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = '';
        data.highlights.forEach(highlight => {
            const span = document.createElement('span');
            span.className = 'highlight';
            span.textContent = highlight;
            highlightsContainer.appendChild(span);
        });
    }
    
    // Update note
    const noteElement = card.querySelector('.record-note');
    if (noteElement) noteElement.textContent = data.note;
}

// Close record edit modal
function closeRecordEditModal() {
    document.getElementById('record-edit-modal').style.display = 'none';
    editingRecord = null;
}


// Initialize record editing on records page
if (window.location.pathname.includes('records.html')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRecordEditing);
    } else {
        initRecordEditing();
    }
}

// Photo upload functionality
function initPhotoGallery() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const photoInput = document.getElementById('photoInput');
    
    if (!fileUploadArea || !photoInput) return;
    
    // Click to upload
    fileUploadArea.addEventListener('click', () => {
        photoInput.click();
    });
    
    // Drag and drop functionality
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('drag-over');
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('drag-over');
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        photoInput.files = files;
    });
    
    // Load existing photos
    loadPhotos();
}

function uploadPhoto() {
    const photoInput = document.getElementById('photoInput');
    const title = document.getElementById('photoTitle').value.trim();
    const description = document.getElementById('photoDescription').value.trim();
    const photographer = document.getElementById('photographerName').value.trim();
    
    if (!photoInput.files.length) {
        alert('写真を選択してください。');
        return;
    }
    
    if (!title) {
        alert('タイトルを入力してください。');
        return;
    }
    
    const photos = JSON.parse(localStorage.getItem('birdPhotos') || '[]');
    
    Array.from(photoInput.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photo = {
                id: Date.now() + index,
                title: title,
                description: description,
                photographer: photographer || '匿名',
                imageData: e.target.result,
                uploadDate: new Date().toLocaleDateString('ja-JP')
            };
            
            photos.push(photo);
            localStorage.setItem('birdPhotos', JSON.stringify(photos));
            
            // Clear form
            document.getElementById('photoTitle').value = '';
            document.getElementById('photoDescription').value = '';
            document.getElementById('photographerName').value = '';
            photoInput.value = '';
            
            // Reload photos display
            loadPhotos();
            
            // Update about page photo if this is the latest photo
            if (index === photoInput.files.length - 1) {
                updateAboutPagePhoto();
            }
            
            showMessage('写真を投稿しました！', 'success');
        };
        reader.readAsDataURL(file);
    });
}

function loadPhotos() {
    const photosContainer = document.getElementById('photosContainer');
    if (!photosContainer) return;
    
    const photos = JSON.parse(localStorage.getItem('birdPhotos') || '[]');
    
    if (photos.length === 0) {
        photosContainer.innerHTML = '<p class="no-photos">まだ写真が投稿されていません。</p>';
        return;
    }
    
    photosContainer.innerHTML = photos.map(photo => `
        <div class="photo-item" data-photo-id="${photo.id}">
            <div class="photo-image">
                <img src="${photo.imageData}" alt="${photo.title}">
            </div>
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <div class="photo-meta">
                    <span>📷 ${photo.photographer}</span>
                    <span>📅 ${photo.uploadDate}</span>
                    <button class="delete-photo-btn" onclick="deletePhoto(${photo.id})">削除</button>
                </div>
            </div>
        </div>
    `).join('');
}

function deletePhoto(photoId) {
    if (!confirm('この写真を削除しますか？')) return;
    
    const photos = JSON.parse(localStorage.getItem('birdPhotos') || '[]');
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    localStorage.setItem('birdPhotos', JSON.stringify(updatedPhotos));
    
    loadPhotos();
    showMessage('写真を削除しました。', 'success');
}

// Initialize photo gallery on gallery page
function tryInitPhotoGallery() {
    if (document.getElementById('fileUploadArea')) {
        initPhotoGallery();
    }
}

if (window.location.pathname.includes('gallery.html') || document.getElementById('fileUploadArea')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInitPhotoGallery);
    } else {
        tryInitPhotoGallery();
    }
}

// Additional fallback
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('fileUploadArea')) {
        initPhotoGallery();
    }
});

// Slideshow functionality
let currentSlide = 0;
let slideshowInterval;
let allPhotos = [];

function loadAboutPagePhoto() {
    const slideContainer = document.getElementById('slideContainer');
    const slideIndicators = document.getElementById('slideIndicators');
    
    if (!slideContainer) return;
    
    // フォルダ内の画像リスト（手動で追加）
    const folderPhotos = [
        { imageData: 'images/DSC_2244.jpg', title: '野鳥の写真1', photographer: 'BIRDERクラブ' },
        { imageData: 'images/DSC_2776.jpg', title: '野鳥の写真2', photographer: 'BIRDERクラブ' },
        { imageData: 'images/DSC_2847.jpg', title: '野鳥の写真3', photographer: 'BIRDERクラブ' },
        { imageData: 'images/DSC_2903.jpg', title: '野鳥の写真4', photographer: 'BIRDERクラブ' }
    ];
    
    const uploadedPhotos = JSON.parse(localStorage.getItem('birdPhotos') || '[]');
    
    // フォルダ内の写真とアップロード写真を結合
    const photos = [...folderPhotos, ...uploadedPhotos];
    allPhotos = photos;
    
    if (photos.length > 0) {
        // スライドを作成
        slideContainer.innerHTML = photos.map((photo, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}">
                <img src="${photo.imageData}" alt="${photo.title}" class="bird-photo">
            </div>
        `).join('');
        
        // インジケーターを作成
        slideIndicators.innerHTML = photos.map((_, index) => `
            <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
        `).join('');
        
        // 複数の写真がある場合のみスライドショーを開始
        if (photos.length > 1) {
            startSlideshow();
        }
        
        // ナビゲーションボタンの表示/非表示
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn && nextBtn) {
            prevBtn.style.display = photos.length > 1 ? 'block' : 'none';
            nextBtn.style.display = photos.length > 1 ? 'block' : 'none';
        }
    } else {
        // 写真がない場合はプレースホルダーを表示
        slideContainer.innerHTML = `
            <div class="slide active">
                <div class="bird-photo-placeholder">
                </div>
            </div>
        `;
        slideIndicators.innerHTML = '';
    }
}

function startSlideshow() {
    stopSlideshow(); // 既存のスライドショーを停止
    slideshowInterval = setInterval(() => {
        nextSlide();
    }, 4000); // 4秒ごとに切り替え
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function nextSlide() {
    if (allPhotos.length <= 1) return;
    
    currentSlide = (currentSlide + 1) % allPhotos.length;
    updateSlide();
}

function prevSlide() {
    if (allPhotos.length <= 1) return;
    
    currentSlide = (currentSlide - 1 + allPhotos.length) % allPhotos.length;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    stopSlideshow();
    
    // 5秒後にスライドショーを再開
    setTimeout(() => {
        if (allPhotos.length > 1) {
            startSlideshow();
        }
    }, 5000);
}

function updateSlide() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Update about page photo (for gallery page)
function updateAboutPagePhoto() {
    // This function can be called from gallery page to trigger updates
    const event = new CustomEvent('photoUploaded');
    window.dispatchEvent(event);
}

// Initialize about page photo on home page
if (window.location.pathname.includes('index.html') || window.location.pathname === '' || window.location.pathname === '/') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadAboutPagePhoto();
            initSlideshowControls();
        });
    } else {
        loadAboutPagePhoto();
        initSlideshowControls();
    }
}

function initSlideshowControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideshow();
            // 5秒後にスライドショーを再開
            setTimeout(() => {
                if (allPhotos.length > 1) {
                    startSlideshow();
                }
            }, 5000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideshow();
            // 5秒後にスライドショーを再開
            setTimeout(() => {
                if (allPhotos.length > 1) {
                    startSlideshow();
                }
            }, 5000);
        });
    }
    
    // マウスオーバーでスライドショーを一時停止
    const photoFrame = document.getElementById('aboutBirdPhoto');
    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', stopSlideshow);
        photoFrame.addEventListener('mouseleave', () => {
            if (allPhotos.length > 1) {
                startSlideshow();
            }
        });
    }
}

// Bird observation records functionality
function initBirdRecords() {
    loadBirdRecords();
    setupCategoryFilters();
}

function addBirdRecord() {
    const birdName = document.getElementById('birdName').value.trim();
    const category = document.getElementById('birdCategory').value;
    const scientificName = document.getElementById('scientificName').value.trim();
    const location = document.getElementById('observationLocation').value.trim();
    const season = document.getElementById('observationSeason').value.trim();
    const frequency = document.getElementById('frequency').value;
    const notes = document.getElementById('observationNotes').value.trim();
    
    if (!birdName || !location || !season || !notes) {
        alert('必須項目を入力してください。');
        return;
    }
    
    const birds = JSON.parse(localStorage.getItem('birdRecords') || '[]');
    
    const newBird = {
        id: Date.now(),
        name: birdName,
        category: category,
        scientificName: scientificName,
        location: location,
        season: season,
        frequency: frequency,
        notes: notes,
        addedDate: new Date().toLocaleDateString('ja-JP')
    };
    
    birds.push(newBird);
    localStorage.setItem('birdRecords', JSON.stringify(birds));
    
    // Clear form
    document.getElementById('birdName').value = '';
    document.getElementById('scientificName').value = '';
    document.getElementById('observationLocation').value = '';
    document.getElementById('observationSeason').value = '';
    document.getElementById('observationNotes').value = '';
    
    loadBirdRecords();
    showMessage('観察記録を追加しました！', 'success');
}

function loadBirdRecords() {
    const birdsGrid = document.getElementById('birdsGrid');
    if (!birdsGrid) return;
    
    const birds = JSON.parse(localStorage.getItem('birdRecords') || '[]');
    
    if (birds.length === 0) {
        birdsGrid.innerHTML = '<p class="no-birds">観察記録はメンバーが追加していきます。</p>';
        return;
    }
    
    const categoryEmojis = {
        sea: '🌊',
        river: '💧',
        mountain: '🏔️',
        rare: '⭐'
    };
    
    birdsGrid.innerHTML = birds.map(bird => `
        <div class="bird-card" data-category="${bird.category}">
            <div class="bird-header">
                <h3>${categoryEmojis[bird.category]} ${bird.name}</h3>
                <span class="frequency">${bird.frequency}</span>
                <button class="edit-bird-btn" onclick="editBirdRecord(${bird.id})">編集</button>
                <button class="delete-bird-btn" onclick="deleteBirdRecord(${bird.id})">削除</button>
            </div>
            <div class="bird-info">
                ${bird.scientificName ? `<p><strong>学名:</strong> ${bird.scientificName}</p>` : ''}
                <p><strong>観察地:</strong> ${bird.location}</p>
                <p><strong>観察時期:</strong> ${bird.season}</p>
                <p><strong>追加日:</strong> ${bird.addedDate}</p>
            </div>
            <div class="bird-notes">
                <p>${bird.notes}</p>
            </div>
        </div>
    `).join('');
}

function setupCategoryFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            filterBirdsByCategory(category);
        });
    });
}

function filterBirdsByCategory(category) {
    const birdCards = document.querySelectorAll('.bird-card');
    
    birdCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function editBirdRecord(birdId) {
    const birds = JSON.parse(localStorage.getItem('birdRecords') || '[]');
    const bird = birds.find(b => b.id === birdId);
    
    if (!bird) return;
    
    // Fill form with existing data
    document.getElementById('birdName').value = bird.name;
    document.getElementById('birdCategory').value = bird.category;
    document.getElementById('scientificName').value = bird.scientificName || '';
    document.getElementById('observationLocation').value = bird.location;
    document.getElementById('observationSeason').value = bird.season;
    document.getElementById('frequency').value = bird.frequency;
    document.getElementById('observationNotes').value = bird.notes;
    
    // Change add button to update button temporarily
    const addBtn = document.getElementById('addBirdBtn');
    addBtn.textContent = '記録を更新';
    addBtn.onclick = () => updateBirdRecord(birdId);
    
    // Scroll to form
    document.querySelector('.add-bird-form').scrollIntoView({ behavior: 'smooth' });
}

function updateBirdRecord(birdId) {
    const birdName = document.getElementById('birdName').value.trim();
    const category = document.getElementById('birdCategory').value;
    const scientificName = document.getElementById('scientificName').value.trim();
    const location = document.getElementById('observationLocation').value.trim();
    const season = document.getElementById('observationSeason').value.trim();
    const frequency = document.getElementById('frequency').value;
    const notes = document.getElementById('observationNotes').value.trim();
    
    if (!birdName || !location || !season || !notes) {
        alert('必須項目を入力してください。');
        return;
    }
    
    const birds = JSON.parse(localStorage.getItem('birdRecords') || '[]');
    const birdIndex = birds.findIndex(b => b.id === birdId);
    
    if (birdIndex !== -1) {
        birds[birdIndex] = {
            ...birds[birdIndex],
            name: birdName,
            category: category,
            scientificName: scientificName,
            location: location,
            season: season,
            frequency: frequency,
            notes: notes
        };
        
        localStorage.setItem('birdRecords', JSON.stringify(birds));
        
        // Reset form and button
        document.getElementById('birdName').value = '';
        document.getElementById('scientificName').value = '';
        document.getElementById('observationLocation').value = '';
        document.getElementById('observationSeason').value = '';
        document.getElementById('observationNotes').value = '';
        
        const addBtn = document.getElementById('addBirdBtn');
        addBtn.textContent = '記録を追加';
        addBtn.onclick = addBirdRecord;
        
        loadBirdRecords();
        showMessage('観察記録を更新しました！', 'success');
    }
}

function deleteBirdRecord(birdId) {
    if (!confirm('この観察記録を削除しますか？')) return;
    
    const birds = JSON.parse(localStorage.getItem('birdRecords') || '[]');
    const updatedBirds = birds.filter(bird => bird.id !== birdId);
    localStorage.setItem('birdRecords', JSON.stringify(updatedBirds));
    
    loadBirdRecords();
    showMessage('観察記録を削除しました。', 'success');
}

// Initialize bird records on birds page
if (window.location.pathname.includes('birds.html')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBirdRecords);
    } else {
        initBirdRecords();
    }
}