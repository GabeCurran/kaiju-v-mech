// This is a game where 4 players are in two teams of two, one team representing a kaiju and the other team representing a mecha.
// The game is similar to the minigame Hopo-O-Matic 4000 from the game Mario Party 7.
// The goal of the game is for each player to hit the correct button, as well as their partner, to move their character forward.
// The first team to reach the end of the track wins.

// The game will be played on a 2D plane, with the camera following the players.
// The players will be represented by a sprite, and the track will be represented by a straightaway.
// The user will push the button that appears, for player 1 it will be W, A, S, or D, and for player 2 it will be 1, 2, 3, or 4. For player 3 it will be the arrow keys, and for player 4 it will be 9, 8, 7, or 6.
// If they are incorrect, their character will not move forward and they will have to wait for the next button to appear.
// The game will end when one team reaches the end of the track.
// Player 1 and Player 2 will be on Team 1, and Player 3 and Player 4 will be on Team 2.

import * as Phaser from 'phaser';

let objectHits = 0;

export default class MainScene extends Phaser.Scene
{
    kaiju: Phaser.GameObjects.Sprite;
    mecha: Phaser.GameObjects.Sprite;
    w: Phaser.GameObjects.Image;
    a: Phaser.GameObjects.Image;
    s: Phaser.GameObjects.Image;
    d: Phaser.GameObjects.Image;
    up: Phaser.GameObjects.Image;
    left: Phaser.GameObjects.Image;
    down: Phaser.GameObjects.Image;
    right: Phaser.GameObjects.Image;
    buttons: Phaser.GameObjects.Group;
    one: Phaser.GameObjects.Sprite;
    two: Phaser.GameObjects.Sprite;
    three: Phaser.GameObjects.Sprite;
    four: Phaser.GameObjects.Sprite;
    nine: Phaser.GameObjects.Sprite;
    eight: Phaser.GameObjects.Sprite;
    seven: Phaser.GameObjects.Sprite;
    six: Phaser.GameObjects.Sprite;
    gameStart: boolean;
    background: Phaser.GameObjects.Sprite;
    trash: Phaser.GameObjects.Sprite;
    mechaWin: Phaser.GameObjects.Sprite;
    kaijuWin: Phaser.GameObjects.Sprite;
    objectDestroyed: boolean;
    objectHits: number;
    mecha2: Phaser.GameObjects.Sprite;
    kaiju2: Phaser.GameObjects.Sprite;
    mechaTeam: Phaser.GameObjects.Sprite;
    kaijuTeam: Phaser.GameObjects.Sprite;
    player1: Phaser.GameObjects.Sprite;
    player2: Phaser.GameObjects.Sprite;
    player3: Phaser.GameObjects.Sprite;
    player4: Phaser.GameObjects.Sprite;
    mechaPlayer1: Phaser.GameObjects.Sprite;
    mechaPlayer2: Phaser.GameObjects.Sprite;
    kaijuPlayer1: Phaser.GameObjects.Sprite;
    kaijuPlayer2: Phaser.GameObjects.Sprite;
    trash2: Phaser.GameObjects.Sprite;
    constructor ()
    {
        super('MainScene');
    }

