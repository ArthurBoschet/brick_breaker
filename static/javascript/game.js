import Paddle from "/static/javascript/paddle.js";
import InputHandler from "/static/javascript/input.js";
import Ball from "/static/javascript/ball.js";
import BrickGrid from "/static/javascript/brick_grid.js";
import Particles from "/static/javascript/particles.js";
import Neon from "/static/javascript/neontext.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game{
    constructor(canvas, num_columns){
        this.game_width = canvas.width;
        this.game_height = canvas.height;
        this.canvas = canvas;
        this.num_columns = num_columns;
        this.start_time = new Date();
        this.title = new Neon(this,"Brick Breaker");
        this.gameover_screen = new Neon(this,"GAME OVER");
        this.score_diplay = new Neon(this, "score: ", true, 70, this.game_width/2, (this.game_height)/2+ 0.05*this.game_width);
        this.prev_score=0;
        this.score = 0;
    }

    initialize(game_state){
        //initialize game state
        this.gamestate = game_state;
        this.prev_score =this.score;

        //simple objects
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.simple_objects = [this.ball, this.paddle];

        //brick grid data structure
        this.brickgrid = new BrickGrid(this);

        //create first row
        this.brickgrid.create_row();

        //create particles
        this.particles = new Particles(this);

        //list of all objects
        this.objects = [this.brickgrid, this.particles, this.ball, this.paddle];

        //initialize the score to 0
        this.score = 0;
    }

    start(){
        //initialize at menu
        this.initialize(GAMESTATE.MENU);

        //input handler
        this.input = new InputHandler(this); 
    }

    update(deltatime, level_duration){
        //check if game is paused/menu
        this.particles.update();

        //if(this.gamestate === GAMESTATE.MENU) this.particles.update();
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

        //update simple objects
        this.simple_objects.forEach((obj) => obj.update(deltatime));

        //update grid if it is time
        let endtime = new Date();
        let time_elapsed = (endtime - this.start_time)/1000;

        if (time_elapsed > level_duration){
            this.start_time = endtime;

            //add new level
            this.brickgrid.create_row();
        }
    }

    draw(ctx){
        //this.particles.draw(ctx);
        if(this.gamestate == GAMESTATE.PAUSED){

            //draw every object
            this.objects.forEach((obj) => obj.draw(ctx));

            ctx.rect(0,0, this.game_width, this.game_height);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.game_width/2, this.game_height/2);

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("score: "+this.score, this.game_width-50, 50);
        }
        if(this.gamestate == GAMESTATE.MENU){

            //draw main title of the game
            this.title.draw(ctx);
            this.particles.draw(ctx);

            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press space to play", this.game_width/2, this.game_height/2 + 50);

        }else if(this.gamestate == GAMESTATE.GAMEOVER){

            //draw gameover of the game
            this.gameover_screen.draw(ctx);
            this.score_diplay.draw(ctx);
            this.gameover_screen.draw_light(ctx);
            this.particles.draw(ctx);

            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press space to play again", this.game_width/2, (this.game_height)/2 + 0.1*this.game_width);
        }else{
             //draw every object
             this.objects.forEach((obj) => obj.draw(ctx));

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("score: "+this.score, this.game_width-50, 50);
        }

    }

    togglepause(){
        //create pause screen
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else if(this.gamestate == GAMESTATE.RUNNING){
            this.gamestate = GAMESTATE.PAUSED;
        } else {
            this.gamestate = GAMESTATE.RUNNING;
        }
    }
}