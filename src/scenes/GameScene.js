import Puzzle from '../puzzle/hand'
import Board from '../grid/board'

class GameScene extends Phaser.Scene {
  constructor() {
      super({ key: 'GameScene' });
      this.gameStats = {
          mistakes: 0,
          successfulReveals: 0
      };
  }
  create() {
      this.music = this.sound.add('puzzle');
      this.music.play({
          loop: true
      });

      this.add.image(this.width, this.height, 'background-puzzle').setOrigin(0, 0);

      this.board = new Board();
      this.board.create(this, Puzzle);
  }
  update() {
      this.updateInput();
  }
  updateInput() {
      if (this.input.activePointer.justDown) {

          let pointerGridPos = this.board.toGridPosition(this.input.activePointer.x, this.input.activePointer.y);
          if (this.input.activePointer.rightButtonDown()) {
              this.sound.playAudioSprite('sfx', 'pc_xmark');
              this.board.markTile(pointerGridPos);
              return;
          }

          let correct = this.board.revealTile(pointerGridPos);

          if (correct === true) {
              this.sound.playAudioSprite('sfx', 'pc_mark');

              this.gameStats.successfulReveals += 1;
              console.log("Correct", this.gameStats.successfulReveals);
              if (this.board.tilesToBeRevealed == 0) {
                this.add.text(13, 0, 'You win !', { fontFamily: 'Arial', fontSize: 15, color: '#000000' });
                  console.log("Win!");
              }
          }

          else if (correct === false) {
            this.sound.playAudioSprite('sfx', 'pc_mistake');

              this.gameStats.mistakes++;
          }

          else {
          }
      }
  }
}

export default GameScene;