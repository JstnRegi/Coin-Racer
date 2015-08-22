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

//calls and initiates playermovement
movement();


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
        function playerMovement (player, playerstring, pmovement, track) {
            //move right pressing the correct key
            if (e.which === pmovement.right
                && (player.placement % track.columns !== 0)) {
                player.placement++;
                playerImg(playerstring, player.character, player.placement, -1);
                console.log(player1.placement);
                //console.log(player2.placement);

            }
            //move left pressing the correct key
            if (e.which === pmovement.left && (player.placement !== 1)
                && (player.placement !== (1 + (track.columns)))
                && (player.placement !== (1 + (track.columns * 2)))
                && (player.placement !== (1 + (track.columns * 3)))
                && (player.placement !== (1 + (track.columns * 4)))) {
                    player.placement--;
                    playerImg(playerstring, player.character, player.placement, 1);
                    console.log(player1.placement);
                    //console.log(player2.placement);

            }
            //move down pressing the correct key
            if (e.which === pmovement.down && (player.placement < track.lastRow)) {
                player.placement += track.columns;
                playerImg(playerstring, player.character, player.placement, (-1*(track.columns)));
                console.log(player1.placement);
                //console.log(player2.placement);

            }
            //move up pressing the correct key
            if (e.which === pmovement.up && (player.placement !== 1)
                && (player.placement > track.columns)) {
                player.placement -= track.columns;
                playerImg(playerstring, player.character, player.placement, track.columns);
                console.log(player1.placement);
                //console.log(player2.placement);

            }
        }
        //calls and activates player movements
        playerMovement(player1, 'player1', p1Movement, player1Track);
        playerMovement(player2, 'player2', p2Movement, player2Track);

        //finish line
        if ((player1.placement === player1Track.finishLine) && (play === 1)) {
            window.location.replace("player1Win.html");
        }
        if ((player2.placement === player2Track.finishLine) && (play === 1)) {
            window.location.replace("player2Win.html");
        }
    });
}

//adds and removes the character image of the character
function playerImg(player, character , placement, remove) {
    $('div#' + player + '.gameboard div:nth-child(' + placement + ')').css("content", "url(" + character + ")");
    $('div#' + player + '.gameboard div:nth-child(' + (placement + remove) + ')').css("content", "");
}