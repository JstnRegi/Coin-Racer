var play = 0;

//speeds
var speed = {
    slow: 160,
    medium: 110,
    fast: 60
};
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

var characters = {
    goomba: '"http://www.nesmaps.com/maps/SuperMarioBrothers/sprites/LittleGoomba.gif"' + ' width="16"' + ' height="16"',
    koopa: '"http://files.gamebanana.com/img/ico/sprays/parakoopamediumani_2.gif"' + ' width="28"' + ' height="25"',
    thwomp: '"http://www.snesmaps.com/maps/SuperMarioWorld/sprites/ThwompAngry.png"' + ' width="18"' + ' height="18"',
    boo: '"http://www.snesmaps.com/maps/SuperMarioWorld/sprites/BooBuddy3L.gif"' + ' width="15"' + ' height="15"',
    mario: 'http://i.imgur.com/YnxVNmG.gif',
    luigi: 'http://orig11.deviantart.net/81b5/f/2012/035/4/b/running_luigi__icon__by_thelombax51-d4oox27.gif',
    bill: 'http://www.snesmaps.com/maps/SuperMarioWorld/sprites/BulletBillL.png' + ' width="20' + ' height="20"'
};
var enemies = [ characters.goomba, characters.koopa, characters.thwomp, characters.boo];

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

//enemies
var enemy1 = new Enemy(2, speed.medium, characters.goomba, 42, 'vertical');
var enemy2 = new Enemy(82, speed.slow + 40, characters.goomba, 87, 'horizontal');
var enemy3 = new Enemy(51, speed.medium, characters.boo, 91, 'vertical');
var enemy4 = new Enemy(26, speed.fast, characters.thwomp, 33, 'horizontal');
var enemy5 = new Enemy(19, speed.fast, characters.thwomp, 99, 'vertical');
var enemy6 = new Enemy(74, speed.slow, characters.koopa, 78, 'horizontal');
var enemy7 = new Enemy(20, speed.fast, characters.bill, 1, 'bill');

//calls and initiates playermovement
movement();
enemyMove(enemy1, 'player1');
enemyMove(enemy2, 'player1');
enemyMove(enemy3, 'player1');
enemyMove(enemy4, 'player1');
enemyMove(enemy5, 'player1');
enemyMove(enemy6, 'player1');
enemyMove(enemy7, 'player1');
//random variables to choose from
//I didnt know that random variables are saved in that point in time. And if called again
//it's the same variable, it's the same thing
var randos = {
        one: Math.floor((Math.random() * 4) + 1),
        two: Math.floor((Math.random() * 4) + 1),
        three: Math.floor((Math.random() * 4) + 1),
        four: Math.floor((Math.random() * 4) + 1),
        five: Math.floor((Math.random() * 4) + 1),
        six: Math.floor((Math.random() * 4) + 1)
};

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

function Enemy(position, speed, img, end, moveStyle) {
    this.position = position;
    this.speed = speed;
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
    this.end = end;
    this.moveStyle = moveStyle;
}


function movement(){
    $(window).on('keypress', function handleClick(e) {
        function playerMovement (player, playerstring, pmovement, track) {
            //move right pressing the correct key
            if (e.which === pmovement.right
                && (player.placement % track.columns !== 0)) {
                player.placement++;
                entityImg(playerstring, player.character, player.placement, -1);
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
                    entityImg(playerstring, player.character, player.placement, 1);
                    console.log(player1.placement);
                    //console.log(player2.placement);

            }
            //move down pressing the correct key
            if (e.which === pmovement.down && (player.placement < track.lastRow)) {
                player.placement += track.columns;
                entityImg(playerstring, player.character, player.placement, (-1*(track.columns)));
                console.log(player1.placement);
                //console.log(player2.placement);

            }
            //move up pressing the correct key
            if (e.which === pmovement.up && (player.placement !== 1)
                && (player.placement > track.columns)) {
                player.placement -= track.columns;
                entityImg(playerstring, player.character, player.placement, track.columns);
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
function entityImg(player, character , placement, remove) {
    $('div#' + player + '.gameboard div:nth-child(' + placement + ')').css("content", "url(" + character + ")");
    $('div#' + player + '.gameboard div:nth-child(' + (placement + remove) + ')').css("content", "");
}

function enemyImg(player, character, placement, remove) {
    $('div#' + player + '.gameboard div:nth-child(' + placement + ')').append("<img src=" + character + ">");
    $('div#' + player + '.gameboard div:nth-child(' + (placement + remove) + ')').empty('<img>');
}

function enemyMove(enemy, playerstring) {
    var start = enemy.position;
    if(enemy.moveStyle === 'vertical') {
        function enemyDown() {
            setTimeout(function () {
                //dead(enemyMove1);
                if (enemy.position < enemy.end) {
                    enemy.moveDown(player1Track.columns);
                    console.log(enemy.position);
                    enemyImg(playerstring, enemy.character, enemy.position, (-1*(player1Track.columns)));
                    enemyDown();
                }
                else {
                    enemyUp();
                }
            }, enemy.speed);
        }

        function enemyUp() {
            setTimeout(function () {
                //dead(enemyMove1);
                if (start < enemy.position) {
                    enemy.moveUp(player1Track.columns);
                    console.log(enemy.position);
                    enemyImg(playerstring, enemy.character, enemy.position, player1Track.columns);
                    //enemyImg1(enemyMove1, (-1*(rows)), enemyPics[rando1]);
                    //enemyImg2(enemyMove1, (-1*(rows)), enemyPics[rando1]);

                    enemyUp();
                }
                else {
                    enemyDown();
                }
            }, enemy.speed);
        }
        enemyDown();
    }
    if(enemy.moveStyle === 'horizontal') {
        function enemyRight() {
            setTimeout(function () {
                //dead(enemyMove6);
                if (enemy.position < enemy.end) {
                    enemy.moveRight();
                    console.log(enemy.position);
                    enemyImg(playerstring, enemy.character, enemy.position, -1);
                    //enemyImg1(enemyMove6, 1, enemyPics[rando6]);
                    //enemyImg2(enemyMove6, 1, enemyPics[rando6]);
                    enemyRight();
                }
                else {
                    enemyLeft();
                }
            }, enemy.speed);
        }

        function enemyLeft() {
            setTimeout(function () {
                //dead(enemyMove6);
                if (start < enemy.position) {
                    enemy.moveLeft();
                    console.log(enemy.position);
                    enemyImg(playerstring, enemy.character, enemy.position, 1);
                    enemyLeft();
                }
                else {
                    enemyRight();
                }
            }, enemy.speed);
        }
        enemyRight();
    }
    //function for bill to fly by
    if(enemy.moveStyle === 'bill') {
        function bulletBill() {
            setTimeout(function () {
                //dead(enemyMove6);
                if (enemy.position >= enemy.end) {
                    enemy.position--;
                    console.log(enemy.position);
                    enemyImg(playerstring, enemy.character, enemy.position, 1);
                    bulletBill();
                }
            }, enemy.speed);
        }
        setInterval( function() {
            bulletBill();
            enemy.position = 20;
        }, 5000);
    }

}


