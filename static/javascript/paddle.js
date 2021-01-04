export default class Paddle {
  constructor(screen_width, screen_height) {
    this.screenwidth = screen_width;
    this.screenheight = screen_height;
    this.width = screen_width * 0.2;
    this.height = screen_height * 0.05;
    this.maxspeed = 50;
    this.speed = 0;
    this.position = {
      x: (screen_width - this.width) / 2,
      y: screen_height - this.height - 5
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
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
