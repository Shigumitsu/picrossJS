class HintNumber {
  constructor(scene, worldPosition, hintValue) {
      this.found = false;
      this.hintValue = hintValue;

      if (hintValue == 0) {
          this.found = true;
      }

      this.sprite = scene.add.tileSprite(worldPosition.x, worldPosition.y, 13, 13, "hint-sheet", hintValue);
      this.sprite.alpha = this.alphaColor;
      this.sprite.setOrigin(0, 0);
  }
  get alphaColor() { return !this.found ? 1 : 0.5; }
}

export default HintNumber