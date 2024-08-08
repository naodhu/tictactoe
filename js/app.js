const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let currentPlayer = 'X';
let gameActive = true;

const initializeBoard = () => {
  boardElement.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
  updateStatus();
  console.log("Board initialized:", board);
};

const handleCellClick = (event) => {
  if (!gameActive) return;

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board[row][col] !== '') return;

  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  console.log(`Player ${currentPlayer} moved to [${row}, ${col}]`);
  console.log("Current board state:", board);

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    console.log(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    statusElement.textContent = 'The game is a draw!';
    console.log("The game is a draw!");
    gameActive = false;
    return;
  }

  switchPlayer();
  if (currentPlayer === 'O') {
    aiMove();
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
  console.log(`Switched player to ${currentPlayer}`);
};

const updateStatus = () => {
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  statusElement.className = currentPlayer === 'X' ? 'player-X' : 'player-O';
};

const checkWinner = () => {
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  const winner = winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]];
  });

  if (winner) {
    console.log("Winning combination found:", board);
  }

  return winner;
};

const isBoardFull = () => {
  const full = board.every(row => row.every(cell => cell !== ''));
  if (full) {
    console.log("Board is full:", board);
  }
  return full;
};

const restartGame = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  gameActive = true;
  initializeBoard();
  console.log("Game restarted");
};

const aiMove = () => {
  let bestMove = findBestMove();
  board[bestMove[0]][bestMove[1]] = currentPlayer;
  document.querySelector(`[data-row="${bestMove[0]}"][data-col="${bestMove[1]}"]`).textContent = currentPlayer;

  console.log(`AI (Player ${currentPlayer}) moved to [${bestMove[0]}, ${bestMove[1]}]`);
  console.log("Current board state:", board);

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    console.log(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    statusElement.textContent = 'The game is a draw!';
    console.log("The game is a draw!");
    gameActive = false;
    return;
  }

  switchPlayer();
};

const findBestMove = () => {
  let bestVal = -Infinity;
  let bestMove = [-1, -1];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = 'O';
        let moveVal = minimax(0, false, -Infinity, Infinity);
        board[i][j] = '';
        if (moveVal > bestVal) {
          bestMove = [i, j];
          bestVal = moveVal;
        }
      }
    }
  }
  console.log("Best move for AI found:", bestMove);
  return bestMove;
};

const minimax = (depth, isMaximizing, alpha, beta) => {
  let score = evaluateBoard();
  if (score === 10) return score;
  if (score === -10) return score;
  if (isBoardFull()) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          best = Math.max(best, minimax(depth + 1, false, alpha, beta));
          board[i][j] = '';
          alpha = Math.max(alpha, best);
          if (beta <= alpha) return best;
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'X';
          best = Math.min(best, minimax(depth + 1, true, alpha, beta));
          board[i][j] = '';
          beta = Math.min(beta, best);
          if (beta <= alpha) return best;
        }
      }
    }
    return best;
  }
};

const evaluateBoard = () => {
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      if (board[row][0] === 'O') return 10;
      if (board[row][0] === 'X') return -10;
    }
  }

  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      if (board[0][col] === 'O') return 10;
      if (board[0][col] === 'X') return -10;
    }
  }

  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === 'O') return 10;
    if (board[0][0] === 'X') return -10;
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === 'O') return 10;
    if (board[0][2] === 'X') return -10;
  }

  return 0;
};

restartButton.addEventListener('click', restartGame);

initializeBoard();
