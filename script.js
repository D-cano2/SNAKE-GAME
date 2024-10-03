const canvas = document.getElementById('snakeGame');  // Selecciona el canvas donde se va a dibujar
const ctx = canvas.getContext('2d');  // Obtiene el contexto 2D para dibujar en el canvas

const box = 20;  // Tamaño de cada parte de la serpiente y la comida

let snake = [{ x: box * 5, y: box * 5 }];  // La serpiente empieza en el centro del canvas
let direction = 'RIGHT';  // Dirección inicial de la serpiente
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };  // Posición aleatoria de la comida

// Se ejecuta cada vez que presionamos una tecla
document.addEventListener('keydown', changeDirection);  // Detecta el evento de las teclas

/**
 * Esta función cambia la dirección de la serpiente
 * Asegura que no se mueva en la dirección opuesta a la actual.
 */
function changeDirection(event) {
    const key = event.key;  // Capturamos la tecla presionada

    // Cambia la dirección solo si la tecla es diferente de la dirección opuesta
    if (key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';  // Cambia la dirección hacia arriba
    } else if (key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';  // Cambia la dirección hacia abajo
    } else if (key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';  // Cambia la dirección hacia izquierda
    } else if (key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';  // Cambia la dirección hacia derecha
    }
}

/**
 * Dibuja la serpiente y la comida en el canvas
 * Actualiza la posición de la serpiente y maneja las colisiones.
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia el canvas

    // Dibuja la comida (roja)
    ctx.fillStyle = 'red';  
    ctx.fillRect(food.x, food.y, box, box);  

    // Dibuja la serpiente (verde)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';  // La cabeza es verde, el cuerpo es verde claro
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  // Dibuja cada parte de la serpiente
        ctx.strokeStyle = 'darkgreen';  // Color del borde
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);  // Dibuja el borde de cada parte de la serpiente
    }

    // Calculamos la nueva posición de la cabeza de la serpiente
    let snakeX = snake[0].x;  // Coordenada X de la cabeza
    let snakeY = snake[0].y;  // Coordenada Y de la cabeza

    // Actualizamos las coordenadas de la cabeza según la dirección actual
    if (direction === 'UP') snakeY -= box;   // Mueve la cabeza hacia arriba
    if (direction === 'DOWN') snakeY += box; // Mueve la cabeza hacia abajo
    if (direction === 'LEFT') snakeX -= box; // Mueve la cabeza hacia la izquierda
    if (direction === 'RIGHT') snakeX += box; // Mueve la cabeza hacia la derecha

    // Verificamos si la serpiente ha comido la comida
    if (snakeX === food.x && snakeY === food.y) {
        // Colocamos la comida en una nueva posición aleatoria
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        // Si no ha comido, eliminamos la última parte del cuerpo (movemos la serpiente)
        snake.pop();
    }

    // Creamos un nuevo objeto que será la nueva cabeza de la serpiente
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);  // Agregamos la nueva cabeza al principio de la serpiente

    // Verificamos si la serpiente ha chocado contra los bordes o consigo misma
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead)) {
        clearInterval(game);  // Si hay colisión, detenemos el juego
    }
}

/**
 * Verifica si la serpiente ha chocado con alguna parte de su cuerpo
 */
function collision(head) {
    for (let i = 1; i < snake.length; i++) {  // Excluye la cabeza de la serpiente
        if (head.x === snake[i].x && head.y === snake[i].y) {  // Si la cabeza toca el cuerpo
            return true;  // Hay colisión
        }
    }
    return false;  // No hay colisión
}

// Llama a la función 'draw' cada 100 milisegundos (10 veces por segundo)
const game = setInterval(draw, 100);  // El juego se actualiza cada 100ms
