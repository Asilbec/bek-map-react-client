import "./App.css";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
import { StateContext } from "./context";
import Layout from "./components/layout";
// const socket = io.connect("http://localhost:3001");

function App() {
  // function joinRoom() {
  //   socket.emit("join_room", 321, 321);
  // }

  // useEffect(() => {
  //   socket.on("roomData", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  return (
    <StateContext>
      <Layout />
    </StateContext>
  );
}

export default App;
