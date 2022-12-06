import React, { useState } from "react";
import { useStateContext } from "../context";

function UserOptions() {
  const [stage, newState] = useState(false);
  const [room, newroom] = useState();
  const [username, newUsername] = useState();

  const { updateWaitingRoom, updateRoom, updateUserName, updateUserOptions } =
    useStateContext();

  function sendUpdate() {
    updateRoom(room);
    updateUserName(username);
    updateWaitingRoom();
    updateUserOptions();
  }

  return (
    <div className="userNameRoom_container">
      {stage && (
        <div className="userNameRoom_container">
          <input
            className="userNameRoom_room_id_number_input"
            placeholder="name"
            type={"text"}
            id="userName_name_input"
            onChange={(e) => newUsername(e.target.value)}
            autoComplete="off"
          />
          <div className="userNameRoom_button_container">
            <button
              onClick={() =>
                (document.getElementById("userName_name_input").value = "")
              }
            >
              Clear
            </button>
            <button onClick={() => sendUpdate()}>Enter</button>
          </div>
        </div>
      )}
      {!stage && (
        <div className="userNameRoom_container">
          <input
            className="userNameRoom_room_id_number_input"
            placeholder="room"
            type={"number"}
            id="userName_room_id_number_input"
            onChange={(e) => newroom(e.target.value)}
            autoComplete="off"
          />
          <div className="userNameRoom_button_container">
            <button
              onClick={() =>
                (document.getElementById(
                  "userName_room_id_number_input"
                ).value = "")
              }
            >
              Clear
            </button>
            <button
              onClick={() => {
                newState(true);
              }}
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOptions;
