import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import io from "socket.io-client";
import useInterval from "use-interval";

const socket = io.connect("http://localhost:3001");

function StartedGamePlay() {
  const { room, userName, host, updatePosition, position } = useStateContext();
  const [round, updateNum] = useState(1);
  const [userInput, updateUserInput] = useState();
  const [userScore, updateUserScore] = useState();

  const [correctAnswer, updateCorrectAnswer] = useState();

  function NextRound() {
    socket.emit("next_round", room, round + 1);
    updateNum(round + 1);
    updateUserInput();
  }

  function sendUserInput() {
    socket.emit("send_user_input", room, userName, userInput);
    NextRound();
  }

  function checkAnswer() {
    console.log(correctAnswer);
    console.log(userInput);
    const results = Math.abs(correctAnswer - userInput);
    console.log(results);
  }

  useEffect(() => {
    socket.on("next_round_detected", (round) => {
      updateNum(round.round);
      updateCorrectAnswer(round.answer);
      setTimeout(() => {
        checkAnswer();
      }, "1000");
    });
  }, [socket]);

  return (
    <div>
      {host && <button onClick={() => NextRound()}>Click Me</button>}
      <br></br>
      {correctAnswer}
      <br></br>

      {round === position - 1 && (
        <div>
          <input
            onChange={(e) => updateUserInput(e.target.value)}
            id="lat_user_input"
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
          {players.length === 0 ? (
            <button onClick={() => joinRoom()}>Click me</button>
          ) : (
            <></>
          )}
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
