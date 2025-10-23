const board = document.getElementById('game-board');
const emojis = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cards = [...emojis, ...emojis]; // 2x jokainen emoji
let flippedCards = [];
let lockBoard = false;

// Sekoita kortit
cards.sort(() => 0.5 - Math.random());

// Luo kortit
cards.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.textContent = '';
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped')) return;

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
    flippedCards = [];
    lockBoard = false;
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
