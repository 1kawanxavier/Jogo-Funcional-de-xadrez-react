import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' },
    { value: 'acromatopsia', label: 'Acromatopsia' },
  ];

  const [board, setBoard] = useState([
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ]);

  const renderSquare = (piece, row, col) => {
    const isBlackSquare = (row + col) % 2 === 1;
    const squareClass = isBlackSquare ? 'black-square' : 'white-square';
    const textClass = piece ? 'square-text' : '';

    return (
      <div
        key={`${row}-${col}`}
        className={`square ${squareClass}`}
        onClick={() => handleSquareClick(row, col)}
      >
        <span className={textClass}>{piece}</span>
      </div>
    );
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Define o idioma para português
    speechSynthesis.speak(utterance);
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    if (piece === null) {
      speak('Nenhuma peça nesta posição.');
      return;
    }

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
      default:
        speak('Peça não reconhecida.');
        break;
    }
  };

  const handlePawnMove = (row, col) => {
    const forward = row === 6 ? -1 : 1;
    const newRow = row + forward;

    if (newRow < 0 || newRow >= 8) {
      speak('Movimento inválido.');
      return;
    }

    if (board[newRow][col] === null) {
      const newBoard = [...board];
      newBoard[newRow][col] = newBoard[row][col];
      newBoard[row][col] = null;
      setBoard(newBoard);
      speak(`Peão movido para linha ${newRow+1}, coluna ${col+1}`);
    } else {
      speak('Movimento inválido. A posição já está ocupada.');
    }

    if (row === 6 && board[row - 1][col] === null && board[row - 2][col] === null) {
      const newBoard = [...board];
      newBoard[row - 2][col] = newBoard[row][col];
      newBoard[row][col] = null;
      setBoard(newBoard);
      speak(`Peão movido para ${row - 2}-${col}`);
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
          speak(`Rei movido para ${newRow}-${newCol}`);
          return;
        }
      }
    }
    speak('Movimento inválido.');
  };

  const handleQueenMove = (row, col) => {
    handleRookMove(row, col);
    handleBishopMove(row, col);
  };

  const handleRookMove = (row, col) => {
    for (let i = row - 1; i >= 0; i--) {
      if (board[i][col] === null) {
        const newBoard = [...board];
        newBoard[i][col] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Torre movida para linha ${i+1}, coluna ${col+1}`);
        return;
      } else if (board[i][col] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      if (board[i][col] === null) {
        const newBoard = [...board];
        newBoard[i][col] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Torre movida para linha ${i+1}, coluna ${col+1}`);
        return;
      } else if (board[i][col] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }

    for (let j = col + 1; j < 8; j++) {
      if (board[row][j] === null) {
        const newBoard = [...board];
        newBoard[row][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Torre movida para linha ${row+1},coluna ${j+1}`);
        return;
      } else if (board[row][j] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }
  };

  const handleBishopMove = (row, col) => {
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Bispo movido para linha ${i+1}, coluna ${j+1}`);
        return;
      } else if (board[i][j] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }

    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Bispo movido para linha ${i+1}, coluna ${j+1}`);
        return;
      } else if (board[i][j] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }

    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Bispo movido ppara linha ${i+1}, coluna ${j+1}`);
        return;
      } else if (board[i][j] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }

    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
      if (board[i][j] === null) {
        const newBoard = [...board];
        newBoard[i][j] = newBoard[row][col];
        newBoard[row][col] = null;
        setBoard(newBoard);
        speak(`Bispo movido para linha ${i+1}, coluna ${j+1}`);
        return;
      } else if (board[i][j] !== null) {
        speak('Movimento inválido.');
        return;
      }
    }
  };

  return (
    <div className="App">
      <select onChange={handleThemeChange} value={theme}>
        {themes.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="board">
        {board.flatMap((row, rowIndex) =>
          row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex))
        )}
      </div>
    </div>
  );
}

export default App;
