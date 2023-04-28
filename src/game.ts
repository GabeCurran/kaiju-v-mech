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
    constructor ()
    {
        super('MainScene');
    }

    preload ()
    {
        // Load the images we need for this game.

        // Load the background.
        this.load.image('ocean', 'assets/ocean/backgrounds/ocean.png');

        // Load the sprites.
        this.load.image('kaiju', 'assets/ocean/sprites/jellyfish/idle2.png');
        this.load.image('mecha', 'assets/ocean/sprites/octopus/idle1.png');

        // Load the buttons.
        this.load.image('w', 'assets/buttons/w.png');
        this.load.image('a', 'assets/buttons/a.png');
        this.load.image('s', 'assets/buttons/s.png');
        this.load.image('d', 'assets/buttons/d.png');

        this.load.image('1', 'assets/buttons/1.png');
        this.load.image('2', 'assets/buttons/2.png');
        this.load.image('3', 'assets/buttons/3.png');
        this.load.image('4', 'assets/buttons/4.png');

        this.load.image('ArrowUp', 'assets/buttons/up.png');
        this.load.image('ArrowLeft', 'assets/buttons/left.png');
        this.load.image('ArrowDown', 'assets/buttons/down.png');
        this.load.image('ArrowRight', 'assets/buttons/right.png');

        this.load.image('9', 'assets/buttons/9.png');
        this.load.image('8', 'assets/buttons/8.png');
        this.load.image('7', 'assets/buttons/7.png');
        this.load.image('6', 'assets/buttons/6.png');

        // Set the game start to false.
        this.gameStart = false;
    }

    create ()
    {

        // We will use ocean sprites as a placeholder until we have our own art.
        // Create the ocean background.
        this.background = this.add.sprite(760, 300, 'ocean');
        this.background.setScale(2.0);

        this.kaiju = this.add.sprite(80, 100, 'kaiju');
        this.kaiju.setScale(2.0);

        this.mecha = this.add.sprite(80, 340, 'mecha');
        this.mecha.setScale(2.0);

        // Create the buttons and button sprites.

        // Player 1 buttons.
        this.w = this.add.sprite(200, 600, 'w');
        this.w.setScale(1.5);
        this.a = this.add.sprite(120, 680, 'a');
        this.a.setScale(1.5);
        this.s = this.add.sprite(200, 680, 's');
        this.s.setScale(1.5);
        this.d = this.add.sprite(280, 680, 'd');
        this.d.setScale(1.5);
        
        // Player 2 buttons.
        this.one = this.add.sprite(520, 600, '1');
        this.one.setScale(1.5);
        this.two = this.add.sprite(440, 680, '2');
        this.two.setScale(1.5);
        this.three = this.add.sprite(520, 680, '3');
        this.three.setScale(1.5);
        this.four = this.add.sprite(600, 680, '4');
        this.four.setScale(1.5);
        
        // Player 3 buttons.
        this.up = this.add.sprite(880, 600, 'ArrowUp');
        this.up.setScale(1.5);
        this.left = this.add.sprite(800, 680, 'ArrowLeft');
        this.left.setScale(1.5);
        this.down = this.add.sprite(880, 680, 'ArrowDown');
        this.down.setScale(1.5);
        this.right = this.add.sprite(960, 680, 'ArrowRight');
        this.right.setScale(1.5);
        
        // Player 4 buttons.
        this.nine = this.add.sprite(1240, 600, '9');
        this.nine.setScale(1.5);
        this.eight = this.add.sprite(1160, 680, '8');
        this.eight.setScale(1.5);
        this.seven = this.add.sprite(1240, 680, '7');
        this.seven.setScale(1.5);
        this.six = this.add.sprite(1320, 680, '6');
        this.six.setScale(1.5);

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

        // Create the text for the game
        this.add.text(160, 510, 'Player 1', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(480, 510, 'Player 2', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(840, 510, 'Player 3', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(1200, 510, 'Player 4', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });

        let player1Button: string;
        let player2Button: string;
        let player3Button: string;
        let player4Button: string;

        const player1ButtonList = ['w', 'a', 's', 'd'];
        const player2ButtonList = ['1', '2', '3', '4'];
        const player3ButtonList = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
        const player4ButtonList = ['9', '8', '7', '6'];

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
        function generateButton(player) {
            // Generate a random number between 0 and 3.
            const randomNumber = Math.floor(Math.random() * 4);

            // Assign the button to the player.
                if (player === 1) {
                    player1Button = player1ButtonList[randomNumber];
                }
                if (player === 2) {
                    player2Button = player2ButtonList[randomNumber];
                }
                if (player === 3) {
                    player3Button = player3ButtonList[randomNumber];
                }
                if (player === 4) {
                    player4Button = player4ButtonList[randomNumber];
                }

            // Display the button on the screen.
            displayButtons();
        }

        // Create function to check if the player pressed the correct button and update the button state.
        function checkButton(player, button) {
            // Check if the player pressed the correct button.
            if (player === 1) {
                if (button === player1Button) {
                    buttonStates[0] = true;
                    // If the player pressed the wrong button, move them backwards.
                } else if (player1ButtonList.indexOf(button) !== -1 && buttonStates[0] === false) {
                    if (kaiju.x > 280) {
                        kaiju.x -= 200;
                    } else {
                        kaiju.x = 80;
                    }
                }
            }
            // Repeat for player 2, 3, and 4.
            if (player === 2) {
                if (button === player2Button) {
                    buttonStates[1] = true;
                } else if (player2ButtonList.indexOf(button) !== -1 && buttonStates[1] === false) {
                    if (kaiju.x > 280) {
                        kaiju.x -= 200;
                    } else {
                        kaiju.x = 80;
                    }
                }
            }
            if (player === 3) {
                if (button === player3Button) {
                    buttonStates[2] = true;
                } else if (player3ButtonList.indexOf(button) !== -1 && buttonStates[2] === false) {
                    if (mecha.x > 280) {
                        mecha.x -= 200;
                    } else {
                        mecha.x = 80;
                    }
                }
            }
            if (player === 4) {
                if (button === player4Button) {
                    buttonStates[3] = true;
                } else if (player4ButtonList.indexOf(button) !== -1 && buttonStates[3] === false) {
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
                if (button.texture.key === player1Button || button.texture.key === player2Button || button.texture.key === player3Button || button.texture.key === player4Button) {
                    button.setVisible(true);
                }
                else (
                    button.setVisible(false)
                )
            }
        }

        // Create function to move the characters forward.
        function moveCharacter(team) {
            if (team === 'kaiju') {
                // Move the kaiju forward by moving the sprite forward by 10 pixels.
                kaiju.x += 100;
            }
            if (team === 'mecha') {
                // Move the mecha forward.
                mecha.x += 100;
            }
        }

        // Create function to display the current randomly generated buttons.
        function displayButtons() {
            for (let button of buttons) {
                if (button.texture.key === player1Button || button.texture.key === player2Button || button.texture.key === player3Button || button.texture.key === player4Button) {
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
            this.gameStart = true;
        }
    }

    update ()
    {
        if (this.kaiju.x >= 1400 || this.mecha.x >= 1400) {
            this.kaiju.x = 80;
            this.mecha.x = 80;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#3e79dd',
    width: 1520,
    height: 870,
    scene: MainScene
};

const game = new Phaser.Game(config);
