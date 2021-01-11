export default class Ball {
  constructor(game) {
    this.img_ball = document.getElementById("img_ball");
    this.game = game;
    this.screenwidth = game.game_width;
    this.screenheight = game.game_height;
    this.diameter = game.game_width * 0.03;
    this.height = this.diameter;
    this.maxspeed = Math.floor(180*game.game_width/1440);
    this.x_speed = Math.floor(300*game.game_height/1440);
    this.speed = {
      x: (Math.random()<0.5)? this.x_speed: -this.x_speed,
      y: this.maxspeed
    };
    this.position = {
      x: (game.game_width - this.diameter) / 2,
      y: this.screenheight/7
    };
  }

  update(dt) {
    let paddle = this.game.paddle;
    let brickarray = this.game.brickgrid;

    if (!dt) return;
    this.position.x += this.speed.x / dt;
    this.position.y += this.speed.y / dt;

    //test collision with paddle
    let object_collision = function (object, ball) {
      let x1 = Math.max(ball.position.x, object.position.x);
      let x2 = Math.min(
        ball.position.x + ball.diameter,
        object.position.x + object.width
      );
      let y1 = Math.max(ball.position.y, object.position.y);
      let y2 = Math.min(
        ball.position.y + ball.diameter,
        object.position.y + object.height
      );

      if (x2 - x1 < 0 || y2 - y1 < 0) {
        return false;
      } else {
        if (x2 - x1 > y2 - y1) {
          if (ball.position.y < object.position.y) {
            ball.position.y = object.position.y - ball.diameter;
          } else {
            ball.position.y = object.position.y + object.height;
          }
          ball.speed.y = -ball.speed.y;
        } else {
          if (ball.position.x < object.position.x) {
            ball.position.x = object.position.x - ball.diameter;
            ball.speed.x = -ball.x_speed;
          } else {
            ball.position.x = object.position.x + object.width;
            ball.speed.x = ball.x_speed;
          }
        }
      }
      return true;
    };

    let wall_collision = function (ball) {
      if (ball.position.x < 0) {
        ball.position.x = 0;
        ball.speed.x = -ball.speed.x;
      }
      if (ball.position.y < 0) {
        ball.position.y = 0;
        ball.speed.y = -ball.speed.y;
      }
      if (ball.position.x > ball.screenwidth - ball.diameter) {
        ball.position.x = ball.screenwidth - ball.diameter;
        ball.speed.x = -ball.speed.x;
      }
      if (ball.position.y > ball.screenheight - ball.diameter) {
        //intialize to game over
        ball.game.initialize(3);
      }
    };

    let col
    col = object_collision(paddle, this);
    for(let i=0; i<brickarray.array.length; i++){
      for(let j=0; j<brickarray.array[i].length; j++){
        col = object_collision(brickarray.array[i][j],this);
        
        if (col){
          brickarray.delete(i,j);
        }
      }
    }


    wall_collision(this);
  }

  draw(ctx) {
    ctx.drawImage(
      this.img_ball,
      this.position.x,
      this.position.y,
      this.diameter,
      this.diameter
    );
  }
}
