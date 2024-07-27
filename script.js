let gameBoard = document.getElementById('game-board');
const rows = 10;
const cols = 10;
const minesCount = 20;
let cells = [];
let mineIndices = new Set();
const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', () => restartGame());

//init game
function initGame() {

    
    // Create a unique set of mine indices
    while (mineIndices.size < minesCount) {
        let randomIndex = Math.floor(Math.random() * (rows * cols));
        mineIndices.add(randomIndex);
    }

    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell', 'hidden');

        // Check if the current index is a mine
        if (mineIndices.has(i)) {
            cell.classList.add('mine'); // Add a class or any indication for mines
        }

        cell.addEventListener('click', () => handleCellClick(i));
        cells.push(cell);
        gameBoard.appendChild(cell);
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
    let gameOverDiv = document.createElement('div');
    gameOverDiv.id = 'game-over';
    let gameOverMsg = document.createElement('h2');
    gameOverMsg.style.color = 'red';
    gameOverMsg.textContent = 'Game Over';
    gameOverDiv.appendChild(gameOverMsg);
    document.body.appendChild(gameOverDiv);
}

function restartGame() {
    gameBoard.textContent = '';
    gameBoard.style.pointerEvents = '';
    mineIndices.clear();
    document.body.removeChild(document.getElementById('game-over'));
    initGame();
}

initGame();