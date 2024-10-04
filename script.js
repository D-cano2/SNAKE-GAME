// Elementos del HTML
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Configuraciones del juego
const boardSize = 10;
const gameSpeed = 100; // Velocidad del movimiento de la serpiente (100ms entre cada movimiento)
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

// Definición de direcciones (hacia arriba, abajo, izquierda, derecha)
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowLeft: -1,
    ArrowRight: 1
};

let snake;
let score;
let direction;
let boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
let emptySquares = [];
let moveInterval; // Definición de la variable para el intervalo de movimiento

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

// Mueve la serpiente según la dirección actual
const moveSnake = () => {
    const head = snake[snake.length - 1]; // Obtén la última parte de la serpiente (la cabeza)
    const newHead = String(
        Number(head) + directions[direction] // Suma la dirección para mover la cabeza
    ).padStart(2, '0'); // Calcula la nueva cabeza sumando la dirección actual al índice de la cabeza.

    const [row, col] = newHead.split(''); // Extrae la fila y columna de la nueva cabeza

    // Verifica si la serpiente choca con el borde o con ella misma
    if (
        newHead < 0 ||
        newHead >= boardSize * boardSize ||
        (direction === 'ArrowRight' && col === '0') ||
        (direction === 'ArrowLeft' && col === '9') ||
        boardSquares[row][col] === squareTypes.snakeSquare
    ) {
        gameOver(); // Si choca, termina el juego
    } else {
        snake.push(newHead); // Mueve la serpiente añadiendo una nueva cabeza

        // Si la nueva posición es comida, añade comida y actualiza la puntuación
        if (boardSquares[row][col] === squareTypes.foodSquare) {
            addFood(); // Si hay comida en la nueva posición, añade más comida y no elimina cola
        } else {
            const tail = snake.shift(); // Si no hay comida, elimina la cola
            drawSquare(tail, 'emptySquare'); // Limpia la cola
        }

        drawSnake(); // Dibuja la nueva serpiente
    }
};

// Añade comida en una posición aleatoria
const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
};

// Crea una posición aleatoria de comida
const createRandomFood = () => {
    let randomEmptySquare;
    do {
        randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    } while (snake.includes(randomEmptySquare)); // Asegúrate de que no sea parte de la serpiente
    drawSquare(randomEmptySquare, 'foodSquare');
};

// Maneja el inicio del juego
const startGame = () => {
    setGame(); // Reinicia el juego
    gameOverSign.style.display = 'none'; // Oculta el mensaje de "Game Over"
    startButton.disabled = true; // Desactiva el botón mientras se juega
    drawSnake(); // Dibuja la serpiente inicial
    updateScore(); // Muestra la puntuación inicial
    document.addEventListener('keydown', directionEvent); // Añade el event listener de teclas
    moveInterval = setInterval(() => moveSnake(), gameSpeed); // Inicia el movimiento de la serpiente con el intervalo definido por gameSpeed
};

// Evento del botón para empezar el juego
startButton.addEventListener('click', startGame);
