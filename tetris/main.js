

var Block = function(color, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = 15;
    this.color = color || "red";
};
Block.size = 15;

var TETRIS_TYPES = ['L','I','O','Z','S','T','J'];
var TETRIS_DIRECTION = [0, 90, 180, 270];
var TETRIS = {
    'L': [[1,0,0],[1,0,0],[1,1,0]],
    'I': [[1],[1],[1],[1]],
    'O': [[1,1],[1,1]],
    'Z': [[1,1,0],[0,1,1]],
    'S': [[0,1,1],[1,1,0]],
    'T': [[1,1,1],[0,1,0]],
    'J': [[0,1],[0,1],[1,1]]
};

var CONTROL_TYPES = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE'];

var Tetris = function(type, direction, color, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.blocks = [];
    this.type = type || 'I';
    this.color = color || 'red';
    this.direction = direction || 0;
};
Tetris.prototype.getBlocks = function() {
    this.blocks = [];
    var type = TETRIS[this.type];
    for (var i = 0; i < type.length; i++) {
        for (var j = 0; j < type[0].length; j++) {
            if (type[i][j] == 1) {
                var localX, localY;
                if (this.direction === 0) {
                    localX = j;
                    localY = i;
                } else if (this.direction === 90) {
                    localX = i;
                    localY = type.length - j;
                } else if (this.direction === 180) {
                    localX = type.length - j;
                    localY = type[0].length - i;
                } else if (this.direction === 270) {
                    localX = type[0].length - i;
                    localY = j;
                }
                var b = new Block(this.color, this.x + Block.size * localX, this.y + Block.size * localY);
                this.blocks.push(b);
            }
        }
    }
};
Tetris.prototype.update = function(control_types) {
    switch(control_types) {
        case 'UP':
            this.rotate();
            break;
        case 'DOWN':
            this.move(0, 1);
            break;
        case 'LEFT':
            this.move(-1, 0);
            break;
        case 'RIGHT':
            this.move(1, 0);
            break;
        case 'SPACE':
            this.rotate();
    }
    this.getBlocks();
    this.draw(context);
};
Tetris.prototype.rotate = function() {
    this.direction = (this.direction + 90) % 360;
};
Tetris.prototype.move = function(dx, dy) {
    this.x += dx * Block.size;
    this.y += dy * Block.size;
}
Tetris.prototype.draw = function(ctx) {
    ctx.clearRect(this.x-150, this.y-150, 300, 300);
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].draw(ctx);
    }
};


Block.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
};




var canvas = document.getElementById("canvas"),
    context = canvas.getContext('2d');


// testing code

var mytype = TETRIS_TYPES[Math.floor(Math.random()*7)];
var mydirection = TETRIS_DIRECTION[Math.floor(Math.random()*4)];
var myTetris = new Tetris(mytype, mydirection, 'red', 170, 0);
myTetris.getBlocks();
myTetris.draw(context);


document.addEventListener('keyup', function(e) {
    e.preventDefault();
    switch(e.keyCode) {
        case 37:
            myTetris.update('LEFT');
            break;
        case 38:
            myTetris.update('UP');
            break;
        case 39:
            myTetris.update('RIGHT');
            break;
        case 40:
            myTetris.update('DOWN');
            break;
        case 32:
            myTetris.update('SPACE');
            break;
    }
});






