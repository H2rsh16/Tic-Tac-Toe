import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Initial empty board
const initialBoard = Array(9).fill(null);

// Check winner
const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// Minimax algorithm
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  if (winner === "X") return -10 + depth;
  if (winner === "O") return 10 - depth;
  if (board.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
};

// Get AI move
const getBestMove = (board) => {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const moveVal = minimax(board, 0, false);
      board[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
};

const Board = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerOne, playerTwo, mode } = location.state || {};

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [startingPlayer, setStartingPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const initialMount = useRef(true);

  // Randomize start on first load
  useEffect(() => {
    if (!mode) {
      navigate("/");
      return;
    }

    const randomStarter = Math.random() < 0.5 ? "X" : "O";
    setStartingPlayer(randomStarter);
    setCurrentPlayer(randomStarter);
    setBoard(initialBoard);
    setWinner(null);
    setIsDraw(false);
    setGameStarted(true);
  }, [mode, navigate]);

  // Get player label
  const getPlayerName = (symbol) => {
    if (mode === "computer") return symbol === "X" ? (playerOne || "You") : "Computer";
    return symbol === "X" ? playerOne : playerTwo;
  };

  // Player click
  const handleClick = (index) => {
    if (board[index] || winner || isDraw || (mode === "computer" && currentPlayer === "O")) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(getPlayerName(currentPlayer));
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // AI move
  const aiMove = () => {
    const bestMove = getBestMove(board);
    if (bestMove === -1) return;

    const newBoard = [...board];
    newBoard[bestMove] = "O";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner("Computer");
    } else if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer("X");
    }
  };

  // Trigger AI on turn
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    if (mode === "computer" && currentPlayer === "O" && !winner && !isDraw) {
      const timeout = setTimeout(aiMove, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, mode, board, winner, isDraw]);

  // Reset Game
  const resetGame = () => {
    const nextStarter = startingPlayer === "X" ? "O" : "X";
    setBoard(initialBoard);
    setWinner(null);
    setIsDraw(false);

    if (mode === "player") {
      setStartingPlayer(nextStarter);
      setCurrentPlayer(nextStarter);
    } else {
      setStartingPlayer("X");
      setCurrentPlayer("X");
    }

    setGameStarted(true);
    initialMount.current = true;
  };

  const handleResetToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md sm:w-fit h-fit"
    >
      <h4 className="text-lg font-semibold mb-2">
        🎮 Game Mode: {mode === "player" ? "Vs Player" : "Vs Computer"}
      </h4>

      <div className="mb-2 text-center">
        {mode === "player" ? (
          <>
            <p><strong>Player One:</strong> {playerOne}</p>
            <p><strong>Player Two:</strong> {playerTwo}</p>
          </>
        ) : (
          <>
            <p><strong>Player:</strong> {playerOne || "You"}</p>
            <p>🧠 You’ll be playing against the computer</p>
          </>
        )}
      </div>

      <h4 className="mb-2 text-xl font-medium">
        {winner
          ? `🏆 ${winner} wins!`
          : isDraw
          ? "🤝 It's a tie!"
          : `🎯 Turn: ${getPlayerName(currentPlayer)} (${currentPlayer})`}
      </h4>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="h-20 w-20 text-5xl font-bold text-blue-500 bg-white border border-gray-400 cursor-pointer"
          >
            {cell}
          </button>
        ))}
      </div>

      {(winner || isDraw) && (
        <>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={resetGame}
          >
            🔁 Play Again
          </button>
          <button
            className="mt-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            onClick={handleResetToHome}
          >
            🏠 Reset to Home
          </button>
        </>
      )}
    </div>

  );
};

export default Board;
