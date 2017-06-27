// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    if (this.x > 500) {
        this.x = 0;
    }
    this.checkCollision(player);
};

Enemy.prototype.checkCollision = function (player) {
    x_distance = Math.abs(this.x - player.x); //set distance for safe scope 80
    y_distance = Math.abs(this.y - player.y);
    if (y_distance<=50 && x_distance <= 50 ) {
        //console.log(`collision happened!! enemy.x: ${this.x}, player.x: ${player.x}`);
        player.reset();
        return true;
    } else {
        //console.log(`player's safe!! enemy.x: ${this.x}, player.x: ${player.x}`);
        return false;
    }
    //console.log(`check collision() is working, player: ${player.x}, ${player.y}`);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function (dt) {
    // for(var envy in allEnemies) {
    //     console.log(toString(envy.checkCollision));
    // }
};

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 303;
};



Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (movent) {
    switch (movent) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x <= 303) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y >= 110) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y <= 318) {
                this.y += 83;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 83 * 2, 200), new Enemy(0, 83, 350), new Enemy(0, 83 * 3, 150)];
//var allEnemies = [new Enemy(202, 83 * 2 + 55, 50)];
var player = new Player(202, 303);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
