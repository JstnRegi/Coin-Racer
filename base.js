//counter that keeps buttons from getting clicked multiple times and glitching out the game
var play = 0;
var game;
var keys = {
    p1Keys: {
        wKey: 119,
        sKey: 115,
        dKey: 100,
        aKey: 97
    },
    p2Keys: {
        iKey: 105,
        kKey: 107,
        lKey: 108,
        jKey: 106
    }
};

//to hold onto what the users click for their characters BEFORE game start
var p1char;
var p2char;

//asks for playernames BEFORE game start
var p1name = prompt('Please type your game name', 'Player 1');
var p2name = prompt('Please type your game name', 'Player 2');

//prepends player names BEFORE game start
function playerNames(p1name, p2name) {
    $('.choose-your-character1').prepend('<h2>' + p1name + ' click your character!' + '</h2>');
    $('.choose-your-character2').prepend('<h2>' + p2name + ' click your character!' + '</h2>');
}
playerNames(p1name, p2name);

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

function Game(player1character, player2character) {
    this.characters = {
        goomba: '"http://www.nesmaps.com/maps/SuperMarioBrothers/sprites/LittleGoomba.gif"' + ' width="16"' + ' height="16"',
        koopa: '"http://files.gamebanana.com/img/ico/sprays/parakoopamediumani_2.gif"' + ' width="28"' + ' height="25"',
        thwomp: '"http://www.snesmaps.com/maps/SuperMarioWorld/sprites/ThwompAngry.png"' + ' width="18"' + ' height="18"',
        boo: '"http://www.snesmaps.com/maps/SuperMarioWorld/sprites/BooBuddy3L.gif"' + ' width="15"' + ' height="15"',
        mario: 'http://i.imgur.com/YnxVNmG.gif',
        luigi: 'http://orig11.deviantart.net/81b5/f/2012/035/4/b/running_luigi__icon__by_thelombax51-d4oox27.gif',
        bill: 'http://www.snesmaps.com/maps/SuperMarioWorld/sprites/BulletBillL.png' + ' width="20' + ' height="20"',
        goku: 'http://vignette4.wikia.nocookie.net/deathbattlefanon/images/4/4b/Goku_idle_by_tucker45855-d5qc2jm.gif/revision/latest?cb=20150307180427',
        megaman: 'http://archive.bnetweb.org/avatars/Gaming/MegaMan-Running.gif',
        coin: "http://www.snesmaps.com/maps/SuperMarioWorld/sprites/Coin.gif"
    },
    this.player1 = new Player(keys.p1Keys.aKey, keys.p1Keys.wKey, keys.p1Keys.sKey, keys.p1Keys.dKey, this.characters[player1character]);
    this.player2 = new Player(keys.p2Keys.jKey, keys.p2Keys.iKey, keys.p2Keys.kKey, keys.p2Keys.lKey, this.characters[player2character]);
    this.track1 = new Track('player1');
    this.track2 = new Track('player2');
    this.speed = {
        slow: 160,
        medium: 110,
        fast: 60
    };
    this.enemies = {
        one: new Enemy(2, this.speed.medium, this.characters.goomba, 42, 'vertical'),
        two: new Enemy(82, this.speed.slow + 40, this.characters.goomba, 87, 'horizontal'),
        three: new Enemy(51, this.speed.medium, this.characters.boo, 91, 'vertical'),
        four: new Enemy(26, this.speed.fast, this.characters.thwomp, 33, 'horizontal'),
        five: new Enemy(19, this.speed.fast, this.characters.thwomp, 99, 'vertical'),
        six: new Enemy(74, this.speed.slow, this.characters.koopa, 78, 'horizontal'),
        seven: new Enemy(20, this.speed.fast, this.characters.bill, 1, 'bill'),
        eight: new Enemy(2, this.speed.medium, this.characters.goomba, 42, 'vertical'),
        nine: new Enemy(82, this.speed.slow + 40, this.characters.goomba, 87, 'horizontal'),
        ten: new Enemy(51, this.speed.medium, this.characters.boo, 91, 'vertical'),
        eleven: new Enemy(26, this.speed.fast, this.characters.thwomp, 33, 'horizontal'),
        twelve: new Enemy(19, this.speed.fast, this.characters.thwomp, 99, 'vertical'),
        thirteen: new Enemy(74, this.speed.slow, this.characters.koopa, 78, 'horizontal'),
        fourteen: new Enemy(20, this.speed.fast, this.characters.bill, 1, 'bill')
    };
    this.coinRando = Math.floor((Math.random() * 7) + 1);
    this.coinSpawns = [0, 83, 25, 86, 10, 50, 92, 34];
    this.coinSpawner = function() {
        $('div#player1.gameboard div:nth-child(' + this.coinSpawns[this.coinRando] + ')').css("content", 'url(' + "" + this.characters.coin  + "" + ')');
        console.log('coin');
    };
}

