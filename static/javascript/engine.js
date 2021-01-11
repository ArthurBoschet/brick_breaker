export default class Engine{
    constructor(canvas, ctx, update_function, draw_function){
        this.update = update_function;
        this.draw = draw_function;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    run_game(){
        let past_time = 0;
        let gameloop = function(timestamp, engine){
            let deltatime = timestamp - past_time;
            past_time = timestamp;

            //clear canvas
            engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

            //update game objects
            engine.update(deltatime);

            //draw game frame
            engine.draw(engine.ctx);

            //request next frame
            requestAnimationFrame(timestamp => gameloop(timestamp, engine));
        }
        let engine = this;
        (timestamp => gameloop(timestamp, engine))();

    }

}