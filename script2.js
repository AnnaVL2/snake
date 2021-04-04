const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// //fillRect()
// ctx.fillStyle = 'limegreen';
// ctx.fillRect(20, 20, 150, 100);

// ctx.fillStyle = 'orange';
// ctx.fillRect(200, 20, 150, 100);


// //strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'red';
// ctx.strokeRect(20, 200, 150, 100);

// //clearRect()
// ctx.clearRect(35, 35, 120, 70);

// //fillText()
// ctx.font = '20px Montserrat';
// ctx.fillStyle = 'grey';
// ctx.fillText('Hello World', 400, 50);

// //Paths
// ctx.beginPath();
// ctx.moveTo(50, 50);

// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// // ctx.lineTo(50, 50);
// ctx.closePath();

// // ctx.stroke();
// ctx.fillStyle = 'coral';
// ctx.fill();

// ctx.beginPath();
// ctx.moveTo(200, 50);

// ctx.lineTo(150, 200);
// ctx.lineTo(250, 200);
// ctx.closePath();
// ctx.fillStyle = 'lime';
// ctx.fill();

// //Rectangle
// ctx.beginPath();
// ctx.rect(270, 50, 160, 90);
// ctx.fillStyle = 'red';
// ctx.fill();

// //Arc (circles)
// ctx.beginPath();
// ctx.arc(300, 300, 200, 0, Math.PI * 2);
// ctx.stroke();

// //Animation 1
// const circle = {
//     x: 200,
//     y: 200,
//     size: 30,
//     dx: 3,
//     dy: 2
// }

// function drawCircle(){
//     ctx.beginPath();
//     ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//     ctx.fillStyle = 'lime';
//     ctx.fill();
// }

// function update() {
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     drawCircle();

//     // change position
//     circle.x += circle.dx;
//     circle.y += circle.dy;

//     // Detect side walls
//     if(circle.x + circle.size > canvas.width ||
//         circle.x - circle.size < 0
//         ){
//         circle.dx *= -1; //  circle.dx = circle.dx * -1
//     }

//     if(circle.y + circle.size > canvas.height ||
//         circle.y - circle.size < 0){
//         circle.dy *= -1;
//     }
//     requestAnimationFrame(update);
// }

// update();

// Animation 2 - Character

const image = document.getElementById('source');

const player = {
    w: 50,
    h: 40,
    x: 20,
    y: 200,
    speed: 3,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.drawImage(image, player.x, player.y, player.w, 
    player.h);
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
}

function newPos(){
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls(){
    //Left 
    if(player.x < 0){
        player.x =0;
    }
    //Right 
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }
    //Top
    if(player.y < 0){
        player.y = 0;
    }
    //Bottom
    if(player.y + player.h > canvas.height){
        player.y = canvas.height - player.h;
    }
};

function update(){
    clear();

    drawPlayer();

    newPos();

    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = -player.speed;
}
function moveDown() {
    player.dy = player.speed;
}
function moveRight() {
    player.dx = player.speed;
}
function moveLeft() {
    player.dx = -player.speed;
}

function keyDown(e) {
    if(e.key === 'ArrowRight' || e.key === 'Right'){
        moveRight();
    } else if(e.key === 'ArrowLeft' || e.key === 'Left') {
        moveLeft();
    } else if(e.key === 'ArrowDown' || e.key === 'Down') {
        moveDown();
    } else if(e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } 

}

function keyUp(e) {
    if(
        e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft' ||
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown'
    ) {
        player.dx =0;
        player.dy =0;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);






