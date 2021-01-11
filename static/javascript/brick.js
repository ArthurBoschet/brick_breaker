export default class Brick {
  constructor(num_columns, screen_width, position, array_indices, color) {
    if (color === "blue") {
      this.brick_img = document.getElementById("blue_brick");
    } else if (color === "green") {
      this.brick_img = document.getElementById("green_brick");
    } else if (color === "red") {
      this.brick_img = document.getElementById("red_brick");
    }
    //this.brick_img = document.getElementById("blue_brick");
    this.width = screen_width / num_columns;
    this.height = (this.width / 31) * 14;
    this.position = position;
    this.color = color;
    
    //pointer
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;

    //position in array
    this.array_indices = array_indices;

    //is deleted?
    this.deleted = false;

    //color increment
    this.increment = 0;
  }

  draw(ctx) {
    let c1r;
    let c1g;
    let c1b;
    
    let c2r;
    let c2g;
    let c2b;
    if(this.color === "red"){
      c1r = 204;
      c1g = 43;
      c1b = 94;
      
      c2r = 117;
      c2g = 58;
      c2b = 136;
    }else if(this.color === "green"){
      c1r = 86;
      c1g = 171;
      c1b = 47;
      
      c2r = 168;
      c2g = 224;
      c2b = 99;
    }else{
      c1r = 6;
      c1g = 190;
      c1b = 182;
      
      c2r = 72;
      c2g = 177;
      c2b = 191;
    }
    let factor = 40;
    let period = 10;
    let increment = this.increment;
    let block_color1 = "rgb("+ (c1r+Math.floor(factor*Math.sin(increment/period))) +", "+ (c1g+Math.floor(factor*Math.sin(increment/period))) +", "+ (c1b+Math.floor(factor*Math.sin(increment/period))) +")";
    let block_color2 = "rgb("+ (c2r+Math.floor(factor*Math.sin(-increment/period))) +", "+ (c2g+Math.floor(factor*Math.sin(-increment/period))) +", "+ (c2b+Math.floor(factor*Math.sin(-increment/period))) +")";
    var grd = ctx.createLinearGradient(this.position.x, 0, this.width+this.position.x, 0);
    grd.addColorStop(0, block_color1);
    grd.addColorStop(1, block_color2);

    ctx.fillStyle = grd;
    let offset = 3;
    ctx.fillRect(this.position.x + offset, this.position.y + offset, this.width/2 - 2*offset, this.height/2 - 2*offset);
    ctx.fillRect(this.position.x + offset, this.position.y + this.height/2 +offset, this.width/2 - 2*offset, this.height/2 - 2*offset);
    ctx.fillRect(this.position.x + this.width/2 + offset, this.position.y + offset, this.width/2 - 2*offset, this.height/2 - 2*offset);
    ctx.fillRect(this.position.x + this.width/2 + offset, this.position.y + this.height/2 + offset, this.width/2 - 2*offset, this.height/2 - 2*offset);
    this.increment++;
  }

  change_level() {
    this.position.y += this.height;
    this.array_indices.row += 1;
  }

  decrement_row(){
    this.array_indices.row -= 1;
  }

  decrement_col(){
    this.array_indices.col -= 1;
  }

}
