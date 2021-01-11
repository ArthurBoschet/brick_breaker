import Brick from "/static/javascript/brick.js";

export default class BrickGrid{
    constructor(game){
        this.game = game;
        this.num_columns = game.num_columns;
        this.root = null;
        this.array = [];
        this.bottom_row = [];
        this.current_row = [];
        this.canvas = game.canvas;
        for(let i=0; i<this.num_columns; i++){
            this.bottom_row.push(null);
        }
        this.current_row = [...this.bottom_row];
        this.current_hash = {};
    }

    create_row(){
        
        this.bottom_row = [...this.current_row];
        this.current_hash = {};

        let create_random_brick = function(num_columns, y_position, canvas, i){
            let random = Math.random();
            if(random<0.33){
                return new Brick(num_columns, canvas.width, { x: (canvas.width/num_columns*i), y: y_position }, { row: y_position, col: i }, "green");
            }else if(random >= 0.33 && random < 0.66){
                return new Brick(num_columns, canvas.width, { x: (canvas.width/num_columns*i), y: y_position }, { row: y_position, col: i },"red");
            }else{
                return new Brick(num_columns, canvas.width, { x: (canvas.width/num_columns*i), y: y_position }, { row: y_position, col: i },"blue");
            }
        };

        let row_create = function(grid, canvas){
            let row = [];
            for(let i=0; i<grid.num_columns; i++){
                row.push(create_random_brick(grid.num_columns, 0, canvas, i));
                if(grid.bottom_row[i] !== null){
                    if(grid.bottom_row[i].color === row[i].color){
                        row[i].down = grid.bottom_row[i];
                        grid.bottom_row[i].up = row[i];
                    }
                }
                if(i>0){
                    if(row[i-1].color === row[i].color){
                        row[i-1].right = row[i];
                        row[i].left = row[i-1];
                    }
                }
            }
            return row;
        };

        let update_grid = function(object){
            let k = 0;
            while(k<object.array.length){
                if(object.array[k].length == 0){
                    object.array.splice(k,1);
                }else{
                    k++;
                }
            }
            for(let i=0; i<object.array.length; i++){
                for(let j=0; j<object.array[i].length; j++){
                    //object.array[i][j].change_level();
                    object.array[i][j].position.y = (object.array[i][j].height)*(i+1);
                    object.array[i][j].array_indices.row = i+1;
                }
            }
        }

        update_grid(this);
        let row = row_create(this, this.canvas);
        this.current_row = [...row];
        this.array.unshift(row);

        for(let i; i<row.length; i++){
            this.current_hash[this.array[0][i]] = i;
        }
    }

    delete(row, col){

        //increment score
        this.game.score++;

        if(row == 0){
            let index = this.current_hash[this.array[0][col]];
            this.current_row[index] = null;
        }

        let update_brick_array = function(object){
            let node;
            node = (object.array[row].splice(col, 1))[0];
            for(let i=col; i<object.array[row].length; i++){
                object.array[row][i].decrement_col();
            }
            return node;
        }
        
        let node = update_brick_array(this);    //pointer to node being deleted
        node.deleted = true;                    //set the field deleted to true

        if(node.up !== null){
            if(node.up.deleted === false){
                this.delete(node.up.array_indices.row, node.up.array_indices.col);
            }
        }
        if(node.down !== null){
            if(node.down.deleted === false){
                this.delete(node.down.array_indices.row, node.down.array_indices.col);
            }
        }
        if(node.left !== null){
            if(node.left.deleted === false){
                this.delete(node.left.array_indices.row, node.left.array_indices.col);
            }
        }
        if(node.right !== null){
            if(node.right.deleted === false){
                this.delete(node.right.array_indices.row, node.right.array_indices.col);
            }
        }
        return;
    }

    draw(ctx){
        for(let i=0; i<this.array.length; i++){
            for(let j=0; j<this.array[i].length; j++){
                this.array[i][j].draw(ctx);
            }
          }
    }

}