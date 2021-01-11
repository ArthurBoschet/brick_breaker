//import statements
import Engine from "/static/javascript/engine.js";
import Game from "/static/javascript/game.js";

//canvas setup
let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//set up of the time between each new brick row
const level_duration = 3;

//set up the number of bricks per row
const num_columns = 15;

//clear the screen initially
ctx.clearRect(0, 0, canvas.width, canvas.height);

//create new game object
let game = new Game(canvas, num_columns);
let update = (deltatime => game.update(deltatime, level_duration));
let draw = (context => game.draw(context));

//create new engine object
let engine = new Engine(canvas, ctx, update, draw);

//start game
game.start();

//enter gameloop
engine.run_game();