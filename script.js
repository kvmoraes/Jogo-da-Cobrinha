let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake [0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //Math.floor: retira a parte decimal do numero
    y: Math.floor(Math.random() * 15 + 1) * box //Math.random: cria numeros aleatorios
}

function criarBG() {
    context.fillStyle = "lightgreen"; //definir estilos
    context.fillRect(0, 0, 16 * box, 16 * box); //definir parametros: (coordenadas x, y, dimensões width, height)
}

function criarCobra() {
    for (i=0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
} 

//passar comando com teclas
document.addEventListener('keydown', update); //keydown: evento de clique
function update (event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    
    //retornar do outro lado
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //game over
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobra();
    drawFood();

    //impressão de movimento
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //aumentar tamanho da cobra
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;  
    }

    //fazer cabeça da cobra 
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //acrescenta 1 no primeiro elemento
}

let jogo = setInterval(iniciarJogo, 100); //selecionar intervalo
