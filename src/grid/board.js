import Tile from './tile'
import HintNumber from './hintnumber'

const CELL_SIZE = 14;
const BOARD_TOP = 85;
const BOARD_LEFT = 153;

class Board {
    get boardPixelWitdh() {
        return CELL_SIZE * this.gridSize.x;
    }

    get boardPixelHeight() {
        return CELL_SIZE * this.gridSize.y;
    }

    get boardLeft() {
        return BOARD_LEFT;
    }

    get boardTop() {
        return BOARD_TOP;
    }

    get tilesAmount() {
        return this.gridSize.x * this.gridSize.y;
    }

    constructor() { }

    create(scene, puzzle) {
        this.gridSize = { x: 10, y: 10 };
        this.tiles = Array();
        this.tilesToBeRevealed = 0;
        for (var y = 0; y < this.gridSize.y; y += 1) {
            this.tiles.push(new Array());
            for (var x = 0; x < this.gridSize.x; x += 1) {
                this.tiles[y].push(new Tile(scene, this.toScreenPosition(x, y), !!puzzle[y][x]));
                this.tilesToBeRevealed += puzzle[y][x];
            }
        }
        this.createRowHints(scene, puzzle);
        this.createColumnHints(scene, puzzle);
    }

    createEmpty(scene, rowsAmount, columnsAmount) {

        var empty = new Array();
        for (var y = 0; y < columnsAmount; y += 1) {
            empty.push(new Array());
            for (var x = 0; x < rowsAmount; x += 1) {
                empty[y].push(0);
            }
        }
        this.create(scene, empty);
    }

    createRowHints(scene, puzzle) {
        this.rowHintNumbers = new Array();
        for (var y = 0; y < this.gridSize.y; y += 1) {
            this.rowHintNumbers.push(new Array());
            let sequence = 0;

            for (var x = this.gridSize.x - 1; x >= 0; x -= 1) {
                if (!!puzzle[y][x]) {
                    sequence += 1;
                }

                let sequenceEnded = (!!!puzzle[y][x] || x == 0) && (sequence > 0);

                let rowHasNoFilledTiles = sequence == 0 && x == 0 && this.rowHintNumbers[y].length == 0;

                if (sequenceEnded || rowHasNoFilledTiles) {
                    this.rowHintNumbers[y].push(new HintNumber(scene, this.toScreenPosition(-(this.rowHintNumbers[y].length + 1), y), sequence));
                    sequence = 0;
                }
            }
        }
    }

    createColumnHints(scene, puzzle) {
        this.columnHintNumbers = new Array();
        for (var x = 0; x < this.gridSize.x; x += 1) {
            
            this.columnHintNumbers.push(new Array());
            let sequence = 0;

            for (var y = this.gridSize.y - 1; y >= 0; y -= 1) {
                if (!!puzzle[y][x]) {
                    sequence += 1;
                }

                let sequenceEnded = (!!!puzzle[y][x] || y == 0) && (sequence > 0);
                let rowHasNoFilledTiles = sequence == 0 && y == 0 && this.columnHintNumbers[x].length == 0;

                if (sequenceEnded || rowHasNoFilledTiles) {
                    this.columnHintNumbers[x].push(new HintNumber(scene, this.toScreenPosition(x, -(this.columnHintNumbers[x].length + 1)), sequence));
                    sequence = 0;
                }
            }
        }
    }

    revealTile(gridpos) {
        let tile = this.getTile(gridpos.x, gridpos.y);

        if (tile != null && tile.isInteractive) {
            let revealed = tile.reveal();
            if (revealed === true) {
                this.tilesToBeRevealed -= 1;
            }

            return revealed;
        }

        return null;
    }

    markTile(gridpos) {
        let tile = this.getTile(gridpos.x, gridpos.y);
        if (tile != null) {
            tile.markAsBlank();
        }
    }

    getTile(x, y) {
        if (x < 0 || x >= this.gridSize.x || y < 0 || y >= this.gridSize.y) {
            return null;
        }
        return this.tiles[y][x];
    }

    toGridPosition(screenPosX, screenPosY) {
        return new Phaser.Geom.Point(Math.floor((screenPosX - this.boardLeft) / CELL_SIZE), Math.floor((screenPosY - this.boardTop) / CELL_SIZE));
    }

    toScreenPosition(gridPosX, gridPosY) {
        return new Phaser.Geom.Point(Math.floor(this.boardLeft + gridPosX * CELL_SIZE), Math.floor(this.boardTop + gridPosY * CELL_SIZE));
    }

    /**
     * Creates an array based on the current puzzle.
     * @returns An array that consists out of 1's and 0's forming the current puzzle.
    */

    createPuzzleArray() {
        var puzzle = new Array();
        for (var y = 0; y < this.gridSize.y; y += 1) {
            // Add a new row
            puzzle.push(new Array());
            // Adds a 0 or 1 depending on whether the corresponding tile is filled or not
            for (var x = 0; x < this.gridSize.x; x += 1) {
                puzzle[y].push(+this.tiles[y][x].isFilled);
            }
        }
        return puzzle;
    }
}

export default Board