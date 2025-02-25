import React, { useState } from "react";

const Player = ({ Name, Symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(Name);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      onChangeName(Symbol, playerName);
    }
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{Symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
