const imageSrc = 'imag.png'; // Ruta de la imagen
const rows = 4; // Filas del rompecabezas
const cols = 3; // Columnas del rompecabezas
const pieceWidth = 100; // Ancho de cada pieza
const pieceHeight = 100; // Alto de cada pieza

const dropZone = document.getElementById('drop-zone');
const piecesContainer = document.getElementById('pieces');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

// Mostrar la imagen completa en el área del rompecabezas
function showFullImage() {
    dropZone.style.backgroundImage = `url(${imageSrc})`;
    dropZone.style.backgroundSize = `${cols * pieceWidth}px ${rows * pieceHeight}px`;
    dropZone.innerHTML = ''; // Limpia las piezas del área
    piecesContainer.style.display = 'none'; // Oculta las piezas
    resetButton.style.display = 'none'; // Oculta el botón "Volver"
    startButton.style.display = 'block'; // Muestra el botón "Iniciar"
}

// Iniciar el juego: Ocultar la imagen completa y mostrar las piezas
function startGame() {
    dropZone.style.backgroundImage = ''; // Oculta la imagen completa
    piecesContainer.innerHTML = ''; // Limpia las piezas previas
    createPuzzlePieces(); // Genera las piezas
    piecesContainer.style.display = 'flex'; // Muestra las piezas
    startButton.style.display = 'none'; // Oculta el botón "Iniciar"
    resetButton.style.display = 'block'; // Muestra el botón "Volver"
}

// Reiniciar el juego: Mostrar nuevamente la imagen completa
function resetGame() {
    showFullImage();
}

// Crear las piezas del rompecabezas y ubicarlas en orden
function createPuzzlePieces() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.draggable = true;
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundSize = `${cols * pieceWidth}px ${rows * pieceHeight}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            piece.dataset.row = row;
            piece.dataset.col = col;

            piecesContainer.appendChild(piece);
            piece.addEventListener('dragstart', dragStart);
        }
    }
}

// Arrastrar piezas
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.row + ',' + e.target.dataset.col);
}

// Permitir soltar piezas
dropZone.addEventListener('dragover', (e) => e.preventDefault());

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const [row, col] = e.dataTransfer.getData('text/plain').split(',');
    const x = col * pieceWidth;
    const y = row * pieceHeight;

    // Validar si la posición es correcta dentro del área del rompecabezas
    if (
        e.offsetX >= x &&
        e.offsetX < x + pieceWidth &&
        e.offsetY >= y &&
        e.offsetY < y + pieceHeight
    ) {
        const piece = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        piece.style.position = 'absolute';
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;
        piece.style.pointerEvents = 'none'; // Evitar mover una pieza colocada
        dropZone.appendChild(piece);
    } else {
        alert('Coloca la pieza en el lugar correcto.');
    }
});

// Configurar botones
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Mostrar la imagen completa al cargar
window.addEventListener('load', showFullImage);
