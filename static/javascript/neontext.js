export default class Neon{
    constructor(game, text, score_display=false, game_size=120, offsetX=game.game_width/2, offsetY=game.game_height/2){
        this.text = text;
        let size = Math.floor(game_size*game.game_width/1440);
        this.font = size + "px Futura, Helvetica, sans-serif";
        this.jitter = 10;//15; 
        this.offsetX = offsetX;//30;
        this.offsetY = offsetY;//70;
        this.blur = 15;
        this.game = game;
        this.score_display = score_display;
    }

    draw(ctx){
        ctx.textAlign = "center";
        let text = this.text;

        if(this.score_display){
            text += this.game.prev_score;
        }

        let font = this.font;
        let jitter = this.jitter;
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;
        let blur = this.blur;
        let game = this.game; 

        // save state
        ctx.save();
        ctx.font = font;
        // calculate width + height of text-block
        var metrics = {
            width: game.game_width/1.8,
            height: game.game_height/2,
            top: 5
        };//getMetrics(text, font);
        
        let rectangle_pos_x = offsetX - metrics.width/2 -blur/2;
        let rectangle_pos_y = offsetY - metrics.height/2 -blur/2;
        let rectangle_width = metrics.width + blur;
        let rectangle_height = metrics.height + blur;

        ctx.rect(rectangle_pos_x, rectangle_pos_y,  rectangle_width, rectangle_height);
        //ctx.fillRect(rectangle_pos_x, rectangle_pos_y,  rectangle_width, rectangle_height)
        ctx.clip();
        // create shadow-blur to mask rainbow onto (since shadowColor doesn't accept gradients)
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "rgba(0,0,0,1)";
        //ctx.shadowOffsetX = metrics.width + blur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;
        //ctx.fillText(text, -metrics.width + offsetX - blur, offsetY + metrics.top);
        ctx.fillText(text, offsetX, offsetY);
        ctx.restore();
        // create the rainbow linear-gradient
        var gradient = ctx.createLinearGradient(rectangle_pos_x, 0, rectangle_pos_x+metrics.width, 0);
        gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
        gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
        gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
        gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
        gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
        gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
        // change composite so source is applied within the shadow-blur
        ctx.globalCompositeOperation = "source-atop";
        // apply gradient to shadow-blur
        ctx.fillStyle = gradient;
        ctx.fillRect(rectangle_pos_x, rectangle_pos_y,  rectangle_width, rectangle_height);
        // change composite to mix as light
        ctx.globalCompositeOperation = "lighter";
        // multiply the layer
        ctx.globalAlpha = 0.7
        ctx.drawImage(ctx.canvas, 0, 0);
        ctx.drawImage(ctx.canvas, 0, 0);
        ctx.globalAlpha = 1
        // draw white-text ontop of glow
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillText(text, offsetX, offsetY);
        // created jittered stroke
        ctx.lineWidth = 0.80;
        ctx.strokeStyle = "rgba(255,255,255,0.25)";

        this.leftarray = [];
        this.toparray = [];
        this.top_metrics = metrics.top;

        var i = 10; while(i--) { 
            var left = jitter / 2 - Math.random() * jitter;
            var top = jitter / 2 - Math.random() * jitter;
            ctx.strokeText(text, left + offsetX, top + offsetY + metrics.top);
            this.leftarray.push(left);
            this.toparray.push(top)
        }    
        // ctx.strokeStyle = "rgba(0,0,0,0.20)";
        // ctx.strokeText(text, offsetX, offsetY + metrics.top);
        ctx.restore();
    }
    draw_light(ctx){
        let text = this.text;
        let font = this.font;
        
        let offsetX = this.offsetX;
        let offsetY = this.offsetY;
        
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = font;
        ctx.fillText(text, offsetX, offsetY);

        // jittered stroke
        ctx.lineWidth = 0.80;
        ctx.strokeStyle = "rgba(255,255,255,0.25)";

        for(let i=0; i<this.leftarray.length; i++){
            ctx.strokeText(text, this.leftarray[i] + offsetX, this.toparray[i] + offsetY + this.top_metrics);
        }
        ctx.restore();
    }
}