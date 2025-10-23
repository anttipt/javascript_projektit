const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');
const bestScoreDisplay = document.getElementById('best-score');
const bestTimeDisplay = document.getElementById('best-time');
const allEmojis = ['🍎','🍌','🍇','🍓','🍒','🍍','🥝','🍉','🍋','🍑','🥥','🍈'];
let flippedCards = [];
let lockBoard = false;
let score = 0;
let seconds = 0;
let timerInterval = null;
let matchedPairs = 0;
let totalPairs = 0;

startBtn.addEventListener('click', startGame);
// Kutsu pelin alussa
loadBestResults();

// Lataa ennätykset
function loadBestResults() {
  const bestScore = localStorage.getItem('bestScore') || 0;
  const bestTime = localStorage.getItem('bestTime') || '∞';
  bestScoreDisplay.textContent = bestScore;
  bestTimeDisplay.textContent = bestTime;
}

// Tallenna ennätys jos parempi
function saveBestResults() {
  const prevScore = parseInt(localStorage.getItem('bestScore')) || 0;
  const prevTime = parseInt(localStorage.getItem('bestTime')) || Infinity;

  if (score > prevScore) {
    localStorage.setItem('bestScore', score);
  }
  if (seconds < prevTime) {
    localStorage.setItem('bestTime', seconds);
  }
  loadBestResults();
}

function startGame() {
  resetGame();
  const difficulty = difficultySelect.value;
  totalPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12;
  const selectedEmojis = allEmojis.slice(0, totalPairs);
  const cards = [...selectedEmojis, ...selectedEmojis].sort(() => 0.5 - Math.random());

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  startTimer();
}

function resetGame() {
  board.innerHTML = '';
  score = 0;
  seconds = 0;
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = seconds;
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    score += 10;
    matchedPairs++;
    updateScore();
    flippedCards = [];
    lockBoard = false;

if (matchedPairs === totalPairs) {
  clearInterval(timerInterval);
  saveBestResults();
  alert(`Voitit pelin! Aika: ${seconds} sekuntia`);
}
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}



function updateScore() {
  scoreDisplay.textContent = score;
}
