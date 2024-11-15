const imageSrc = 'imag.png'; // Ruta de la imagen del rompecabezas
const rows = 4; // Divisiones en filas
const cols = 3; // Divisiones en columnas
const pieceWidth = 100;
const pieceHeight = 100;

const piecesContainer = document.getElementById('pieces');
const dropZone = document.getElementById('drop-zone');

// Función para crear las piezas del rompecabezas
function createPuzzlePieces() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.draggable = true;

            // Estilo para mostrar la parte correspondiente de la imagen
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundSize = `${cols * 100}px ${rows * 100}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

            // Asignar una posición aleatoria inicial
            piece.style.position = 'absolute';
            piece.style.left = `${Math.random() * (window.innerWidth - pieceWidth)}px`;
            piece.style.top = `${Math.random() * (window.innerHeight - pieceHeight)}px`;

            // Guardar la posición correcta como atributo
            piece.dataset.correctRow = row;
            piece.dataset.correctCol = col;

            piece.id = `piece-${row}-${col}`;
            document.body.appendChild(piece);

            // Evento de arrastre
            piece.addEventListener('dragstart', dragStart);
        }
    }
}

// Manejo del inicio del arrastre
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

// Permitir que las piezas se suelten en el área de ensamblaje
dropZone.addEventListener('dragover', (e) => e.preventDefault());

// Manejar la colocación de piezas en el área de ensamblaje
dropZone.addEventListener('drop', dropPiece);

function dropPiece(e) {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('text');
    const piece = document.getElementById(pieceId);

    // Calcular la celda donde se soltó la pieza
    const dropRect = dropZone.getBoundingClientRect();
    const x = e.clientX - dropRect.left;
    const y = e.clientY - dropRect.top;

    const col = Math.floor(x / pieceWidth);
    const row = Math.floor(y / pieceHeight);

    // Validar si la posición es correcta
    if (
        parseInt(piece.dataset.correctRow) === row &&
        parseInt(piece.dataset.correctCol) === col
    ) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.gridRowStart = row + 1;
        cell.style.gridColumnStart = col + 1;
        cell.style.width = `${pieceWidth}px`;
        cell.style.height = `${pieceHeight}px`;

        piece.style.position = 'relative';
        piece.style.left = '';
        piece.style.top = '';

        cell.appendChild(piece);
        dropZone.appendChild(cell);
    } else {
        alert('Esta pieza no encaja aquí.');
    }
}

// Llama a la función para crear las piezas cuando la página cargue
window.addEventListener('load', createPuzzlePieces);
