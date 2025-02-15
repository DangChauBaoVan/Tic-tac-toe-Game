import { useState } from "react";
import Board from "./Board/Board";
import "./tictactoe.css";
import HistoryBoard from "./HistoryBoard/HistoryBoard";
import X from "/img/close.png";
import O from "/img/o.png";
import clickSoundAudio from "/sounds/click.wav";
import gameOverSoundAudio from "/sounds/game_over.wav";
import laurel from "/img/right.png"

type Player = "X" | "O" | null;
type BoardState = Player[];
type RoundHistory = {
  round: number;
  winner: "X" | "O" | "Draw";
};

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];
const clickSound = new Audio(clickSoundAudio);
clickSound.volume = 0.5;
const gameOverSound = new Audio(gameOverSoundAudio);
gameOverSound.volume = 0.2;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [theWinner, setTheWWinner] = useState<Player | "Draw" | null>(null);
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strikeClass, setStrikeClass] = useState<string | null>(null);

  const checkWinner = (
    newBoard: BoardState
  ): { winner: Player | "Draw" | null; strikeClass: string | null } => {
    for (const { combo, strikeClass } of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return { winner: newBoard[a], strikeClass };
      }
    }
    return {
      winner: newBoard.every((cell) => cell !== null) ? "Draw" : null,
      strikeClass: null,
    };
  };

  const handleClick = (index: number) => {
    if (board[index] || theWinner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    clickSound.play();

    const { winner, strikeClass } = checkWinner(newBoard);
    if (winner) {
      gameOverSound.play();
      setTheWWinner(winner);
      setStrikeClass(strikeClass);
      setHistory((prevHistory) => [
        ...prevHistory,
        { round: prevHistory.length + 1, winner: winner },
      ]);
      if (winner !== "Draw") {
        setScore((prevScore) => ({
          ...prevScore,
          [winner]: prevScore[winner] + 1,
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTheWWinner(null);
    setStrikeClass(null);
    setCurrentPlayer("X");
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="turnBox">
        <h2>Turn</h2>
        <img src={currentPlayer === "X" ? X : O} />
      </div>
      <button className="history-btn" onClick={() => setIsModalOpen(true)}>
      <img src={laurel} className="laurel-left"/>
        <h2>Scoreboard</h2>
        <img src={laurel} className="laurel-right"/>
      </button>

      <div className="score">
        <h2>
          Player <span style={{ color: "#2577cf" }}>X</span>
        </h2>

        <h2>
          <span style={{ color: "#2577cf" }}> {score.X}</span>|
          <span style={{ color: "#EF0B34" }}>{score.O}</span>
        </h2>
        <h2>
          Player <span style={{ color: "#EF0B34" }}>0</span>
        </h2>
      </div>
      {theWinner && (
        <div className="result-card">
          <h2>
            {theWinner === "Draw" ? (
              <span>"It's a Draw!"</span>
            ) : (
              <span>
                The winner is{" "}
                <span
                  style={{
                    color: `${theWinner === "X" ? "#2577cf" : "#EF0B34"}`,
                  }}
                >
                  {theWinner}
                </span>
              </span>
            )}
          </h2>

          <button className="reset" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
      <Board
        board={board}
        handleClick={handleClick}
        currentPlayer={currentPlayer}
        strikeClass={strikeClass}
      />

      <HistoryBoard
        history={history}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TicTacToe;
