import React from "react";
import { useStateContext } from "../context";

function Lobby() {
  const { updateShowLobby, updateUserOptions } = useStateContext();
  return (
    <div className="Lobby_container">
      <h1>Bekmap!</h1>
      <button
        onClick={() => {
          updateShowLobby();
          updateUserOptions();
        }}
        id="lobby_play_button"
      >
        play
      </button>
    </div>
  );
}

export default Lobby;