function Track(playerId) {
    this.divs = 100;
    this.columns = 20;
    this.lastRow = 80;
    this.playerId = playerId;
    this.finishLine = 60;
    this.makeTrack = function(arg) {
        for(var i = 0; i < this.divs; i++) {
            $('#' + playerId).append('<div></div>');
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

function movement () {
    $(window).on('keypress', function handleClick(e) {
        function playerMovement (player, playerid, pmovement, track) {
            //move right pressing the correct key
            if (e.which === pmovement.right
                && (player.placement % track.columns !== 0)) {
                player.placement++;
                entityImg(playerid, player.character, player.placement, -1);
                console.log(game.player1.placement);
                console.log(game.player2.placement);

            }
            //move left pressing the correct key
            if (e.which === pmovement.left && (player.placement !== 1)
                && (player.placement !== (1 + (track.columns)))
                && (player.placement !== (1 + (track.columns * 2)))
                && (player.placement !== (1 + (track.columns * 3)))
                && (player.placement !== (1 + (track.columns * 4)))) {
                player.placement--;
                entityImg(playerid, player.character, player.placement, 1);
                console.log(game.player1.placement);
                console.log(game.player2.placement);

            }
            //move down pressing the correct key
            if (e.which === pmovement.down && (player.placement < track.lastRow)) {
                player.placement += track.columns;
                entityImg(playerid, player.character, player.placement, (-1*(track.columns)));
                console.log(game.player1.placement);
                console.log(game.player2.placement);

            }
            //move up pressing the correct key
            if (e.which === pmovement.up && (player.placement !== 1)
                && (player.placement > track.columns)) {
                player.placement -= track.columns;
                entityImg(playerid, player.character, player.placement, track.columns);
                console.log(game.player1.placement);
                console.log(game.player2.placement);

            }
        }
        //calls and activates player movements
        playerMovement(game.player1, game.track1.playerId, game.player1.movementKeys, game.track1);
        playerMovement(game.player2, game.track2.playerId, game.player2.movementKeys, game.track2);

        //finish line
        if ((game.player1.placement === game.track1.finishLine) && (play === 2)) {
            window.location.replace("player1Win.html");
        }
        if ((game.player2.placement === game.track2.finishLine) && (play === 2)) {
            window.location.replace("player2Win.html");
        }
    });
}

function enemyMove(enemy, playerid, player) {
    var start = enemy.position;
    if(enemy.moveStyle === 'vertical') {
        function enemyDown() {
            setTimeout(function () {
                dead(enemy, player, playerid);
                if (enemy.position < enemy.end) {
                    enemy.moveDown(game.track1.columns);
                    enemyImg(playerid, enemy.character, enemy.position, (-1*(game.track1.columns)));
                    enemyDown();
                }
                else {
                    enemyUp();
                }
            }, enemy.speed);
        }

        function enemyUp() {
            setTimeout(function () {
                dead(enemy, player, playerid);
                if (start < enemy.position) {
                    enemy.moveUp(game.track1.columns);
                    enemyImg(playerid, enemy.character, enemy.position, game.track1.columns);
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
                dead(enemy, player, playerid);
                if (enemy.position < enemy.end) {
                    enemy.moveRight();
                    enemyImg(playerid, enemy.character, enemy.position, -1);
                    enemyRight();
                }
                else {
                    enemyLeft();
                }
            }, enemy.speed);
        }

        function enemyLeft() {
            setTimeout(function () {
                dead(enemy, player, playerid);
                if (start < enemy.position) {
                    enemy.moveLeft();
                    enemyImg(playerid, enemy.character, enemy.position, 1);
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
                dead(enemy, player, playerid);
                if (enemy.position >= enemy.end) {
                    enemy.position--;
                    enemyImg(playerid, enemy.character, enemy.position, 1);
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

//adds and removes the character image of the character
function entityImg(player, character , placement, remove) {
    $('div#' + player + '.gameboard div:nth-child(' + placement + ')').css("content", "url(" + character + ")");
    $('div#' + player + '.gameboard div:nth-child(' + (placement + remove) + ')').css("content", "");
}

function enemyImg(player, character, placement, remove) {
    $('div#' + player + '.gameboard div:nth-child(' + placement + ')').append("<img src=" + character + ">");
    $('div#' + player + '.gameboard div:nth-child(' + (placement + remove) + ')').empty('<img>');
}
function remImg(counter, playerid) {
    $('div#' + playerid + '.gameboard div:nth-child(' + (counter) + ')').css("content", "");
}

function enemySpawns() {
    var enemies = game.enemies;
    enemyMove(enemies.one, game.track1.playerId, game.player1);   enemyMove(enemies.eight, game.track2.playerId , game.player2);
    enemyMove(enemies.two, game.track1.playerId, game.player1);   enemyMove(enemies.nine, game.track2.playerId , game.player2);
    enemyMove(enemies.three, game.track1.playerId, game.player1); enemyMove(enemies.ten, game.track2.playerId , game.player2);
    enemyMove(enemies.four, game.track1.playerId, game.player1);  enemyMove(enemies.eleven, game.track2.playerId , game.player2);
    enemyMove(enemies.five, game.track1.playerId, game.player1);  enemyMove(enemies.twelve, game.track2.playerId , game.player2);
    enemyMove(enemies.six, game.track1.playerId, game.player1);   enemyMove(enemies.thirteen, game.track2.playerId , game.player2);
    enemyMove(enemies.seven, game.track1.playerId, game.player1); enemyMove(enemies.fourteen, game.track2.playerId , game.player2);
}

//sends the player back to the start if their move counter matches the enemy's move counter
function dead(enemy, player, playerid) {
    if (player.placement === enemy.position) {
        //removes player img from current position when play button is clicked and sends player back to beginning
        remImg(player.placement, playerid);
        player.placement = 1;
        entityImg(playerid, player.character, player.placement, 2);
        console.log(player.placement);
    }
}

$('.choose-your-character1 img').on('click', function () {
    console.log($(this).attr('id'));
    p1char = $(this).attr('id');
    alert(p1name + ' chose ' + p1char);
});

$('.choose-your-character2 img').on('click', function () {
    console.log($(this).attr('id'));
    p2char = $(this).attr('id');
    alert(p2name + ' chose ' + p2char);
});

function chooseYourChar() {
    if (play === 0) {
        game = new Game(p1char, p2char);
        $('.choose-your-character1').remove();
        $('.choose-your-character2').remove();
        $('p').remove();
        $('#character-select').empty();
        game.track1.makeTrack(game.track1.playerId);
        game.track2.makeTrack(game.track2.playerId);
        entityImg(game.track1.playerId, game.player1.character, game.player1.placement, 2);
        entityImg(game.track2.playerId, game.player2.character, game.player2.placement, 2);
        movement();
        play++;
    }
}

Game.prototype.init = function() {
    if(play === 1) {
        enemySpawns();
        remImg(game.player1.placement, game.track1.playerId);
        remImg(game.player2.placement, game.track2.playerId);
        game.player1.placement = 1;
        game.player2.placement = 1;
        entityImg(game.track1.playerId, game.player1.character, game.player1.placement, 2);
        entityImg(game.track2.playerId, game.player2.character, game.player2.placement, 2);
        //game.coinSpawner();
    }
    play++;
};