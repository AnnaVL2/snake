const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Animation 1
const circle2 = {
    x: 100,
    y: 200,
    size: 30,
    speed: 3,
    dx: 2,
    dy: 4
};

function drawCircle(){
    ctx.beginPath();
    ctx.arc(circle2.x, circle2.y, circle2.size, 0, Math.PI * 2);
    ctx.fillStyle = 'Orange';
    ctx.fill();
}

function clear() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawCircle();

    // change position
    circle2.x += circle2.dx;
    circle2.y += circle2.dy;

    // Detect side walls
    if(circle2.x + circle2.size > canvas.width ||
        circle2.x - circle2.size < 0
        ){
        circle2.dx *= -1; //  circle.dx = circle.dx * -1
    }

    if(circle2.y + circle2.size > canvas.height ||
        circle2.y - circle2.size < 0){
        circle2.dy *= -1;
    }
    requestAnimationFrame(update);
}

function update(){
    clear();

    drawCircle();
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = circle2.dy === -1; // goingUp = circle.dy === -10;
    const goingDown = circle2.dy === 1; // goingDown = circle.dy === 10;
    const goingRight = circle2.dx === 1; // goingRight = circle.dx === 10;
    const goingLeft = circle2.dx === -1; // goingLeft = circle.dx === -10;

    if (keyPressed === LEFT_KEY) {
        circle2.dx = circle2.speed - 2.1;
        circle2.dy = circle2.speed - 0.8;
    }
    if (keyPressed === UP_KEY) {
        circle2.dx = circle2.speed - 2;
        circle2.dy = circle2.speed - 3;
    }
    if (keyPressed === RIGHT_KEY) {
        circle2.dx = circle2.speed  + 1.1;
        circle2.dy = circle2.speed - 1.4;
    }
    if (keyPressed === DOWN_KEY) {
        circle2.dx = circle2.speed ;
        circle2.dy = circle2.speed + 1;
    }
}

update();

document.addEventListener("keydown", change_direction);

