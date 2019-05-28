class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }
    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            // this.scene.start('TitleScene');
            this.scene.start('GameScene');
        });

        this.load.image('background-puzzle', 'assets/images/puzzle/boards/board10x10.png');

        this.load.spritesheet('mark-sheet', 'assets/images/puzzle/boards/mark-sprites.png', {
            frameWidth: 13,
            frameHeight: 13
        });
        this.load.spritesheet('hint-sheet', 'assets/images/puzzle/boards/hint-sprites.png', {
            frameWidth: 13,
            frameHeight: 13
        });

        this.load.audio('puzzle', [
            'assets/music/fez_knowledge.ogg',
            'assets/music/fez_knowledge.mp3'
        ]);

        this.load.audioSprite('sfx', 'assets/audio/sfx.json', [
            'assets/audio/sfx.ogg',
            'assets/audio/sfx.mp3'
        ], {
            instances: 4
        });
    }
}

export default BootScene;
