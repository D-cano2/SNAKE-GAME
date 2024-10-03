// Seleccionamos el elemento canvas en el HTML y obtenemos su contexto 2D
const canvas = document.getElementById('snakeGame');  // Obtiene el elemento canvas con el ID 'snakeGame'
const ctx = canvas.getContext('2d');  // Obtiene el contexto de 2D para dibujar en el canvas

// Definimos el tamaño de cada "cuadro" de la serpiente en píxeles (20px)
const box = 20; // Cada parte de la serpiente y la comida ocuparán un espacio de 20x20 píxeles

// Inicializamos la serpiente como un array de coordenadas (x, y) que representan sus partes
let snake = [{ x: box * 5, y: box * 5 }];  // La serpiente empieza en el centro del canvas

// Definimos la dirección inicial de la serpiente
let direction = 'RIGHT';  // La serpiente se mueve hacia la derecha al principio

// Definimos la posición de la comida aleatoriamente en el canvas
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
// Math.random() genera un número entre 0 y 1, y lo multiplicamos por 20 para que sea un múltiplo de 'box'

/**
 * Esta función se ejecuta cada vez que el usuario presiona una tecla.
 * Cambia la dirección de la serpiente en función de la tecla presionada.
 */
document.addEventListener('keydown', changeDirection);  // Detecta la tecla que se presiona y llama a la función changeDirection

/**
 * Esta función cambia la dirección de la serpiente.
 * Asegura que la serpiente no pueda moverse directamente en la dirección opuesta a su movimiento actual.
 */
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';      // Cambia la dirección hacia arriba si no está yendo hacia abajo
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';    // Cambia la dirección hacia abajo si no está yendo hacia arriba
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT'; // Cambia la dirección hacia izquierda si no está yendo hacia derecha
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT'; // Cambia la dirección hacia derecha si no está yendo hacia izquierda
}

/**
 * Esta es la función principal que dibuja la serpiente y la comida en el canvas.
 * También actualiza la posición de la serpiente.
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Borra el canvas en cada frame para actualizar la vista
    
    // Dibuja la comida (cuadro rojo)
    ctx.fillStyle = 'red';  // Establece el color de la comida como rojo
    ctx.fillRect(food.x, food.y, box, box);  // Dibuja la comida como un cuadro de tamaño 'box' (20x20)

    // Dibuja la serpiente
    for (let i = 0; i < snake.length; i++) {  // Itera sobre cada parte de la serpiente
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';  // La cabeza de la serpiente es verde, y el resto es verde claro
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  // Dibuja cada parte de la serpiente como un cuadrado
        ctx.strokeStyle = 'darkgreen';  // Establece el borde de la serpiente en verde oscuro
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);  // Dibuja el borde de cada parte de la serpiente
    }
    
    // Calculamos la nueva posición de la cabeza de la serpiente
    let snakeX = snake[0].x;  // La coordenada X de la cabeza
    let snakeY = snake[0].y;  // La coordenada Y de la cabeza

    if (direction === 'UP') snakeY -= box;      // Si la dirección es 'UP', la cabeza sube (restamos 'box' a Y)
    if (direction === 'DOWN') snakeY += box;    // Si la dirección es 'DOWN', la cabeza baja (sumamos 'box' a Y)
    if (direction === 'LEFT') snakeX -= box;    // Si la dirección es 'LEFT', la cabeza se mueve a la izquierda (restamos 'box' a X)
    if (direction === 'RIGHT') snakeX += box;   // Si la dirección es 'RIGHT', la cabeza se mueve a la derecha (sumamos 'box' a X)

    // Comprobamos si la serpiente come la comida (cuando la cabeza toca la comida)
    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };  // Coloca la comida en una nueva posición aleatoria
    } else {
        snake.pop();  // Si la serpiente no ha comido la comida, elimina la última parte de la serpiente (mueve la cola)
    }

    // Creamos un nuevo objeto que representa la nueva cabeza de la serpiente con las coordenadas actualizadas
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);  // Añadimos la nueva cabeza al principio de la serpiente

    // Comprobamos si la serpiente choca con los bordes del canvas o consigo misma
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead)) {
        clearInterval(game);  // Si hay una colisión, detiene el juego
    }
}

/**
 * Esta función comprueba si la cabeza de la serpiente choca con alguna de las partes de su cuerpo.
 */
function collision(head) {
    for (let i = 1; i < snake.length; i++) {  // Itera sobre el cuerpo de la serpiente (excluyendo la cabeza)
        if (head.x === snake[i].x && head.y === snake[i].y) {  // Si la cabeza toca alguna parte del cuerpo
            return true;  // Hay colisión
        }
    }
    return false;  // No hay colisión
}

// Llama a la función 'draw' cada 100 milisegundos (10 veces por segundo) para actualizar el juego
const game = setInterval(draw, 100);  // La función 'draw' se ejecuta cada 100ms (o 10 veces por segundo)
