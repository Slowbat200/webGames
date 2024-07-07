document.addEventListener('DOMContentLoaded', () => {
  let countries = [];
  let selectedWord;
  let guessedLetters;
  let remainingAttempts;

  const wordContainer = document.getElementById('word-container');
  const lettersContainer = document.getElementById('letters-container');
  const message = document.getElementById('message');
  const attempts = document.getElementById('remaining-attempts');
  const restartBtn = document.getElementById('restart-btn');

  // Fetch countries from json file
  fetch('countries.json')
    .then((response) => response.json())
    .then((data) => {
      countries = data.countries;
      initGame();
      updateAttemptsDisplay();
    })
    .catch((error) => {
      console.log('Error while fetching words', error);
      message.textContent = 'Failed to load words data';
    });

  function initGame() {
    selectedWord =
      countries[Math.floor(Math.random() * countries.length)].toLowerCase();
    guessedLetters = [];
    remainingAttempts = 6;

    wordContainer.innerHTML = '_ '.repeat(selectedWord.length);
    lettersContainer.innerHTML = '';
    message.textContent = '';

    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i).toLowerCase();
      const letterBtn = document.createElement('button');
      letterBtn.textContent = letter;
      letterBtn.classList.add('letter');
      letterBtn.addEventListener('click', () => guessLetters(letter));
      lettersContainer.appendChild(letterBtn);
    }
  }

  function guessLetters(letter) {
    if (guessedLetters.includes(letter) || remainingAttempts === 0) {
      return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
      let displayedWord = '';
      for (let char of selectedWord) {
        if (guessedLetters.includes(char)) {
          displayedWord += char + '';
        } else {
          displayedWord += '_ ';
        }
      }
      wordContainer.textContent = displayedWord.trim();
      if (!displayedWord.includes('_')) {
        message.textContent = 'You won!';
        disableLetters();
      }
    } else {
      remainingAttempts--;
      updateAttemptsDisplay();
      if (remainingAttempts === 0) {
        message.textContent = `Game over! The word was "${selectedWord}"`;
        disableLetters();
      }
    }
  }

  function updateAttemptsDisplay() {
    attempts.textContent = `Remaining Attempts: ${remainingAttempts}`;
  }

  function disableLetters() {
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach((buttom) => (buttom.disabled = true));
  }
  restartBtn.addEventListener('click', () => {
    remainingAttempts = 6;
    updateAttemptsDisplay();
    initGame();
  });
});
