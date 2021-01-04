//import "../CSS/styles.css";
import Paddle from "/static/javascript/paddle.js";
//import Paddle from "{{ url_for('static', filename='javascript/paddle.js')}}"
import InputHandler from "/static/javascript/input.js";
import Ball from "/static/javascript/ball.js";
import Brick from "/static/javascript/brick.js";

//canvas setup
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
var level_time = 10;

//clear the screen initially
ctx.clearRect(0, 0, canvas.width, canvas.height);

//create paddle object
let paddle = new Paddle(canvas.width, canvas.height);

//create input handler
let input_handler = new InputHandler(paddle);

//create ball object
let ball = new Ball(canvas.width, canvas.height);

//create brick
//let brick = new Brick(canvas.width, { x: 0, y: 0 }, "green");

paddle.draw(ctx);
ball.draw(ctx);
//brick.draw(ctx);

let past_time = 0;
let brickarray = [[]];
for(let i=0; i<10; i++){
  brickarray[0].push(new Brick(canvas.width, { x: (canvas.width/10*i), y: 0 }, "green"))
}

var start_time = new Date();

function gameloop(timestamp) {
  let deltatime = timestamp - past_time;
  past_time = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle.update(deltatime);
  paddle.draw(ctx);
  ball.update(deltatime, paddle, brickarray);
  ball.draw(ctx);
  //brick.draw(ctx);

  let endtime = new Date();
  let time_elapsed = (endtime - start_time)/1000;
  if (time_elapsed > level_time){
    start_time = endtime;
    let row = []
    for(let i=0; i<10; i++){
      row.push(new Brick(canvas.width, { x: (canvas.width/10*i), y: 0 }, "green"))
    }
    brickarray.push(row);
    for(let i=0; i<brickarray.length-1; i++){
      for(let j=0; j<brickarray[i].length; j++){
        brickarray[i][j].change_level();
      }
    }
  }
  for(let i=0; i<brickarray.length; i++){
    for(let j=0; j<brickarray[i].length; j++){
      brickarray[i][j].draw(ctx);
    }
  }

  requestAnimationFrame(gameloop);
}

gameloop();