    preload ()
    {
        // Load the images we need for this game.

        // Load the background.
        this.load.image('city', 'assets/city/city.png');

        // Load the win screens.
        this.load.image('mechaWin', 'assets/city/mechaWin.png');
        this.load.image('kaijuWin', 'assets/city/kaijuWin.png');

        // Load the obstacles.
        this.load.image('trash', 'assets/city/trash.png');
        this.load.image('trash2', 'assets/city/trash2.png');

        // Load the characters.
        this.load.image('mecha', 'assets/city/mech.png');
        this.load.image('kaiju', 'assets/city/kaiju.png');

        this.load.image('mechaPlayer1', 'assets/city/players/mechaPlayer1.png');
        this.load.image('mechaPlayer2', 'assets/city/players/mechaPlayer2.png');

        this.load.image('kaijuPlayer1', 'assets/city/players/kaijuPlayer1.png');
        this.load.image('kaijuPlayer2', 'assets/city/players/kaijuPlayer2.png');

        // Load player titles.
        this.load.image('player1', 'assets/city/players/player1.png');
        this.load.image('player2', 'assets/city/players/player2.png');
        this.load.image('player3', 'assets/city/players/player3.png');
        this.load.image('player4', 'assets/city/players/player4.png');

        // Load the character animations.
        this.load.image('mecha2', 'assets/city/mech2.png');
        this.load.image('kaiju2', 'assets/city/kaiju2.png');

        // Load the buttons.
        this.load.image('w', 'assets/buttons/wasd/w.png');
        this.load.image('a', 'assets/buttons/wasd/a.png');
        this.load.image('s', 'assets/buttons/wasd/s.png');
        this.load.image('d', 'assets/buttons/wasd/d.png');

        this.load.image('1', 'assets/buttons/dpad/padUp.png');
        this.load.image('2', 'assets/buttons/dpad/padLeft.png');
        this.load.image('3', 'assets/buttons/dpad/padDown.png');
        this.load.image('4', 'assets/buttons/dpad/padRight.png');

        this.load.image('ArrowUp', 'assets/buttons/arrows/arrowUp.png');
        this.load.image('ArrowLeft', 'assets/buttons/arrows/arrowLeft.png');
        this.load.image('ArrowDown', 'assets/buttons/arrows/arrowDown.png');
        this.load.image('ArrowRight', 'assets/buttons/arrows/arrowRight.png');

        this.load.image('9', 'assets/buttons/abxy/x.png');
        this.load.image('8', 'assets/buttons/abxy/y.png');
        this.load.image('7', 'assets/buttons/abxy/a.png');
        this.load.image('6', 'assets/buttons/abxy/b.png');

        // Set the game start to false.
        this.gameStart = false;
    }

