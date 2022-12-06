import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import io from "socket.io-client";
import useInterval from "use-interval";

const socket = io.connect("http://localhost:3001");

function StartedGamePlay() {
  const { room, userName, host, updatePosition, position } = useStateContext();
  const [round, updateNum] = useState(0);
  const [userInputLat, updateUserInputLat] = useState();
  const [userInputLang, updateUserInputLang] = useState();

  function NextRound() {
    socket.emit("next_round", room, round + 1);
    updateNum(round + 1);
    updateUserInputLang();
    updateUserInputLat();
  }

  function sendUserInput() {
    socket.emit(
      "sending_user_lat_and_lang",
      room,
      userName,
      userInputLat,
      userInputLang
    );
    NextRound();
  }

  useEffect(() => {
    socket.on("next_round_detected", (round) => {
      console.log(round.round);
      updateNum(round.round);
    });

    socket.on("incoming_lat_lang", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div>
      {round}
      <br></br>
      {position}
      <br></br>
      {host && <button onClick={() => NextRound()}>Click Me</button>}
      {round === position - 1 && (
        <div>
          <input
            onChange={(e) => updateUserInputLat(e.target.value)}
            id="lat_user_input"
            type={"number"}
          ></input>
          <input
            onChange={(e) => updateUserInputLang(e.target.value)}
            id="lang_user_input"
            type={"number"}
          ></input>
          <button onClick={() => sendUserInput()}>Send Data</button>
        </div>
      )}
    </div>
  );
}

function WaitingScreen() {
  const { room, userName, host, updatehost, updatePosition } =
    useStateContext();
  const [start, newStart] = useState(false);
  const [players, setplayers] = useState([]);

  function joinRoom() {
    socket.emit("join_room", room, userName);
  }

  function startroom() {
    socket.emit("start_game", room);
  }

  useEffect(() => {
    socket.on("roomData", (data) => {
      console.log(data);
      setplayers(data.users);
    });

    socket.on("start", () => {
      newStart(true);
    });

    socket.on("host_joined", () => {
      updatehost();
    });

    socket.on("position", (data) => {
      console.log(data);
      updatePosition(parseInt(data.data));
    });
  }, [socket]);

  return (
    <div className="game_container">
      {start ? (
        <StartedGamePlay />
      ) : (
        <div>
          <button onClick={() => joinRoom()}>Click me</button>
          {host && (
            <button onClick={() => startroom()}>Click Me to start </button>
          )}

          <div className="game_waiting_container">
            <h1>Bekmap!</h1>
            <h3> Lobby : </h3>
            <div className="game_waiting_container_player_list">
              {players.map((player, index) => (
                <p key={index}>{player.name}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WaitingScreen;
