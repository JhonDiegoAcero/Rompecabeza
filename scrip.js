const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const imageContainer = document.getElementById('image-container');
const puzzleContainer = document.getElementById('puzzle-container');
const grid = document.getElementById('grid');
const piecesContainer = document.getElementById('pieces');
const timerDisplay = document.getElementById('timer');

let timerInterval;
let secondsElapsed = 0;

const rows = 12;
const cols = 12;
const pieceSize = 40;

// Función para convertir segundos en formato "MM:SS"
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Iniciar el cronómetro
function startTimer() {
    secondsElapsed = 0;
    timerDisplay.textContent = `Tiempo: ${formatTime(secondsElapsed)}`;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        timerDisplay.textContent = `Tiempo: ${formatTime(secondsElapsed)}`;
    }, 1000);
}

// Detener el cronómetro
function stopTimer() {
    clearInterval(timerInterval);
}

// Resetear el cronómetro
function resetTimer() {
    stopTimer();
    secondsElapsed = 0;
    timerDisplay.textContent = `Tiempo: 00:00`;
}

// Configurar el botón "Iniciar"
startButton.addEventListener('click', () => {
    imageContainer.style.display = 'none';
    puzzleContainer.style.display = 'flex';
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    setupPuzzle();
    startTimer();
});

// Configurar el botón "Volver"
resetButton.addEventListener('click', () => {
    stopTimer();
    resetTimer();
    puzzleContainer.style.display = 'none';
    imageContainer.style.display = 'flex';
    resetButton.style.display = 'none';
    startButton.style.display = 'inline-block';
});

// Configurar el rompecabezas
function setupPuzzle() {
    const positions = [];
    grid.innerHTML = '';
    piecesContainer.innerHTML = '';

    // Generar las celdas del tablero
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            positions.push({ row, col });

            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.style.width = `${pieceSize}px`;
            cell.style.height = `${pieceSize}px`;
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', dropPiece);
            grid.appendChild(cell);
        }
    }

    // Generar las piezas del rompecabezas
    positions.forEach(({ row, col }) => {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundImage = 'url("imag.png")';
        piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
        piece.setAttribute('data-row', row);
        piece.setAttribute('data-col', col);

        piece.draggable = true;
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);

        piecesContainer.appendChild(piece);
    });
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-row') + ',' + event.target.getAttribute('data-col'));
    setTimeout(() => (event.target.style.visibility = 'hidden'), 0);
}

function dragEnd(event) {
    event.target.style.visibility = 'visible';
}

function dragOver(event) {
    event.preventDefault();
}

function dropPiece(event) {
    event.preventDefault();

    const [row, col] = event.dataTransfer.getData('text').split(',').map(Number);
    const piece = document.querySelector(`.piece[data-row='${row}'][data-col='${col}']`);

    if (piece && event.target.classList.contains('grid-cell') && !event.target.hasChildNodes()) {
        event.target.appendChild(piece);
        piece.style.position = 'relative';
        piece.style.left = '0';
        piece.style.top = '0';
        piece.style.width = '100%';
        piece.style.height = '100%';
    }
}


