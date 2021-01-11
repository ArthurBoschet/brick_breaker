export default class Paddle {
  constructor(game) {
    this.screenwidth = game.game_width;
    this.screenheight = game.game_height;
    this.width = game.game_width * 0.2;
    this.height = game.game_height * 0.05;
    this.maxspeed = Math.floor(250*game.game_width/1440);
    this.speed = 0;
    this.position = {
      x: (game.game_width - this.width) / 2,
      y: game.game_height - this.height - 5
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#36d1dc";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(dt) {
    if (!dt) {
      return;
    }
    if (this.position.x < 0) {
      this.speed = 0;
      this.position.x = 0;
    }
    if (this.position.x > this.screenwidth - this.width) {
      this.speed = 0;
      this.position.x = this.screenwidth - this.width;
    }
    this.position.x += this.speed / dt;
  }

  moveright(dt) {
    this.speed = this.maxspeed;
  }

  moveleft(dt) {
    this.speed = -this.maxspeed;
  }

  stop() {
    this.speed = 0;
  }
}
