const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//Animation 1
const circle = {
    x: 200,
    y: 400,
    size: 20,
    speed: 1,
    dx: 1,
    dy: 2
};


//////////////////////////////
let score = 0;

const staticBall = {
    x: Math.random() * (60 - 1) + 1,
    y: Math.random() * (60 - 1) + 1,
    size: Math.random() * (100 - 20) + 20,

    // x: random_statics(canvas.height - 10, canvas.width - 10),
    // y: random_statics(canvas.width - 10, canvas.height - 10),
    // size: random_statics(5, 100),

}

// let staticBall_x;
// let staticBall_y;

// update();
gen_statics();

function has_game_ended() {
    if (score === 10) return true
}

function update() {

    if (has_game_ended()) return;

    setTimeout(function onTick() {
        clear();

        // drawFood***
        drawStatic();
      
        drawCircle();
        // Call main again
        update();
  }, 100)
}

function random_statics(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

//**  & should grow static space
function hit_static() {
    const has_touched = circle.x === staticBall.x || circle.y === staticBall.y;
    if (has_touched){
        console.log('hit!');
        // Increase score
        // score += 1;
        // Display score on screen
        // document.getElementById("score").innerHTML = score;
        // Generate new staticBall location
        gen_statics();
    }
    return true;
}

function gen_statics() {
    // Generate a random number the food x-coordinate
    staticBall.x = random_statics(0, canvas.width - 100);
    // Generate a random number for the food y-coordinate
    staticBall.y = random_statics(0, canvas.height - 100);

    staticBall.size =  Math.random() * (100 - 20) + 20;

    // Increase score
    score += 1;
    // Display score on screen
    document.getElementById("score").innerHTML = score;
  }

function update(){
    clear();
    drawStatic();
    drawCircle();
    // hit_static();
}

function drawStatic() {
    ctx.beginPath();
    ctx.arc(staticBall.x, staticBall.y, staticBall.size, 0,  Math.PI * 2)
    ctx.fillStyle = '#2f4f4f';
    ctx.fill();
}


//////////////////////////////
function drawCircle(){
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'MistyRose';
    ctx.fill();
}

function clear() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawCircle();

    // change position
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Detect side walls
    if(circle.x + circle.size > canvas.width ||
        circle.x - circle.size < 0
        ){
        circle.dx *= -1; //  circle.dx = circle.dx * -1
    }

    if(circle.y + circle.size > canvas.height ||
        circle.y - circle.size < 0){
        circle.dy *= -1;
    }
    requestAnimationFrame(update);
}

// function update(){
//     clear();

//     drawCircle();
// }

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = circle.dy === -1; // goingUp = circle.dy === -10;
    const goingDown = circle.dy === 1; // goingDown = circle.dy === 10;
    const goingRight = circle.dx === 1; // goingRight = circle.dx === 10;
    const goingLeft = circle.dx === -1; // goingLeft = circle.dx === -10;

    if (keyPressed === LEFT_KEY) {
        circle.dx = circle.speed - 2.1;
        circle.dy = circle.speed - 0.8;
    }
    if (keyPressed === UP_KEY) {
        circle.dx = circle.speed - 2;
        circle.dy = circle.speed - 3;
    }
    if (keyPressed === RIGHT_KEY) {
        circle.dx = circle.speed  + 1.1;
        circle.dy = circle.speed - 1.4;
    }
    if (keyPressed === DOWN_KEY) {
        circle.dx = circle.speed ;
        circle.dy = circle.speed + 1;
    }

///////////////////////////
    // const has_touched_statics = circle.x === staticBall_x || circle.y === staticBall_y;
    
    // const has_touched_statics = circle.x === staticBall.x || circle.y === staticBall.y;
    // if (hit_static()===true) {
    //   // Increase score
    //   score += 1;
    //   // Display score on screen
    //   document.getElementById("score").innerHTML = score;
    //   // Generate new static location
    //   gen_statics();
    // }
gen_statics();

}

update();


document.addEventListener("keydown", change_direction);