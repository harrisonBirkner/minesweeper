const gameBoard = document.getElementById('game-board');
const rows = 10;
const cols = 10;
const minesCount = 20;
let cells = [];
let mineIndices = new Set();

//init game
function initGame() {

    
    // Create a unique set of mine indices
    while (mineIndices.size < minesCount) {
        const randomIndex = Math.floor(Math.random() * (rows * cols));
        mineIndices.add(randomIndex);
    }

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
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
    cells[i].classList.remove('hidden');
    if (cells[i].classList.contains('mine')) {
        cells.forEach(cell => {
            cell.classList.remove('hidden');
        });
        gameBoard.style.pointerEvents = 'none';
    }
}

initGame();