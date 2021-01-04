export default class Ball {
  constructor(screen_width, screen_height) {
    this.img_ball = document.getElementById("img_ball");
    this.screenwidth = screen_width;
    this.screenheight = screen_height;
    this.diameter = screen_width * 0.03;
    this.height = this.diameter;
    this.maxspeed = 30;
    this.speed = {
      x: 0,
      y: this.maxspeed
    };
    this.position = {
      x: (screen_width - this.diameter) / 2,
      y: 5
    };
  }

  update(dt, paddle, brickarray) {
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
            ball.speed.x = -50;
          } else {
            ball.position.x = object.position.x + object.width;
            ball.speed.x = 50;
          }
          //ball.speed.x = -ball.speed.x + object.speed;
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
        ball.position.y = ball.screenheight - ball.diameter;
        ball.speed.y = -ball.speed.y;
      }
    };

    let col
    col = object_collision(paddle, this);
    for(let i=0; i<brickarray.length; i++){
      for(let j=0; j<brickarray[i].length; j++){
        col = object_collision(brickarray[i][j],this);
        if (col){
          brickarray[i].splice(j, 1);
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
