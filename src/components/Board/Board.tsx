import React from "react";
import Cells from "../Cells/Cells";
import "./board.css"
import Strike from "../Strike/Strike";

type Player = "X" | "O" | null;


interface BoardProps {
  board: Player[];
  currentPlayer: Player;
  strikeClass: string|null;  
  handleClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board,currentPlayer ,handleClick,strikeClass }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cells key={index} value={cell} currentPlayer={currentPlayer} onClick={() => handleClick(index)} />
      ))}
      <Strike strikeClass={strikeClass}/>
    </div>
  );
};

export default Board;