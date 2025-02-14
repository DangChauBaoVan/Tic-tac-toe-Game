import { useState } from "react";
import Board from "./Board/Board";
import "./tictactoe.css";
import HistoryBoard from "./HistoryBoard/HistoryBoard";
import X from "/img/close.png";
import O from "/img/o.png";
import clickSoundAudio from "/sounds/click.wav"
import gameOverSoundAudio from "/sounds/game_over.wav"


type Player = "X" | "O" | null;
type BoardState = Player[];
type RoundHistory = {
    round: number;
    winner: "X" | "O" | "Draw";
  };
  

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];
const clickSound = new Audio(clickSoundAudio);
clickSound.volume =0.5;
const gameOverSound = new Audio(gameOverSoundAudio);
gameOverSound.volume =0.2;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkWinner = (newBoard: BoardState): Player | "Draw" | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return newBoard.every((cell) => cell !== null) ? "Draw" : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    clickSound.play();

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
        gameOverSound.play();
      setWinner(gameWinner);
      setHistory(prevHistory => [...prevHistory, { round: prevHistory.length + 1, winner: gameWinner }]);
      if (gameWinner !== "Draw") {
        setScore((prevScore) => ({
          ...prevScore,
          [gameWinner]: prevScore[gameWinner] + 1,
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("X");
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <button className="history-btn" onClick={() => setIsModalOpen(true)}><h2>Score</h2></button>
      <div className="turnBox">
      <h2>Turn</h2>
      <img src={currentPlayer==="X" ? X:O}/>
      
      </div>
      
      <div className="score">
        <h2>
          Player <span style={{ color: "#EF0B34" }}>0</span>
        </h2>
        <h2>
          <span style={{ color: "#EF0B34" }}>{score.O}</span> |
          <span style={{ color: "#2577cf" }}> {score.X}</span>
        </h2>
        <h2>
          Player <span style={{ color: "#2577cf" }}>X</span>
        </h2>
      </div>
      {winner && (
        <div className="result-card">
          <h2>{winner === "Draw" ? "It's a Draw!" : (<span>The winner is <span style={{color: `${winner ==="X" ? "#2577cf":"#EF0B34"}`}}>{winner}</span></span>) }</h2>

          <button className="reset" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
      <Board board={board} handleClick={handleClick} currentPlayer={currentPlayer}/>
      
      <HistoryBoard history={history} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TicTacToe;
