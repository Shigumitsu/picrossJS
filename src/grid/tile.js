var TileStates;
(function (TileStates) {
    TileStates[TileStates["Unrevealed"] = 0] = "Unrevealed";
    TileStates[TileStates["MarkedAsBlank"] = 1] = "MarkedAsBlank";
    TileStates[TileStates["Correct"] = 2] = "Correct";
    TileStates[TileStates["Mistake"] = 3] = "Mistake";
})(TileStates || (TileStates = {}));

var TileFrames;
(function (TileFrames) {
    TileFrames[TileFrames["Correct"] = 0] = "Correct";
    TileFrames[TileFrames["Cross"] = 1] = "Cross";
    TileFrames[TileFrames["Empty"] = 2] = "Empty";
})(TileFrames || (TileFrames = {}));

class Tile {
    constructor(scene, worldPosition, isColored) {
        this.state = TileStates.Unrevealed;
        this.isFilled = isColored;
        this.frontSprite = scene.add.tileSprite(
            worldPosition.x, worldPosition.y,
            13, 13,
            "mark-sheet",
            TileFrames.Cross);
        this.frontSprite.setOrigin(0, 0);
        this.frontSprite.setVisible(false);
    }
    get isMarkedAsBlank() { return this.state == TileStates.MarkedAsBlank; }
    get isInteractive() { return this.state == TileStates.Unrevealed || this.state == TileStates.MarkedAsBlank; }
    markAsBlank() {
        if (!this.isInteractive) {
            return;
        }
        if (!this.isMarkedAsBlank) {
            this.changeState(TileStates.MarkedAsBlank);
        }
        else {
            this.changeState(TileStates.Unrevealed);
        }
    }
    reveal() {
        if (this.isMarkedAsBlank) {
            return null;
        }
        if (this.isFilled) {
            this.changeState(TileStates.Correct);
            return true;
        }
        this.changeState(TileStates.Mistake);
        return false;
    }
    changeState(newState) {
        let frame = 0;
        
        switch (newState) {
            default:
            case TileStates.Unrevealed:
                this.frontSprite.setVisible(false);
                break;

            case TileStates.Correct:
                this.frontSprite.setFrame(TileFrames.Correct);
                this.frontSprite.setVisible(true);
                break;

            case TileStates.MarkedAsBlank:
                this.frontSprite.setFrame(TileFrames.Cross);
                this.frontSprite.setVisible(true);
                break;

            case TileStates.Mistake:
                this.frontSprite.setFrame(TileFrames.Cross);
                this.frontSprite.setVisible(true);
                break;
        }
        this.state = newState;
    }
}

export default Tile