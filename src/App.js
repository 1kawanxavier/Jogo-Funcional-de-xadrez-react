import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState([
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], //torre , cavalo, bispo , rainha, rei,
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ]);

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    if (piece === null) {
      console.log('Nenhuma peça nesta posição.');
      return;
    }

    // Aqui você deve implementar a lógica para verificar a vez do jogador

    switch (piece.toLowerCase()) {
      case 'p':
        handlePawnMove(row, col);
        break;
      case 'k':
        handleKingMove(row, col);
        break;
      case 'q':
        handleQueenMove(row, col);
        break;
      // Adicione casos para outras peças, como torre, bispo, cavalo, etc.
      default:
        console.log('Peça não reconhecida.');
        break;
    }
  };

  const handlePawnMove = (row, col) => {
    const forward = row === 6 ? -1 : 1; // Define a direção do movimento do peão
    const newRow = row + forward;

    // Verifica se a nova posição está dentro do tabuleiro
    if (newRow < 0 || newRow >= 8) {
      console.log('Movimento inválido.');
      return;
    }

    // Verifica se a nova posição está vazia
    if (board[newRow][col] === null) {
      const newBoard = [...board];
      newBoard[newRow][col] = newBoard[row][col];
      newBoard[row][col] = null;
      setBoard(newBoard);
      console.log(`Peão movido para ${newRow}-${col}`);
    } else {
      console.log('Movimento inválido. A posição já está ocupada.');
    }
  };

  const handleKingMove = (row, col) => {
    const possibleMoves = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1],
    ];

    for (let move of possibleMoves) {
      const [newRow, newCol] = move;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (board[newRow][newCol] === null) {
          const newBoard = [...board];
          newBoard[newRow][newCol] = newBoard[row][col];
          newBoard[row][col] = null;
          setBoard(newBoard);
          console.log(`Rei movido para ${newRow}-${newCol}`);
          return;
        }
      }
    }
    console.log('Movimento inválido.');
  };

  const handleQueenMove = (row, col) => {
    // A rainha pode se mover na horizontal, vertical e diagonal
    // Vamos reutilizar a lógica da torre e do bispo para a rainha
    handleRookMove(row, col);
    handleBishopMove(row, col);
  };

  const handleRookMove = (row, col) => {
    // Movimento horizontal e vertical
    // Verifica os movimentos para cima
    for (let i = row - 1; i >= 0; i--) {
      if (board[i][col] === null) {
        const newBoard = [...board];
        newBoard[i][col] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Torre movida para ${i}-${col}`);
        return;
      } else if (board[i][col] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para baixo
    for (let i = row + 1; i < 8; i++) {
      if (board[i][col] === null) {
        const newBoard = [...board];
        newBoard[i][col] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Torre movida para ${i}-${col}`);
        return;
      } else if (board[i][col] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para a direita
    for (let j = col + 1; j < 8; j++) {
      if (board[row][j] === null) {
        const newBoard = [...board];
        newBoard[row][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Torre movida para ${row}-${j}`);
        return;
      } else if (board[row][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para a esquerda
    for (let j = col - 1; j >= 0; j--) {
      if (board[row][j] === null) {
        const newBoard = [...board];
        newBoard[row][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Torre movida para ${row}-${j}`);
        return;
      } else if (board[row][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }
  };

  const handleBishopMove = (row, col) => {
    // Movimento diagonal
    // Verifica os movimentos para cima e para a esquerda
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Bispo movido para ${i}-${j}`);
        return;
      } else if (board[i][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para cima e para a direita
    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Bispo movido para ${i}-${j}`);
        return;
      } else if (board[i][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para baixo e para a esquerda
    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Bispo movido para ${i}-${j}`);
        return;
      } else if (board[i][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }

    // Verifica os movimentos para baixo e para a direita
    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        console.log(`Bispo movido para ${i}-${j}`);
        return;
      } else if (board[i][j] !== null) {
        console.log('Movimento inválido.');
        return;
      }
    }
  };

  const renderSquare = (piece, row, col) => {
    if (piece === null) {
      return (
        <div
          key={`${row}-${col}`}
          className="square"
          onClick={() => handleSquareClick(row, col)}
        >
          {piece}
        </div>
      );
    }

    const black = (row + col) % 2 === 1;
    const backgroundColor = black ? '#8B4513' : '#FFDAB9'; // Marron para peças pretas e PeachPuff para peças brancas
    const color = piece === piece.toUpperCase() ? 'white' : 'black'; // Define a cor do texto com base na cor da peça
    return (
      <div
        key={`${row}-${col}`}
        className="square"
        style={{ backgroundColor, color }}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) =>
            renderSquare(piece, rowIndex, colIndex)
          )
        )}
      </div>
    </div>
  );
}

export default App;
