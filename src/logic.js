
class Chessboard {
  constructor() {
    this.chessboard = new Array(8).fill(null).map(() => new Array(8).fill(null));
    this.currentPlayer = 'white';
    this.activePiece = undefined;
    this.viableMoves = [];
    this.selectedPos = undefined;
    this.selectedPiece = undefined;
    this.init();
  }

  setViableMoves() {
    this.viableMoves = this.activePiece.getPossibleMoves();
  }

  setActivePiece() {
    this.activePiece = this.selectedPiece;
  }

  selectPieceAt(pos) {
    this.selectedPos = pos;
    this.selectedPiece = this.getPieceAt(this.selectedPos.x, this.selectedPos.y);
  }

  currentPlayersPiece() {
    return (this.selectedPiece instanceof ChessPiece && this.selectedPiece.player === this.currentPlayer);
  }

  getPieceAt(x, y) {
    return this.chessboard[y][x];
  }

  switchTurn() {
    this.activePiece = undefined;
    this.viableMoves = [];
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
  }

  inViableMoves(pos) {
    return this.viableMoves.find(elem => elem.x === pos.x && elem.y === pos.y);
  }

  moveActivetoSelected() {
    this.chessboard[this.selectedPos.y][this.selectedPos.x] = this.activePiece;
    this.chessboard[this.activePiece.position.y][this.activePiece.position.x] = null;
    this.activePiece.setPosition(this.selectedPos);
  }

  selectedPositionIsFree() {
    return (typeof chessboard.activePiece !== 'undefined');
  }

  getActivePiece() {
    return this.activePiece;
  }

  getSelectedPos() {
    return this.selectedPos;
  }

  getViableMoves() {
    return this.viableMoves;
  }

  init() {
    let player = 'white';
    for (let y = 0; y < 8; y += 7) {
      for (let x = 0; x < 8; x++) {
        this.chessboard[y][x] = new ChessPiece(player, 'pawn', Position(x, y));
      }
      player = 'black';
    }
  }

  onBoard(pos) {
    return (0 <= pos.x && pos.x < 8) && (0 <= pos.y && pos.y < 8);
  }

  viableMove(position, playerToMove) {
    if (this.onBoard(position)) {
      if (this.getPieceAt(position.x, position.y) === null)
        return true;
      else if (this.getPieceAt(position.x, position.y).player !== playerToMove)
        return true;
    }
    return false;
  }

  log() {
    let boardRow = '';
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.getPieceAt(x, y) !== null)
          boardRow = boardRow.concat(this.getPieceAt(x, y).type, ' ');
        else {
          if (this.inViableMoves(Position(x, y)))
            boardRow = boardRow.concat('  .  ');
          else
            boardRow = boardRow.concat('  |  ');
        }

      }
      boardRow = boardRow.concat('\n');
    }
    console.log(boardRow);
  }

}


class ChessPiece {
  constructor(player, type, position) {
    this.player = player;
    this.type = type;
    this.hasMoved = false;
    this.position = position;
    this.model = 'resources/chessPieces/' + (player === 'white' ? 'WhitePawn.png' : 'BlackPawn.png');
  }

  getPossibleMoves() {
    const moveOffsetY = [2, 1, 1, 1];
    const moveOffsetX = [0, 0,-1, 1];

    let possibleMoves = [];
    const direction = this.player === 'white' ? 1 : -1;

    for (let i = this.hasMoved ? 1 : 0; i < 4; i++) {
      const newPosition = Position(this.position.x + moveOffsetX[i], this.position.y + moveOffsetY[i] * direction);
      if (chessboard.viableMove(newPosition, this.player)) {
        possibleMoves.push(newPosition)
      }
    }
    return possibleMoves;
  }

  setPosition(pos) {
    this.position = pos;
    this.hasMoved = true;
  }
}


function Position(x, y) {
  this.x = x;
  this.y = y;

  if (!new.target) {
    return new Position(x, y);
  }
}


function viewControl() {
  let container = document.getElementById('grid-container');

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let squareType = (x+y) % 2 === 0 ? ' even' : ' odd';
      let square = document.createElement('div');

      square.addEventListener("click", playerMove);

      square.className += 'grid-item';
      square.className += squareType;
      square.id = x.toString() + y.toString();

      if (chessboard.getPieceAt(x, y) instanceof ChessPiece) {
        square.setAttribute('style', 'background-image: url("' + chessboard.getPieceAt(x, y).model + '");');
      }
      container.appendChild(square);
    }
  }
}

function updatePieceGui(piece, pos) {
  let oldPos = document.getElementById(piece.position.x.toString() + piece.position.y.toString());
  let pieceImage = oldPos.style.backgroundImage;
  oldPos.style.backgroundImage = 'none';
  let newPos = document.getElementById(pos.x.toString()  + pos.y.toString());
  newPos.style.backgroundImage = pieceImage;
}

function highlightAvailablePositions() {
  chessboard.viableMoves.forEach((elem) => {
    let square = document.getElementById(elem.x.toString() + elem.y.toString());
    square.style.backgroundColor = 'lightgoldenrodyellow';
  })
}

function clearAvailablePositions() {
  chessboard.viableMoves.forEach((elem) => {
    let color = (elem.x+elem.y) % 2 === 0 ? '#f0d9b5' : '#B58863';
    let square = document.getElementById(elem.x.toString() + elem.y.toString());
    square.style.backgroundColor = color;
  })
}

let playerMove = (elem) => {
  console.clear();
  let input = elem.target.id.split('');

  chessboard.selectPieceAt(Position(+input[0], +input[1]));

  if (chessboard.currentPlayersPiece()) {
    chessboard.setActivePiece();
    clearAvailablePositions();
    chessboard.setViableMoves();
    highlightAvailablePositions();
    console.log('Active piece set!');
    chessboard.log();


  } else if (chessboard.selectedPositionIsFree()) {
    if (chessboard.inViableMoves(chessboard.getSelectedPos())) {
      updatePieceGui(chessboard.getActivePiece(), chessboard.getSelectedPos());
      chessboard.moveActivetoSelected();
      clearAvailablePositions();
      console.log('Chess piece moved!');
      chessboard.switchTurn();
      chessboard.log();
    } else {
      console.log('Pick a correct Position!');
    }

  } else {
    console.log('select a chess piece of your color!')
  }
};

const chessboard = new Chessboard();

viewControl(chessboard);
