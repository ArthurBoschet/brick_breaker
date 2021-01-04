import "../CSS/styles.css";
import Paddle from "/javascript/paddle";
import InputHandler from "/javascript/input";
import Ball from "/javascript/ball";
import Brick from "/javascript/brick";

//canvas setup
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

//clear the screen initially
ctx.clearRect(0, 0, canvas.width, canvas.height);

//create paddle object
let paddle = new Paddle(canvas.width, canvas.height);

//create input handler
let input_handler = new InputHandler(paddle);

//create ball object
let ball = new Ball(canvas.width, canvas.height);

//create brick
let brick = new Brick(canvas.width, { x: 0, y: 0 }, "green");

paddle.draw(ctx);
ball.draw(ctx);
brick.draw(ctx);

let past_time = 0;
/*let brickarray = [];
for(let i=0; i<10; i++){
  brickarray.push(new Brick(canvas.width, { x: (canvas.width/10*i), y: 0 }, "green"))
}*/

function gameloop(timestamp) {
  let deltatime = timestamp - past_time;
  past_time = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle.update(deltatime);
  paddle.draw(ctx);
  ball.update(deltatime, paddle);
  ball.draw(ctx);
  brick.draw(ctx);

  requestAnimationFrame(gameloop);
}

gameloop();
