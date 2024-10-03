// Rellena cada cuadrado del tablero
// @params 
// square: posición del cuadrado,
// type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
const drawSquare = (square, type) => {
    // Convertimos el ID del cuadrado en un array de dos elementos: fila y columna
    // Ejemplo: '00' -> ['0', '0']
    const row = parseInt(square[0], 10); // Extraemos la fila del cuadrado
    const column = parseInt(square[1], 10); // Extraemos la columna del cuadrado

    // Actualizamos el estado de la cuadrícula 'boardSquares' con el tipo de cuadrado
    boardSquares[row][column] = squareTypes[type];

    // Seleccionamos el elemento HTML correspondiente al cuadrado utilizando su ID
    const squareElement = document.getElementById(square);

    // Asignamos las clases CSS correspondientes al cuadrado, basándonos en el tipo
    // Se aplica la clase "square" siempre, y luego se le asigna la clase específica del tipo (emptySquare, snakeSquare, foodSquare)
    squareElement.setAttribute('class', `square ${type}`);

    // Si el tipo es 'emptySquare', agregamos este cuadrado a la lista de cuadrados vacíos
    if (type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        // Si el cuadrado ya está en la lista de cuadrados vacíos y es otro tipo, lo eliminamos de esa lista
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
};

// Crea el tablero inicial del juego
const createBoard = () => {
    // Iteramos sobre cada fila del tablero (es un array de arrays, 10x10)
    boardSquares.forEach((row, rowIndex) => {
        // Iteramos sobre cada columna en la fila
        row.forEach((column, columnIndex) => {
            // Creamos un identificador único para cada cuadrado con base en las coordenadas fila-columna
            const squareValue = `${rowIndex}${columnIndex}`;

            // Creamos un nuevo div HTML para representar el cuadrado
            const squareElement = document.createElement('div');

            // Asignamos clases CSS al cuadrado: 'square' y 'emptySquare' (cuadrado vacío)
            squareElement.setAttribute('class', 'square emptySquare');

            // Asignamos el ID del cuadrado para que podamos referenciarlo posteriormente
            squareElement.setAttribute('id', squareValue);

            // Agregamos el div al tablero en el DOM
            board.appendChild(squareElement);

            // Añadimos la posición del cuadrado a la lista de cuadrados vacíos
            emptySquares.push(squareValue);
        });
    });
};

// Esta función se llama para inicializar el juego y establecer las variables iniciales
const setGame = () => {
    // Inicializamos la serpiente como una lista de posiciones (cuadrados) en el tablero
    snake = ['00', '01', '02', '03']; // La serpiente empieza con 4 partes en fila

    // Establecemos el puntaje inicial basado en la longitud de la serpiente (4 partes)
    score = snake.length;

    // Inicializamos la dirección de movimiento de la serpiente (empezamos moviéndola a la derecha)
    direction = 'ArrowRight';

    // Creamos una matriz bidimensional de 10x10 para representar los cuadrículas del tablero
    // Inicializamos todas las casillas como vacías (0)
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));

    // Limpiamos el tablero en el DOM antes de volver a llenarlo
    board.innerHTML = '';

    // Reseteamos el arreglo de cuadrados vacíos
    emptySquares = [];

    // Llamamos a la función que crea los cuadrados visualmente en el tablero
    createBoard();
};

// Función para iniciar el juego al presionar el botón "Start"
const startGame = () => {
    // Inicializamos el juego con las configuraciones iniciales
    setGame();

    // Ocultamos la señal de "Game Over"
    gameOverSign.style.display = 'none';

    // Desactivamos el botón "Start" para que no pueda volver a hacer clic mientras el juego está en curso
    startButton.disabled = true;

    // Dibujamos la serpiente en el tablero (se representará con los cuadrados de tipo 'snakeSquare')
    drawSnake();

    // Mostramos el puntaje actual (inicialmente es la longitud de la serpiente)
    updateScore();

    // Creamos la primera pieza de comida en una posición aleatoria
    createRandomFood();

    // Añadimos un listener para los eventos de teclado (movimientos de la serpiente)
    document.addEventListener('keydown', directionEvent);

    // Iniciamos un intervalo para mover la serpiente cada 'gameSpeed' milisegundos
    moveInterval = setInterval(() => moveSnake(), gameSpeed);
};

// Asignamos la función para manejar la dirección del movimiento de la serpiente
const directionEvent = (key) => {
    // Revisamos qué tecla fue presionada y cambiamos la dirección de la serpiente
    switch (key.code) {
        case 'ArrowUp':
            // Cambiamos la dirección solo si no es la dirección opuesta (hacia abajo)
            direction != 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            // Cambiamos la dirección solo si no es la dirección opuesta (hacia arriba)
            direction != 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            // Cambiamos la dirección solo si no es la dirección opuesta (hacia la derecha)
            direction != 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            // Cambiamos la dirección solo si no es la dirección opuesta (hacia la izquierda)
            direction != 'ArrowLeft' && setDirection(key.code);
            break;
    }
};

// Esta función cambia la dirección de la serpiente basándose en la tecla presionada
const setDirection = (newDirection) => {
    direction = newDirection; // Establece la nueva dirección
};