    create ()
    {

        // We will use ocean sprites as a placeholder until we have our own art.
        // Create the ocean background.
        this.background = this.add.sprite(760, 450, 'city');
        this.background.setScale(1.75);

        const objectPosition : number = 800;

        this.trash = this.add.sprite(objectPosition, 550, 'trash');
        this.trash.setScale(0.10);

        this.trash2 = this.add.sprite(objectPosition, 550, 'trash2');
        this.trash2.setScale(0.10);

        this.trash2.setVisible(false);

        this.mecha = this.add.sprite(160, 450, 'mecha');
        this.mecha.setScale(0.15);

        this.kaiju = this.add.sprite(160, 500, 'kaiju');
        this.kaiju.setScale(0.15);

        // Create the animations for the characters.
        this.mecha2 = this.add.sprite((objectPosition - 120), 450, 'mecha2');
        this.mecha2.setScale(0.20);

        this.kaiju2 = this.add.sprite((objectPosition - 120), 500, 'kaiju2');
        this.kaiju2.setScale(0.20);

        // Hide the animations.
        this.mecha2.setVisible(false);
        this.kaiju2.setVisible(false);

        // Create the buttons and button sprites.

        // Player 1 buttons.
        this.w = this.add.sprite(200, 820, 'w');
        this.w.setScale(0.25);
        this.a = this.add.sprite(120, 900, 'a');
        this.a.setScale(0.25);
        this.s = this.add.sprite(200, 900, 's');
        this.s.setScale(0.25);
        this.d = this.add.sprite(280, 900, 'd');
        this.d.setScale(0.25);
        
        // Player 2 buttons.
        this.one = this.add.sprite(520, 820, '1');
        this.one.setScale(0.25);
        this.two = this.add.sprite(460, 870, '2');
        this.two.setScale(0.25);
        this.three = this.add.sprite(520, 920, '3');
        this.three.setScale(0.25);
        this.four = this.add.sprite(580, 870, '4');
        this.four.setScale(0.25);
        
        // Player 3 buttons.
        this.up = this.add.sprite(880, 820, 'ArrowUp');
        this.up.setScale(0.25);
        this.left = this.add.sprite(800, 900, 'ArrowLeft');
        this.left.setScale(0.25);
        this.down = this.add.sprite(880, 900, 'ArrowDown');
        this.down.setScale(0.25);
        this.right = this.add.sprite(960, 900, 'ArrowRight');
        this.right.setScale(0.25);
        
        // Player 4 buttons.
        this.nine = this.add.sprite(1240, 820, '9');
        this.nine.setScale(0.25);
        this.eight = this.add.sprite(1180, 870, '8');
        this.eight.setScale(0.25);
        this.seven = this.add.sprite(1240, 920, '7');
        this.seven.setScale(0.25);
        this.six = this.add.sprite(1300, 870, '6');
        this.six.setScale(0.25);

        // Create group for the buttons.
        this.buttons = this.add.group();

        // Add the buttons to the group.
        this.buttons.add(this.w);
        this.buttons.add(this.a);
        this.buttons.add(this.s);
        this.buttons.add(this.d);

        this.buttons.add(this.one);
        this.buttons.add(this.two);
        this.buttons.add(this.three);
        this.buttons.add(this.four);

        this.buttons.add(this.up);
        this.buttons.add(this.left);
        this.buttons.add(this.down);
        this.buttons.add(this.right);

        this.buttons.add(this.nine);
        this.buttons.add(this.eight);
        this.buttons.add(this.seven);
        this.buttons.add(this.six);


        // Hide the buttons.
        this.buttons.setVisible(false);

        let kaiju = this.kaiju;
        let mecha = this.mecha;

        this.kaijuPlayer1 = this.add.sprite(200, 680, 'kaijuPlayer1');
        this.kaijuPlayer1.setScale(0.25);

        this.kaijuPlayer2 = this.add.sprite(520, 680, 'kaijuPlayer2');
        this.kaijuPlayer2.setScale(0.25);

        this.mechaPlayer1 = this.add.sprite(880, 680, 'mechaPlayer1');
        this.mechaPlayer1.setScale(0.25);

        this.mechaPlayer2 = this.add.sprite(1240, 680, 'mechaPlayer2');
        this.mechaPlayer2.setScale(0.25);

        // Create the player titles.
        this.player1 = this.add.sprite(200, 750, 'player1');
        this.player1.setScale(0.15);

        this.player2 = this.add.sprite(520, 750, 'player2');
        this.player2.setScale(0.15);

        this.player3 = this.add.sprite(880, 750, 'player3');
        this.player3.setScale(0.15);

        this.player4 = this.add.sprite(1240, 750, 'player4');
        this.player4.setScale(0.15);

        // Create the win screens.
        this.mechaWin = this.add.sprite(740, 450, 'mechaWin');
        this.mechaWin.setScale(0.5);

        this.kaijuWin = this.add.sprite(740, 450, 'kaijuWin');
        this.kaijuWin.setScale(0.5);

        // Hide the win screens.
        this.mechaWin.setVisible(false);
        this.kaijuWin.setVisible(false);

        this.objectDestroyed = false;

        let p1Button: string;
        let p2Button: string;
        let p3Button: string;
        let p4Button: string;

        let p1LastButton: string;
        let p2LastButton: string;
        let p3LastButton: string;
        let p4LastButton: string;

        let p1Pressed: boolean;
        let p2Pressed: boolean;
        let p3Pressed: boolean;
        let p4Pressed: boolean;
        
        const p1ButtonList = ['w', 'a', 's', 'd'];
        const p2ButtonList = ['1', '2', '3', '4'];
        const p3ButtonList = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
        const p4ButtonList = ['9', '8', '7', '6'];

        let buttons = [this.w, this.a, this.s, this.d, this.one, this.two, this.three, this.four, this.up, this.left, this.down, this.right, this.nine, this.eight, this.seven, this.six];

        // If both players press the correct button, they will move forward.
        let buttonStates = [false, false, false, false];

        // Check if the players pressed the correct button with an event listener.
        this.input.keyboard.on('keydown', function (event) {
            // Check if the player pressed the correct button.
            checkButton(1, event.key);
            checkButton(2, event.key);
            checkButton(3, event.key);
            checkButton(4, event.key);

            // Check if both players pressed the correct button.
            checkButtonPairs();
        });

        // Create function to generate a random button, then assign it.
        function generateButton(player : number) {

            // Assign the button to the player.
                if (player === 1) {
                    let button = p1ButtonList[Math.floor(Math.random() * p1ButtonList.length)];
                    while (button === p1LastButton) {
                        button = p1ButtonList[Math.floor(Math.random() * p1ButtonList.length)];
                    }
                    p1Button = button;
                    p1LastButton = button;
                    p1Pressed = false;
                }
                if (player === 2) {
                    let button = p2ButtonList[Math.floor(Math.random() * p2ButtonList.length)];
                    while (button === p2LastButton) {
                        button = p2ButtonList[Math.floor(Math.random() * p2ButtonList.length)];
                    }
                    p2Button = button;
                    p2LastButton = button;
                    p2Pressed = false;
                }
                if (player === 3) {
                    let button = p3ButtonList[Math.floor(Math.random() * p3ButtonList.length)];
                    while (button === p3LastButton) {
                        button = p3ButtonList[Math.floor(Math.random() * p3ButtonList.length)];
                    }
                    p3Button = button;
                    p3LastButton = button;
                    p3Pressed = false;
                }
                if (player === 4) {
                    let button = p4ButtonList[Math.floor(Math.random() * p4ButtonList.length)];
                    while (button === p4LastButton) {
                        button = p4ButtonList[Math.floor(Math.random() * p4ButtonList.length)];
                    }
                    p4Button = button;
                    p4LastButton = button;
                    p4Pressed = false;
                }

        }

        // Create function to check if the player pressed the correct button and update the button state.
        function checkButton(player : number, button : string) {
            // Check if the player pressed the correct button.
            if (player === 1) {
                if (button === p1Button) {
                    buttonStates[0] = true;
                    for (let button of buttons) {
                        if (button.texture.key === p1Button) {
                            button.setVisible(false);
                            p1Pressed = true;
                        }
                    }
                // If the player pressed the wrong button, move them backwards.
                } else if (p1ButtonList.indexOf(button) !== -1 && buttonStates[0] === false && objectHits === 0) {
                    if (kaiju.x > 280) {
                        kaiju.x -= 200;
                    } else {
                        kaiju.x = 80;
                    }
                }
            }
            // Repeat for player 2, 3, and 4.
            if (player === 2) {
                if (button === p2Button) {
                    buttonStates[1] = true;
                    for (let button of buttons) {
                        if (button.texture.key === p2Button) {
                            button.setVisible(false);
                            p2Pressed = true;
                        }
                    }
                } else if (p2ButtonList.indexOf(button) !== -1 && buttonStates[1] === false && objectHits === 0) {
                    if (kaiju.x > 280) {
                        kaiju.x -= 200;
                    } else {
                        kaiju.x = 80;
                    }
                }
            }
            if (player === 3) {
                if (button === p3Button) {
                    buttonStates[2] = true;
                    for (let button of buttons) {
                        if (button.texture.key === p3Button) {
                            button.setVisible(false);
                            p3Pressed = true;
                        }
                    }
                } else if (p3ButtonList.indexOf(button) !== -1 && buttonStates[2] === false && objectHits === 0) {
                    if (mecha.x > 280) {
                        mecha.x -= 200;
                    } else {
                        mecha.x = 80;
                    }
                }
            }
            if (player === 4) {
                if (button === p4Button) {
                    buttonStates[3] = true;
                    for (let button of buttons) {
                        if (button.texture.key === p4Button) {
                            button.setVisible(false);
                            p4Pressed = true;
                        }
                    }
                } else if (p4ButtonList.indexOf(button) !== -1 && buttonStates[3] === false && objectHits === 0) {
                    if (mecha.x > 280) {
                        mecha.x -= 200;
                    } else {
                        mecha.x = 80;
                    }
                }
            }
        }

        // Create function to check if both players pressed the correct button.
        function checkButtonPairs() {
            if (buttonStates[0] && buttonStates[1]) {
                // Move the kaiju forward.
                moveCharacter('kaiju');
                buttonStates[0] = false;
                buttonStates[1] = false;
                generateButton(1);
                generateButton(2);
            }
            if (buttonStates[2] && buttonStates[3]) {
                // Move the mecha forward.
                moveCharacter('mecha');
                buttonStates[2] = false;
                buttonStates[3] = false;
                generateButton(3);
                generateButton(4);
            }
            for (let button of buttons) {
                if (button.texture.key === p1Button || button.texture.key === p2Button || button.texture.key === p3Button || button.texture.key === p4Button) {
                    if (button.texture.key === p1Button && p1Pressed === false) {
                        button.setVisible(true);
                    }
                    if (button.texture.key === p2Button && p2Pressed === false) {
                        button.setVisible(true);
                    }
                    if (button.texture.key === p3Button && p3Pressed === false) {
                        button.setVisible(true);
                    }
                    if (button.texture.key === p4Button && p4Pressed === false) {
                        button.setVisible(true);
                    }
                }
                else (
                    button.setVisible(false)
                )
            }
        }

        // Create function to move the characters forward.
        function moveCharacter(team : string) {
            if (team === 'kaiju') {
                // Move the kaiju forward by moving the sprite forward by 10 pixels.
                kaiju.x += 100;
            }
            if (team === 'mecha') {
                // Move the mecha forward by moving the sprite forward by 10 pixels.
                mecha.x += 100;
            }
        }

        // Create function to display the current randomly generated buttons.
        function displayButtons() {
            for (let button of buttons) {
                if (button.texture.key === p1Button || button.texture.key === p2Button || button.texture.key === p3Button || button.texture.key === p4Button) {
                    button.setVisible(true);
                }
            }
        }

        // Generate buttons at the start of the game, but not every frame.
        if (this.gameStart === false) {
            generateButton(1);
            generateButton(2);
            generateButton(3);
            generateButton(4);
            // Display the button on the screen.
            displayButtons();
            this.objectDestroyed = false;
            this.gameStart = true;
        }
    }

