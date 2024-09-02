let gameBoard = document.getElementById('game-board');
const ROWS = 10;
const COLS = 10;
const MINES_COUNT = 20;
let gameOverMsg = document.getElementById('game-over');
let cells = Array.from(document.querySelectorAll('.cell'));
let mineIndices = new Set();
const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', () => restartGame());

//init game
function initGame() {

    
    // Create a unique set of mine indices
    while (mineIndices.size < MINES_COUNT) {
        let randomIndex = Math.floor(Math.random() * (ROWS * COLS));
        mineIndices.add(randomIndex);
    }

    for (let i = 0; i < cells.length; i++) {
        //cell.classList.add('cell', 'hidden');

        // Check if the current index is a mine
        if (mineIndices.has(i)) {
            cells[i].classList.add('mine'); // Add a class or any indication for mines
        }
        cells[i].addEventListener('click', () => handleCellClick(i));
    }

    //additional logic for mines and game state mgmt here
}

function handleCellClick(i) {
    //game logic for handling cell clicks
    console.log('cell clicked', i);
    cells[i].classList.remove('hidden');
    console.log('after hidden class removal')
    if (cells[i].classList.contains('mine')) {
        console.log('MINE CLICKED');
        gameOver();
    }
}

function gameOver() {
    cells.forEach(cell => {
        cell.classList.remove('hidden');
    });
    gameBoard.style.pointerEvents = 'none';
    gameOverMsg.style.visibility = 'visible';
}

function restartGame() {
    gameBoard.style.pointerEvents = '';
    mineIndices.clear();
    gameOverMsg.style.visibility = 'hidden';

    let cellsToHide = document.querySelectorAll('.cell:not(.hidden)');
    cellsToHide.forEach(cell => {
        cell.classList.add('hidden');
    });

    let minesToReset = document.querySelectorAll('.mine');
    cellsToHide.forEach(cell => {
        cell.classList.remove('mine');
    });

    initGame();
}

initGame();