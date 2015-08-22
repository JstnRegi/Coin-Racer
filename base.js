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
var player1 = new Player(player1Keys.aKey, player1Keys.wKey, player1Keys.sKey, player1Keys.dKey,
                        'http://i.imgur.com/YnxVNmG.gif');
var p1Movement = player1.movementKeys;
var player2 = new Player(player2Keys.jKey, player2Keys.iKey, player2Keys.kKey, player2Keys.lKey,
                        'http://orig11.deviantart.net/81b5/f/2012/035/4/b/running_luigi__icon__by_thelombax51-d4oox27.gif');
var p2Movement = player2.movementKeys;

function Track(playerId) {
    this.divs = 100;
    this.columns = 20;
    this.lastRow = 80;
    this.playerId = playerId;
    this.finishLine = 60;
    this.makeTrack = function(arg) {
        for(var i = 0; i < this.divs; i++) {
            $(arg).append('<div></div>');
            //console.log('test');
        }
    }
}


function Player(leftKey, upKey, downKey, rightKey, img) {
    this.placement = 1;
    this.score = 0;
    this.movementKeys = {
        left: leftKey,
        up: upKey,
        down: downKey,
        right: rightKey
    };
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

function movement(){
    $(window).on('keypress', function handleClick(e) {
        function player2movement () {
            //move right pressing l
            if (e.which === p2Movement.right
                && (player2.placement % player2Track.columns !== 0)) {
                player2.placement++;
                console.log(player2.placement);
                //addImg2(counter2);
                //remImg2(counter2 - 1);

            }
            //move left pressing j
            if (e.which === p2Movement.left && (player2.placement !== 1)
                && (player2.placement !== (1 + (player2Track.columns)))
                && (player2.placement !== (1 + (player2Track.columns * 2)))
                && (player2.placement !== (1 + (player2Track.columns * 3)))
                && (player2.placement !== (1 + (player2Track.columns * 4)))) {
                player2.placement--;
                console.log(player2.placement);
                //addImg2(counter2);
                //remImg2(counter2 + 1);
            }
            //move down pressing k
            if (e.which === p2Movement.down && (player2.placement < player2Track.lastRow)) {
                player2.placement += player2Track.columns;
                console.log(player2.placement);
                //addImg2(counter2);
                //remImg2(counter2 - rows);
            }
            //move up pressing i
            if (e.which === p2Movement.up && (player2.placement !== 1)
                && (player2.placement > player2Track.columns)) {
                player2.placement -= player2Track.columns;
                console.log(player2.placement);
                //addImg2(counter2);
                //remImg2(counter2 + rows);
            }
        }
        //calls and activates player 2 movement
        player2movement();
        //finish line
        if ((player2.placement === player2Track.finishLine) && (play === 1)) {
            window.location.replace("player2Win.html");
        }
    });
}
movement();