    update ()
    {

        // Check if the kaiju or mecha has collided with an obstacle.
        if (this.kaiju.x >= (this.trash.x - 100)) {
            if (this.objectDestroyed === false) {
                this.kaiju.setVisible(false);
                this.kaiju2.setVisible(true);
                this.kaiju.x = (this.trash.x - 120);
                objectHits++;
            }
        }

        if (this.mecha.x >= (this.trash.x - 100)) {
            if (this.objectDestroyed === false) {
                this.mecha.setVisible(false);
                this.mecha2.setVisible(true);
                this.mecha.x = (this.trash.x - 120);
                objectHits++;
            }
        }

        if (objectHits >= 3) {
            this.objectDestroyed = true;
            objectHits = 0;
            this.mecha.setVisible(true);
            this.mecha2.setVisible(false);
            this.kaiju.setVisible(true);
            this.kaiju2.setVisible(false);
            this.trash.destroy();
            this.trash2.setVisible(true);
        }

        // Check if the kaiju or mecha has reached the end of the track.
        if (this.kaiju.x >= 1400 || this.mecha.x >= 1400) {
            if (this.mecha.x >= 1400) {
                this.mechaWin.setVisible(true);
            }
            if (this.kaiju.x >= 1400) {
                this.kaijuWin.setVisible(true);
            }
            this.kaiju.x = 160;
            this.mecha.x = 160;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#7b6e61',
    width: 1480,
    height: 1000,
    scene: MainScene
};

const game = new Phaser.Game(config);
