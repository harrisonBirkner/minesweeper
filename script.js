let gameBoard = document.getElementById('game-board');
const ROWS = 10;
const COLS = 10;
const MINES_COUNT = 20;
let gameOverMsg = document.getElementById('game-over');
let cells = Array.from(document.querySelectorAll('.cell'));
let mineIndices = new Set();
const restartBtn = document.getElementById('restart');
const pauseBtn = document.getElementById('pause-btn');
pauseBtn.addEventListener('click', () => pauseGame());
restartBtn.addEventListener('click', () => restartGame());
const pauseMenu = document.getElementById('pause-menu');

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
    else {
        checkAndExpandSurroundingCells(i);
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
    console.log('inside restart');
    if ((getComputedStyle(pauseMenu).display == 'grid') || (pauseMenu.style.display == 'grid')) {
        console.log('inside if');
        pauseMenu.style.display = 'none';
        pauseBtn.textContent = 'Pause';
    }
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

function pauseGame() {

    if (getComputedStyle(pauseMenu).display == 'none') {
        console.log("pausing")
        pauseBtn.textContent = 'Resume';
        pauseMenu.style.display = 'grid';
    }
    else {
        console.log("resuming")
        pauseBtn.textContent = 'Pause';
        pauseMenu.style.display = 'none';
    }
}

function checkAndExpandSurroundingCells(i) {
    let surroundingCells = new Array(8).fill(null); //any given square will have a max of 8 squares surrounding it
                                                    //first index is top left corner, then continues clockwise
    //top left
    if ((i >= 11 && i <= 19) || 
        (i >= 21 && i <= 29) || 
        (i >= 31 && i <= 39) || 
        (i >= 41 && i <= 49) || 
        (i >= 51 && i <= 59) || 
        (i >= 61 && i <= 69) || 
        (i >= 71 && i <= 79) || 
        (i >= 81 && i <= 89) || 
        (i >= 91 && i <= 99)) {
        surroundingCells[0] = (i - 11);
    }
    //top middle
    if ((i >= 10 && i <= 19) || 
        (i >= 20 && i <= 29) || 
        (i >= 30 && i <= 39) || 
        (i >= 40 && i <= 49) || 
        (i >= 50 && i <= 59) || 
        (i >= 60 && i <= 69) || 
        (i >= 70 && i <= 79) || 
        (i >= 80 && i <= 89) || 
        (i >= 90 && i <= 99)) {
        surroundingCells[1] = (i - 10);
    }
    //top right 
    if ((i >= 10 && i <= 18) || 
        (i >= 20 && i <= 28) || 
        (i >= 30 && i <= 38) || 
        (i >= 40 && i <= 48) || 
        (i >= 50 && i <= 58) || 
        (i >= 60 && i <= 68) || 
        (i >= 70 && i <= 78) || 
        (i >= 80 && i <= 88) || 
        (i >= 90 && i <= 98)) {
            surroundingCells[2] = (i - 9);
    }
    //middle right
    if ((i >= 0 && i <= 8) ||
        (i >= 10 && i <= 18) || 
        (i >= 20 && i <= 28) || 
        (i >= 30 && i <= 38) || 
        (i >= 40 && i <= 48) || 
        (i >= 50 && i <= 58) || 
        (i >= 60 && i <= 68) || 
        (i >= 70 && i <= 78) || 
        (i >= 80 && i <= 88) || 
        (i >= 90 && i <= 98)) {
            surroundingCells[3] = (i + 1);
    }
    //bottom right
    if ((i >= 0 && i <= 8) ||
        (i >= 10 && i <= 18) || 
        (i >= 20 && i <= 28) || 
        (i >= 30 && i <= 38) || 
        (i >= 40 && i <= 48) || 
        (i >= 50 && i <= 58) || 
        (i >= 60 && i <= 68) || 
        (i >= 70 && i <= 78) || 
        (i >= 80 && i <= 88)) {
            surroundingCells[4] = (i + 11);
    }
    //bottom middle
    if ((i >= 0 && i <= 9) ||
        (i >= 10 && i <= 19) || 
        (i >= 20 && i <= 29) || 
        (i >= 30 && i <= 39) || 
        (i >= 40 && i <= 49) || 
        (i >= 50 && i <= 59) || 
        (i >= 60 && i <= 69) || 
        (i >= 70 && i <= 79) || 
        (i >= 80 && i <= 89)) {
            surroundingCells[5] = (i + 10);
    }
    //bottom left
    if ((i >= 1 && i <= 9) ||
        (i >= 11 && i <= 19) || 
        (i >= 21 && i <= 29) || 
        (i >= 31 && i <= 39) || 
        (i >= 41 && i <= 49) || 
        (i >= 51 && i <= 59) || 
        (i >= 61 && i <= 69) || 
        (i >= 71 && i <= 79) || 
        (i >= 81 && i <= 89)) {
            surroundingCells[6] = (i + 9);
    }
    //middle left
    if ((i >= 1 && i <= 9) ||
        (i >= 11 && i <= 19) || 
        (i >= 21 && i <= 29) || 
        (i >= 31 && i <= 39) || 
        (i >= 41 && i <= 49) || 
        (i >= 51 && i <= 59) || 
        (i >= 61 && i <= 69) || 
        (i >= 71 && i <= 79) || 
        (i >= 81 && i <= 89) || 
        (i >= 91 && i <= 99)) {
            surroundingCells[7] = (i - 1);
    }
    console.log(surroundingCells);
}

initGame();