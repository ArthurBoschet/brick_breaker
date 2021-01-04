export default class Brick {
  constructor(screen_width, position, color) {
    if (color === "blue") {
      this.brick_img = document.getElementById("blue_brick");
    } else if (color === "green") {
      this.brick_img = document.getElementById("green_brick");
    } else if (color === "red") {
      this.brick_img = document.getElementById("red_brick");
    }
    //this.brick_img = document.getElementById("blue_brick");
    this.width = screen_width / 10;
    this.height = (this.width / 31) * 14;
    this.position = position;
  }

  draw(ctx) {
    ctx.drawImage(
      this.brick_img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  change_level() {
    this.position.y += this.height;
  }
}
