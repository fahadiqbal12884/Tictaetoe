const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'x';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer.toUpperCase();

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer.toUpperCase()} has won!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        alert("It's a draw!");
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'x';
    gameState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);