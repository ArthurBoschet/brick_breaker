export default class Particle{
    constructor(game, x, y, directionX, directionY, size, color){
        this.game = game;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    //check particle position, check ball position
    update(){
        let width = this.game.game_width;
        let height = this.game.game_height;
        let ball = this.game.ball;
        if(this.x > width || this.x<0){
            this.directionX = -this.directionX
            if (this.x < 0){
                this.x = this.size;
            }else{
                this.x = width-this.size;
            }
        }
        if(this.y > height || this.y<0){
            this.directionY = -this.directionY
            if (this.y < 0){
                this.y = this.size;
            }else{
                this.y = height-this.size;
            }
        }

        // let dot_product = (vec1, vec2) => (vec1[0]*vec2[0] + vec1[1]*vec2[1]);
        // let scalar_product = (scalar, vec) => ([scalar*vec[0], scalar*vec[1]]);
        // let vector_subtraction = (vec1, vec2) => ([vec1[0]-vec2[0], vec1[1]- vec2[1]]);
        // let vector_addition = (vec1, vec2) => ([vec1[0]+vec2[0], vec1[1]+vec2[1]])

        let dx = ball.position.x - this.x;
        let dy = ball.position.y - this.y;
        let distance = Math.sqrt(dx*dx+dy*dy);

        //check collision with ball
        if(distance < 2.5*ball.diameter + this.size && this.game.gamestate === 1){
            // let Pb = [dx, dy];
            // let direction_relative = [this.directionX-ball.speed.x, this.directionX-ball.speed.y];
            // let dirPb = scalar_product(dot_product(direction_relative, Pb)/(distance*distance), Pb);
            // let tan = vector_subtraction(direction_relative, Pb);
            // this.directionX = ball.speed.x - dirPb[0] + tan[0];
            // this.directionY = ball.speed.y - dirPb[1] + tan[1];
            let changex;
            let changed_mag = 10;
            if(dx > 0){
                changex = -changed_mag;
            }else{
                changex = changed_mag;
            }
            let changey;
            if(dy > 0){
                changey = -changed_mag;
            }else{
                changey = changed_mag;
            }

            if(dx*dx > dy*dy){
                this.x += changex;
            }else{
                this.y += changey;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
    }
}