import React from "react";
const GameBoard = ({ selected, board }) => {
  //   const [board, setBoard] = useState(initialGame);

  //   const handleClick = (rowIndex, colIndex) => {
  //     setBoard((prevBoard) => {
  //       const newBoard = prevBoard.map((row) => [...row]);
  //       newBoard[rowIndex][colIndex] = currentSymbol;
  //       return newBoard;
  //     });
  //     selected();
  //   };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => selected(rowIndex, colIndex)}
                  disabled={symbol !== null}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
