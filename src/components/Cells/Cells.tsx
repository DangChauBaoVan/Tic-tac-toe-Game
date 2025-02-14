import React from "react";
//import { FaTimes, FaRegCircle } from "react-icons/fa";
import X from "/img/close.png";
import O from "/img/o.png";
import "./cells.css";

type Player = "X" | "O" | null;

interface CellProps {
  value: Player;
  currentPlayer: Player;
  onClick: () => void;
}

const Cells: React.FC<CellProps> = ({ value, onClick, currentPlayer }) => {
  let hoverClass: string = "";
  if (value == null && currentPlayer != null) {
    hoverClass = `cell-${currentPlayer.toLocaleLowerCase()}`;
  }
  
  return (
    <button className={`cell ${hoverClass}`} onClick={onClick}>
        
      {value === "X" ? (
        <img className="icon" src={X} />
      ) : value === "O" ? (
        <img className="icon" src={O} />
      ) : null}
    </button>
  );
};

export default Cells;
