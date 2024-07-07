document.addEventListener('DOMContentLoaded', () => {
  const choices = ['rock', 'paper', 'scissors'];
  let playerScore = 0;
  let computerScore = 0;

  const resultText = document.getElementById('result-text');
  const playerScoreText = document.getElementById('player-score');
  const computerScoreText = document.getElementById('computer-score');

  document.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => {
      const playerChoice = button.id;
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];
      const result = getResult(playerChoice, computerChoice);

      if (result === 'win') {
        playerScore++;
        resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
      } else if (result === 'lose') {
        computerScore++;
        resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
      } else {
        resultText.textContent = `It's a draw! You both chose ${playerChoice}`;
      }

      playerScoreText.textContent = `Player Score: ${playerScore}`;
      computerScoreText.textContent = `Computer Score: ${computerScore}`;
    });
  });

  function getResult(player, computer) {
    if (player === computer) {
      return 'draw';
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  }
  // Get the Try Again button
  const tryAgainButton = document.getElementById('try-again');
  tryAgainButton.addEventListener('click', function () {
    resetGame();
  });

  // Reset the game
  function resetGame() {
    resultText.textContent = '';
    playerScore = 0;
    computerScore = 0;
    playerScoreText.textContent = `Player Score: ${playerScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;
  }
});
