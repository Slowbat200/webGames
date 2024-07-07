// script.js
document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('gameBoard');
  const cardValues = [
    'A',
    'A',
    'B',
    'B',
    'C',
    'C',
    'D',
    'D',
    'E',
    'E',
    'F',
    'F',
    'G',
    'G',
    'H',
    'H',
  ];
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];

  // Shuffle the card values
  cardValues.sort(() => 0.5 - Math.random());

  // Create card elements
  cardValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = '<span class="hidden">' + value + '</span>';
    gameBoard.appendChild(card);
    cards.push(card);
  });

  // Add event listener to each card
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (
        flippedCards.length < 2 &&
        !card.classList.contains('flipped') &&
        !matchedCards.includes(card)
      ) {
        card.classList.add('flipped');
        card.querySelector('span').classList.remove('hidden');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          checkForMatch();
        }
      }
    });
  });

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === cards.length) {
        setTimeout(() => alert('You won!'), 300);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('span').classList.add('hidden');
        card2.querySelector('span').classList.add('hidden');
        flippedCards = [];
      }, 1000);
    }
  }

  const restartButton = document.getElementById('try-again');
  restartButton.addEventListener('click', () => {
    restartGame()
  });

  function restartGame() {
    cards.forEach((card) => {
      card.classList.remove('flipped');
      card.querySelector('span').classList.add('hidden');
    });
    flippedCards = [];
    matchedCards = [];
  }
});
