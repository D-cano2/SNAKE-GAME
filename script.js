// Elementos del HTML
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Configuraciones del juego
const boardSize = 10;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

let snake;
let score;
let direction;
let boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
let emptySquares = [];

// Dibuja un cuadrado (vacío, de la serpiente o comida) en la pantalla
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);
};

// Dibuja la serpiente en la pantalla
const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
};

// Crea el tablero de juego (los cuadrados)
const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue); // Agregar los cuadrados vacíos a la lista
        });
    });
};

// Inicia el juego y configura la serpiente
const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight'; // Dirección inicial
    emptySquares = [];
    createBoard();
    drawSnake(); // Dibuja la serpiente inicial
    updateScore(); // Muestra la puntuación inicial
};

// Actualiza la puntuación
const updateScore = () => {
    scoreBoard.innerText = score;
};

// Función para manejar los eventos de las teclas (flechas)
const directionEvent = (event) => {
    switch (event.code) {
        case 'ArrowUp':
            if (direction !== 'ArrowDown') {
                direction = 'ArrowUp';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'ArrowUp') {
                direction = 'ArrowDown';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'ArrowRight') {
                direction = 'ArrowLeft';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'ArrowLeft') {
                direction = 'ArrowRight';
            }
            break;
        default:
            break;
    }
};

// Maneja el inicio del juego
const startGame = () => {
    setGame(); // Reinicia el juego
    gameOverSign.style.display = 'none'; // Oculta el mensaje de "Game Over"
    startButton.disabled = true; // Desactiva el botón mientras se juega
    drawSnake(); // Dibuja la serpiente inicial
    updateScore(); // Muestra la puntuación inicial
    document.addEventListener('keydown', directionEvent); // Añade el event listener de teclas
    moveInterval = setInterval(() => moveSnake(), gameSpeed); // Inicia el movimiento de la serpiente
};

// Evento del botón para empezar el juego
startButton.addEventListener('click', startGame);
