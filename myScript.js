// Global variables
var board;
var pieces;
var selectedPiece;
var $selectedSquare;
var $antSquare;
var pieceColor;
var firstClick = true;
const dark = "dark", light = "light", empty = "empty"; 
var TURN = dark;

$(document).ready(function(){
	initializeArrays();
    setUpBoard();
    setUpPieces();
    // onclick function
    $('div.square_dark').on("click", function() {
    	$selectedSquare = $(this);
	    var x = $selectedSquare.attr('data-positionX');
	    var y = $selectedSquare.attr('data-positionY');

    	if (firstClick) {
    		//console.log("firsClick");
	    	if (isPiece(x, y)) {
	    		//console.log("insidefirstClick");
	    		//console.log(TURN, pieceColor);
	    		if (TURN == pieceColor) {
		    		selectedPiece = board[x][y];
		    		$antSquare = $selectedSquare;
		    		$selectedSquare.css('background-color','yellow');
		    		firstClick = false;
	    		}
	    	}
    	}
    	else {
    		if (isPiece(x, y)) {
    			return;
    		} else {
	    		selectedPiece.move(x, y);
	    		//selectedPiece = undefined;
	    		//$selectedSquare = undefined;
	    		console.log(board);
	    		if (pieceColor == dark) {
	    			TURN = light;
	    			$('#turno').text("Rojas");
	    		} else if (pieceColor == light) {
	    			TURN = dark;
	    			$('#turno').text("Negras");
	    		}
	    		firstClick = true;
    		}
    	}
	});
});

function setUpBoard() {

	// Crear tablero y colores
    var color = true;
    
    for (i=0; i<8; i++) {

		color = !color;

		for (j=0; j<8; j++){
			if(color){
				$('div#board').append($('<div data-positionX='+i+' data-positionY='+j+'/>').addClass('square_dark'));
				color = false;
			} else{
				$('div#board').append($('<div data-positionX='+i+' data-positionY='+j+'/>').addClass('square_light'));	
				color = true;
			}
		}
	}
};

function setUpPieces() {
	
	// Añadir piezas light
	var pieces = 12;
    for (var i=0;i<pieces;i++) {
        $square = $(".square_dark:eq("+i+")");
        $square.css('background-image', 'url(piece_light.gif)');
       	$square.css('background-position', 'center');
       	$square.css('background-repeat', 'no-repeat');
    }

    // Añadir piezas dark
    var pieces = 32;
    for (var i=20;i<pieces;i++) {   
        $square = $(".square_dark:eq("+i+")");
        $square.css('background-image', 'url(piece_dark.gif)');
        $square.css('background-position', 'center');
        $square.css('background-repeat', 'no-repeat');
    }
}

function Piece(team, positionX, positionY) {
    this.team = team;
    this.positionX = positionX;
    this.positionY = positionY;
    this.move = function(x, y) {
    	board[this.positionX][this.positionY] = empty;
        board[x][y] = this;
        this.positionX = x;
        this.positionY = y;
        if (this.team === 'light'){
        	$selectedSquare.css('background-image', 'url(piece_light.gif)');
        } else {
        	$selectedSquare.css('background-image', 'url(piece_dark.gif)');
        }
       	$selectedSquare.css('background-position', 'center');
       	$selectedSquare.css('background-repeat', 'no-repeat');
       	$antSquare.css('background-image', 'none');
       	$antSquare.css('background-color', 'black');
    };
};

function initializeArrays() {

	// Guarrada
	var piece1 = new Piece(light, 0, 1);
	var piece2 = new Piece(light, 0, 3);
	var piece3 = new Piece(light, 0, 5);
	var piece4 = new Piece(light, 0, 7);
	var piece5 = new Piece(light, 1, 0);
	var piece6 = new Piece(light, 1, 2);
	var piece7 = new Piece(light, 1, 4);
	var piece8 = new Piece(light, 1, 6);
	var piece9 = new Piece(light, 2, 1);
	var piece10 = new Piece(light, 2, 3);
	var piece11 = new Piece(light, 2, 5);
	var piece12 = new Piece(light, 2, 7);
	var piece13 = new Piece(dark, 5, 0);
	var piece14 = new Piece(dark, 5, 2);
	var piece15 = new Piece(dark, 5, 4);
	var piece16 = new Piece(dark, 5, 6);
	var piece17 = new Piece(dark, 6, 1);
	var piece18 = new Piece(dark, 6, 3);
	var piece19 = new Piece(dark, 6, 5);
	var piece20 = new Piece(dark, 6, 7);
	var piece21 = new Piece(dark, 7, 0);
	var piece22 = new Piece(dark, 7, 2);
	var piece23 = new Piece(dark, 7, 4);
	var piece24 = new Piece(dark, 7, 6);

	board = [
		[empty, piece1, empty, piece2, empty, piece3, empty, piece4],
		[piece5, empty, piece6, empty, piece7, empty, piece8, empty],
		[empty, piece9, empty, piece10, empty, piece11, empty, piece12],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[piece13, empty, piece14, empty, piece15, empty, piece16, empty],
		[empty, piece17, empty, piece18, empty, piece19, empty, piece20],
		[piece21, empty, piece22, empty, piece23, empty, piece24, empty],
	];

	//jugador1 = [piece1, piece2, piece3, piece4, piece5,
	 //piece6, piece7, piece8, piece9, piece10, piece11, piece12];

	//jugador2 = [piece13, piece14, piece15, piece16, piece17, piece18,
	 //piece19, piece20, piece21, piece22, piece23, piece24];
}

function isPiece(x, y) {
	var piece = false;
	if (board[x][y] != empty) {
	 	pieceColor = board[x][y].team;
	 	console.log(pieceColor);
		piece=true;
	}

	return piece;
}