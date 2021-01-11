import Particle from "/static/javascript/particle.js";

export default class Particles{
    constructor(game){
        this.game = game;
        this.canvas = game.canvas;
        this.screen_width = game.game_width;
        this.screen_height = game.game_height;
        this.particles_array = [];

        //mouse position
        this.mouse = {
            x: null,
            y: null,
            radius: (this.screen_height/80) * (this.screen_width/80)
        }
        this.init();
    }
    
    init(){
        let number_particles = 30;//(this.canvas.height * this.canvas.width)/30000;
        for(let i=0; i<number_particles; i++){
            let size = (Math.random() * 5) + 1;
            let x = (Math.random()*(this.screen_width - size*4) + size*2);
            let y = (Math.random()*(this.screen_height - size*4) + size*2);
            let directionX = (Math.random()*5-2.5);
            let directionY = (Math.random()*5-2.5);
            let color = 'white'
            this.particles_array.push(new Particle(this.game, x,y ,directionX, directionY, size, color));
        }
    }

    update(){
        for(let i=0; i<this.particles_array.length; i++){
            this.particles_array[i].update();
        }
    }

    connect(ctx){
        for(let a=0; a<this.particles_array.length; a++){
            for(let b=a; b<this.particles_array.length; b++){
                //console.log("hello");
                let dx = this.particles_array[b].x - this.particles_array[a].x;
                let dy = this.particles_array[b].y - this.particles_array[a].y;
                let dist2 = dx*dx + dy*dy;
                if(dist2 < (this.screen_height/7)*(this.screen_height/7)){
                    //ctx.save();
                    ctx.strokeStyle = "white";
                    let alpha = Math.exp(-Math.sqrt(dist2)/25);
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.particles_array[a].x, this.particles_array[a].y);
                    ctx.lineTo(this.particles_array[b].x, this.particles_array[b].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                    //ctx.restore();
                }
            }
        }
    }

    draw(ctx){
        //console.log(this.particles_array.length);
        for(let i=0; i<this.particles_array.length; i++){
            //console.log("hello particles")
            this.particles_array[i].draw(ctx);
            this.connect(ctx);
        }
    }
}