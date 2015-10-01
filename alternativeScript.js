function Checker(color, position) {
    this.team = color;
    this.symbol = null;

    if (color === 'red') {
        this.symbol = colors.red(String.fromCharCode(0x12022));
    } else {
        this.symbol = colors.blue(String.fromCharCode(0x12022));
    }

    this.position = position;

    // this.simpleMoves = function() {
    //     var availableMoves = [];
    //     if (this.team === 'red') {
    //         moves.push([ this.position[0] + 1, this.position[1] + 1 ]);
    //         moves.push([ this.position[0] + 1, this.position[1] - 1 ]);
    //     } else {
    //         moves.push([ this.position[0] - 1, this.position[1] + 1 ]);
    //         moves.push([ this.position[0] - 1, this.position[1] - 1 ]);
    //     }
    //     return availableMoves;
    // }

    this.movePiece = function(newPosition) {
        this.position = newPosition;
    }
}

function Board() {

    this.checkers = [];

    this.resetBoard = function() {
        var bgw = colors.bgWhite(' ');

        this.board = [
            [' ', '1', '2', '3', '4', '5', '6', '7', '8'],
            ['1', bgw, ' ', bgw, ' ', bgw, ' ', bgw, ' '],
            ['2', ' ', bgw, ' ', bgw, ' ', bgw, ' ', bgw],
            ['3', bgw, ' ', bgw, ' ', bgw, ' ', bgw, ' '],
            ['4', ' ', bgw, ' ', bgw, ' ', bgw, ' ', bgw],
            ['5', bgw, ' ', bgw, ' ', bgw, ' ', bgw, ' '],
            ['6', ' ', bgw, ' ', bgw, ' ', bgw, ' ', bgw],
            ['7', bgw, ' ', bgw, ' ', bgw, ' ', bgw, ' '],
            ['8', ' ', bgw, ' ', bgw, ' ', bgw, ' ', bgw]
        ];
    }

    this.printBoard = function() {
        for (var i = 0; i < this.board.length; i++) {
            console.log(this.board[i].join(' '));
        }
    }

    this.placePieces = function() {
        for (var i = 0; i < this.checkers.length; i++) {
            this.board[this.checkers[i].position[0]][this.checkers[i].position[1]] = this.checkers[i].symbol;
        }
    }

    this.createPieces = function() {
        var redSpots = [
            [1, 2], [1, 4], [1, 6], [1, 8],
            [2, 1], [2, 3], [2, 5], [2, 7]
        ];

        var blueSpots = [
            [7, 2], [7, 4], [7, 6], [7, 8],
            [8, 1], [8, 3], [8, 5], [8, 7]
        ];

        for (var i = 0; i < 8; i++) {
            this.checkers.push(new Checker('red', redSpots[i]));
            this.checkers.push(new Checker('blue', blueSpots[i]));
        }
    }

    this.locatePiece = function(position) {
        var selectedPiece;
        for (var i = 0; i < this.checkers.length; i++) {
            if (this.checkers[i].position[0] === position[0] && this.checkers[i].position[1] === position[1]) {
                selectedPiece = this.checkers[i];
            }
        }
        return selectedPiece;
    }
}

function Game() {
    this.board = new Board();

    this.start = function() {
        this.board.createPieces();
        this.board.resetBoard();
        this.board.placePieces();
        this.getPrompt();
    }

    this.getPrompt = function() {
        var that = this;
        this.board.printBoard();
        prompt.get(['start', 'finish', 'remove'], function (error, result) {
            var piece = that.board.locatePiece([ parseInt(result.start[0]), parseInt(result.start[1]) ]);
            piece.position = [ parseInt(result.finish[0]), parseInt(result.finish[1]) ]
            if (result.remove !== '') {
                var deadPiece = that.board.locatePiece([ parseInt(result.remove[0]), parseInt(result.remove[1]) ]);
                var deadPieceIndex = that.board.checkers.indexOf(deadPiece);
                that.board.checkers.splice(deadPieceIndex, 1);
            }
            that.board.resetBoard();
            that.board.placePieces();
            that.getPrompt();
        });
    }
}

var game = new Game();
game.start();