import React, { useState } from "react";
import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurn, setGameTurn] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);

  const gameBoard = initialGame.map((row) => [...row]);
  gameTurn.forEach((turn) => {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  });
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  const handlePlayerClick = (rowIndex, colIndex) => {
    setGameTurn((currentGameTurn) => [
      { square: { row: rowIndex, col: colIndex }, player: activePlayer },
      ...currentGameTurn,
    ]);
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
  };

  const handleResetGame = () => {
    setGameTurn([]);
  };

  function handelPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            onChangeName={handelPlayerNameChange}
            Name="Play 1"
            Symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            onChangeName={handelPlayerNameChange}
            Name="Play 2"
            Symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleResetGame} />
        )}
        <GameBoard selected={handlePlayerClick} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
