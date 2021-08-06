export default class Game extends Phaser.Scene {


 constructor () {
  super({
   key: 'Game'
  });
 }

 preload () {
  this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
  this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
  this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
  this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
 }
   
 create () {

 }

 update() {

 }

}