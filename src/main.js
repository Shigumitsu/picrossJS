import 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

document.addEventListener('contextmenu', event => event.preventDefault());

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    parent: 'content',
    width: 320,
    height: 240,
    scene: [
        BootScene,
        GameScene
    ],
    zoom: 2
};

const game = new Phaser.Game(config);