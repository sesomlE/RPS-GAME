const startBtn = document.getElementById('startBtn');
const gameDiv = document.getElementById('game');
const playerScoreSpan = document.getElementById('playerScore');
const computerScoreSpan = document.getElementById('computerScore');
const resultDiv = document.getElementById('result');
const roundsLeftSpan = document.getElementById('roundsLeft');

let playerScore = 0;
let computerScore = 0;
let roundsLeft = 0;

startBtn.addEventListener('click', () => {
  roundsLeft = parseInt(document.getElementById('rounds').value);
  playerScore = 0;
  computerScore = 0;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  roundsLeftSpan.textContent = roundsLeft;
  resultDiv.textContent = '';
  gameDiv.style.display = 'block';
});

document.querySelectorAll('.move').forEach(button => {
  button.addEventListener('click', () => {
    if (roundsLeft > 0) {
      const playerMove = button.dataset.move;
      const computerMove = getComputerMove();
      const result = determineWinner(playerMove, computerMove);
      updateScores(result);
      roundsLeft--;
      roundsLeftSpan.textContent = roundsLeft;
      if (roundsLeft === 0) {
        declareFinalWinner();
      }
    }
  });
});

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) return 'draw';
  if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}

function updateScores(result) {
  if (result === 'player') {
    playerScore++;
    resultDiv.textContent = 'You win this round!';
  } else if (result === 'computer') {
    computerScore++;
    resultDiv.textContent = 'Computer wins this round!';
  } else {
    resultDiv.textContent = 'It\'s a draw!';
  }
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function declareFinalWinner() {
  if (playerScore > computerScore) {
    resultDiv.textContent = 'You are the overall winner!';
  } else if (computerScore > playerScore) {
    resultDiv.textContent = 'Computer is the overall winner!';
  } else {
    resultDiv.textContent = "Overall, it's a draw!";
  }
}
