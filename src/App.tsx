import React from "react";
import "./App.css";
// import X from "/img/close.png"
// import O from "/img/o.png";
import TicTacToe from "./components/TicTacToe";



const App: React.FC = () => {
  return(
    <TicTacToe/>
  )
 
  // const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  // const [score, setScore] = useState({ X: 0, O: 0 });

  // const checkWinner = (board: Board): Player | "Draw" | null => {
  //   const winningCombinations = [
  //     [
  //       [0, 0],
  //       [0, 1],
  //       [0, 2],
  //     ],
  //     [
  //       [1, 0],
  //       [1, 1],
  //       [1, 2],
  //     ],
  //     [
  //       [2, 0],
  //       [2, 1],
  //       [2, 2],
  //     ],
  //     [
  //       [0, 0],
  //       [1, 0],
  //       [2, 0],
  //     ],
  //     [
  //       [0, 1],
  //       [1, 1],
  //       [2, 1],
  //     ],
  //     [
  //       [0, 2],
  //       [1, 2],
  //       [2, 2],
  //     ],
  //     [
  //       [0, 0],
  //       [1, 1],
  //       [2, 2],
  //     ],
  //     [
  //       [0, 2],
  //       [1, 1],
  //       [2, 0],
  //     ],
  //   ];

  //   for (const combo of winningCombinations) {
  //     const [[x1, y1], [x2, y2], [x3, y3]] = combo;
  //     if (
  //       board[x1][y1] &&
  //       board[x1][y1] === board[x2][y2] &&
  //       board[x1][y1] === board[x3][y3]
  //     ) {
  //       return board[x1][y1];
  //     }
  //   }

  //   return board.flat().every((cell) => cell !== null) ? "Draw" : null;
  // };

  // const handleClick = (row: number, col: number) => {
  //   if (board[row][col]) return;

  //   const newBoard = board.map((r, i) =>
  //     r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
  //   );
  //   setBoard(newBoard);
  //   const gameWinner = checkWinner(newBoard);
  //   if (gameWinner) {
  //     alert(gameWinner === "Draw" ? "It's a draw!" : `Winner: ${gameWinner}`);
  //   } else {
  //     setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  //   }
  //   if (gameWinner && gameWinner !== "Draw") {
  //     setScore((prevScore) => ({
  //       ...prevScore,
  //       [gameWinner]: prevScore[gameWinner] + 1,
  //     }));
  //   }
  // };

  // const resetGame = () => {
  //   setBoard(Array(3).fill(Array(3).fill(null)));
  //   setCurrentPlayer("X");
  // };

  // return (
  //   <div className="container">
  //     <h1>Tic-Tac-Toe</h1>
  //     <h3>Score</h3>
  //     <p>
  //       X: {score.X} | O: {score.O}
  //     </p>
  //     <button className="reset" onClick={resetGame}>
  //       Restart
  //     </button>

  //     <div className="board">
  //       {board.map((row, i) => (
  //         <div key={i} className="row">
  //           {row.map((cell, j) => (
  //             <button
  //               key={j}
  //               className="cell"
  //               onClick={() => handleClick(i, j)}
                
  //             >
  //               {cell === "X" ? <img className="icon" src={X}/> : cell === "O" ? <img className="icon" src={O}/> : null}
  //             </button>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default App;
