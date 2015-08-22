var play = 0;

//player keys used
var player1Keys = {
    wKey: 119,
    sKey: 115,
    dKey: 100,
    aKey: 97
};
var player2Keys = {
    iKey: 105,
    kKey: 107,
    lKey: 108,
    jKey: 106
};

//player tracks
var player1Track = new Track('#player1');
var player2Track = new Track('#player2');
player1Track.makeTrack(player1Track.playerId);
player2Track.makeTrack(player2Track.playerId);

//players
var player1 = new Player();
var player2 = new Player();


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
    this.moveDown = function(columns) {
        this.counter += columns;
    };
    this.moveUp = function(columns) {
        this.counter -= columns;
    };
    this.character = img;
}

function Enemy(position, img) {
    this.position = position;
    this.moveRight = function() {
        this.position++;
    };
    this.moveLeft = function() {
        this.position--;
    };
    this.moveUp = function(columns) {
        this.position -= columns;
    };
    this.moveDown = function(columns) {
        this.position += columns;
    };
    this.character = img;
}

player1.moveDown(player1Track.columns);
player1.moveUp(player1Track.columns);

console.log(player1.counter);