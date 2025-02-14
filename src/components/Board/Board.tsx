import React from "react";
import Cells from "../Cells/Cells";
import "./board.css"

type Player = "X" | "O" | null;

interface BoardProps {
  board: Player[];
  currentPlayer: Player;
  handleClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board,currentPlayer ,handleClick }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cells key={index} value={cell} currentPlayer={currentPlayer} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;