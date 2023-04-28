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
        this.add.image(380, 150, 'ocean');

        this.kaiju = this.add.sprite(40, 50, 'kaiju');
        this.kaiju.setScale(1.0);

        this.mecha = this.add.sprite(40, 170, 'mecha');
        this.mecha.setScale(1.0);

        // Create the buttons and button sprites.

        // Player 1 buttons.
        this.w = this.add.sprite(100, 300, 'w');
        this.w.setScale(0.75);
        this.a = this.add.sprite(60, 340, 'a');
        this.a.setScale(0.75);
        this.s = this.add.sprite(100, 340, 's');
        this.s.setScale(0.75);
        this.d = this.add.sprite(140, 340, 'd');
        this.d.setScale(0.75);
        
        // Player 2 buttons.
        this.one = this.add.sprite(260, 300, '1');
        this.one.setScale(0.75);
        this.two = this.add.sprite(220, 340, '2');
        this.two.setScale(0.75);
        this.three = this.add.sprite(260, 340, '3');
        this.three.setScale(0.75);
        this.four = this.add.sprite(300, 340, '4');
        this.four.setScale(0.75);
        
        // Player 3 buttons.
        this.up = this.add.sprite(440, 300, 'ArrowUp');
        this.up.setScale(0.75);
        this.left = this.add.sprite(400, 340, 'ArrowLeft');
        this.left.setScale(0.75);
        this.down = this.add.sprite(440, 340, 'ArrowDown');
        this.down.setScale(0.75);
        this.right = this.add.sprite(480, 340, 'ArrowRight');
        this.right.setScale(0.75);
        
        // Player 4 buttons.
        this.nine = this.add.sprite(620, 300, '9');
        this.nine.setScale(0.75);
        this.eight = this.add.sprite(580, 340, '8');
        this.eight.setScale(0.75);
        this.seven = this.add.sprite(620, 340, '7');
        this.seven.setScale(0.75);
        this.six = this.add.sprite(660, 340, '6');
        this.six.setScale(0.75);

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
        this.add.text(60, 255, 'Player 1', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(220, 255, 'Player 2', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(400, 255, 'Player 3', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        this.add.text(560, 255, 'Player 4', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });

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
                }
            }
            if (player === 2) {
                if (button === player2Button) {
                    buttonStates[1] = true;
                }
            }
            if (player === 3) {
                if (button === player3Button) {
                    buttonStates[2] = true;
                }
            }
            if (player === 4) {
                if (button === player4Button) {
                    buttonStates[3] = true;
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
                hideButtons(player1Button, player2Button);
                generateButton(1);
                generateButton(2);
            }
            if (buttonStates[2] && buttonStates[3]) {
                // Move the mecha forward.
                moveCharacter('mecha');
                buttonStates[2] = false;
                buttonStates[3] = false;
                hideButtons(player3Button, player4Button);
                generateButton(3);
                generateButton(4);
            }
        }

        // Create function to move the characters forward.
        function moveCharacter(team) {
            if (team === 'kaiju') {
                // Move the kaiju forward by moving the sprite forward by 10 pixels.
                kaiju.x += 50;
            }
            if (team === 'mecha') {
                // Move the mecha forward.
                mecha.x += 50;
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

        function hideButtons(button1, button2) {
            for (let button of buttons) {
                if (button.texture.key === button1 || button.texture.key === button2) {
                    button.setVisible(false);
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
        if (this.kaiju.x >= 700 || this.mecha.x >= 700) {
            this.kaiju.x = 40;
            this.mecha.x = 40;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#3e79dd',
    width: 760,
    height: 435,
    scene: MainScene
};

const game = new Phaser.Game(config);
