// Haetaan HTML-elementit DOMista
const board = document.getElementById('game-board');           // Pelilauta, johon kortit lisätään
const scoreDisplay = document.getElementById('score');         // Pisteiden näyttö
const timerDisplay = document.getElementById('timer');         // Ajastimen näyttö
const difficultySelect = document.getElementById('difficulty');// Vaikeustason valinta
const startBtn = document.getElementById('start-btn');         // Aloituspainike
const bestScoreDisplay = document.getElementById('best-score');// Paras pistemäärä
const bestTimeDisplay = document.getElementById('best-time');  // Paras aika

// Kaikki mahdolliset emoji-parit
const allEmojis = ['🍎','🍌','🍇','🍓','🍒','🍍','🥝','🍉','🍋','🍑','🥥','🍈'];

// Pelin tilamuuttujat
let flippedCards = [];       // Kortit, jotka on käännetty
let lockBoard = false;       // Estää korttien klikkauksen kun kaksi on auki
let score = 0;               // Nykyinen pistemäärä
let seconds = 0;             // Kulunut aika sekunteina
let timerInterval = null;    // Ajastimen intervalli
let matchedPairs = 0;        // Löydetyt parit
let totalPairs = 0;          // Pelissä olevien parien määrä

// Aloituspainikkeen kuuntelija
startBtn.addEventListener('click', startGame);

// Ladataan ennätykset pelin alussa
loadBestResults();


// 🔄 Lataa tallennetut ennätykset localStoragesta
function loadBestResults() {
  const bestScore = localStorage.getItem('bestScore') || 0;
  const bestTime = localStorage.getItem('bestTime') || '∞';
  bestScoreDisplay.textContent = bestScore;
  bestTimeDisplay.textContent = bestTime;
}


// 💾 Tallenna uudet ennätykset, jos nykyinen tulos on parempi
function saveBestResults() {
  const prevScore = parseInt(localStorage.getItem('bestScore')) || 0;
  const prevTime = parseInt(localStorage.getItem('bestTime')) || Infinity;

  if (score > prevScore) {
    localStorage.setItem('bestScore', score);
  }
  if (seconds < prevTime) {
    localStorage.setItem('bestTime', seconds);
  }
  loadBestResults(); // Päivitä näkymä
}


// 🎮 Käynnistää uuden pelin valitulla vaikeustasolla
function startGame() {
  resetGame(); // Tyhjennä edellinen peli

  // Määritä parien määrä vaikeustason mukaan
  const difficulty = difficultySelect.value;
  totalPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12;

  // Valitse tarvittava määrä emojeja ja sekoita kortit
  const selectedEmojis = allEmojis.slice(0, totalPairs);
  const cards = [...selectedEmojis, ...selectedEmojis].sort(() => 0.5 - Math.random());

  // Luo kortit ja lisää ne pelilaudalle
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  startTimer(); // Käynnistä ajastin
}


// 🔄 Nollaa pelin tila ja näkymä
function resetGame() {
  board.innerHTML = '';             // Tyhjennä pelilauta
  score = 0;
  seconds = 0;
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = seconds;
  clearInterval(timerInterval);     // Pysäytä vanha ajastin
}


// ⏱️ Käynnistää ajastimen
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = seconds;
  }, 1000);
}


// 🎴 Käsittelee kortin klikkauksen
function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.emoji;
  flippedCards.push(this);

  // Jos kaksi korttia on auki, tarkista pari
  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}


// ✅ Tarkistaa, muodostavatko kaksi korttia parin
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    score += 10;
    matchedPairs++;
    updateScore();
    flippedCards = [];
    lockBoard = false;

    // Jos kaikki parit on löydetty, peli päättyy
    if (matchedPairs === totalPairs) {
      clearInterval(timerInterval);
      saveBestResults();
      alert(`Voitit pelin! Aika: ${seconds} sekuntia`);
    }

  } else {
    // Jos ei ole pari, käännä takaisin pienen viiveen jälkeen
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


// 🔢 Päivittää pisteiden näkymän
function updateScore() {
  scoreDisplay.textContent = score;
}
