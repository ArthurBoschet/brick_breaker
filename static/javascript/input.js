export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          game.paddle.moveleft();
          break;

        case 39:
          game.paddle.moveright();
          break;

        case 32:
          game.togglepause();
          break;  

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          //alert("move left");
          if (game.paddle.speed < 0) game.paddle.stop();
          break;
        case 39:
          //alert("move right");
          if (game.paddle.speed > 0) game.paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
