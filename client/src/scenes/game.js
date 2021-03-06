import Card from '../helpers/card';
import Zone from '../helpers/zone';

export default class Game extends Phaser.Scene {

    constructor () {
        super({
            key: 'Game'
        });
    };

    preload () {
        // Load card images
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
    };

    create () {
        // Make this scene a variable
        let self = this;

        // Create Drop Zone
        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        // Deal Cards
        this.dealCards = function () {
            for (let i=0; i<5; i++) {
                let playerCard = new Card(this);
                playerCard.render(475 + (i*100), 650, 'cyanCardFront')
            };
        };
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.dealText.on('pointerdown', function () {
            self.dealCards();
        });
        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        });
        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        });

        // Highlight selected card and bring to top
        this.input.on('dragstart', function (pointer, gameObject){
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        });
        this.input.on('dragend', function (pointer, gameObject, dropped){
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        // Drag cards
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x -350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
        })

    };

    update() {

    };

};