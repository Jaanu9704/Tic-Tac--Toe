// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.game-status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.dataset.index;

  if (!gameActive || gameState[cellIndex]) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell)) {
    statusText.textContent = `It's a Draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winningConditions.some(condition => 
    condition.every(index => gameState[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameState = Array(9).fill(null);
  gameActive = true;
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
