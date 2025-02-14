import React from "react";
import "./HistoryBoard.css";
import X from "/img/close.png";
import O from "/img/o.png";
import laurel from "/img/right.png"

type RoundHistory = {
  round: number;
  winner: "X" | "O" | "Draw";
};
type HistoryBoardProps = {
  history: RoundHistory[];
  isOpen: boolean;
  onClose: () => void;
};

const HistoryBoard: React.FC<HistoryBoardProps> = ({
  history,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="scoreboard">
            <img src={laurel} className="laurel-left" />
            <h2>Scoreboard</h2>
            <img src={laurel} className="laurel-right" />
          </div>
          {history.length === 0 ? (
            <p>Let's play some game!</p>
          ) : (
            <div className="history-content-container">
              {history.map((round, index) => {
                let result;
                if (round.winner === "Draw") {
                  result = <h4>It's a Draw!</h4>;
                } else {
                  result = (
                    <img
                      src={round.winner === "X" ? X : O}
                      className="history-icon"
                    />
                  );
                }

                return (
                  <div key={index} className="history-content">
                    <div className="history-row">
                      <h3>Round {round.round}: </h3>
                      {result}
                    </div>
                    <div className="divider"></div>
                  </div>
                );
              })}
            </div>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryBoard;
