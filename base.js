var play = 0;
//test
//player tracks
var player1Track = new Track('#player1');
var player2Track = new Track('#player2');
player1Track.makeTrack(player1Track.playerId);
player2Track.makeTrack(player2Track.playerId);


function Track(playerId) {
    this.divs = 100;
    this.columns = 20;
    this.playerId = playerId;
    this.makeTrack = function(arg) {
        for(var i = 0; i < this.divs; i++) {
            //$(arg).append('<div></div>');
            //console.log('test');
        }
    }
}


function Player(leftKey, upKey, downKey, rightKey, img) {
    this.counter = 0;
    this.movementKeys = {
        left: leftKey,
        up: upKey,
        down: downKey,
        right: rightKey
    };
    this.upKey = upKey;
    this.downKey = downKey;
    this.moveRight = function () {
        this.counter++;
    };
    this.moveLeft = function() {
        this.counter--;
    };
    this.moveDown = function(arg) {
        this.counter += arg;
    };
    this.moveUp = function(arg) {
        this.counter -= arg;
    };
    this.character = img;
}

//players
var player1 = new Player();
var player2 = new Player();

player1.moveDown(player1Track.columns);
player1.moveUp(player1Track.columns);

console.log(player1.counter);