import React from "react";
import Lobby from "./lobby";
import UserOptions from "./userNameRoom";
import { useStateContext } from "../context";
import WaitingScreen from "./WaitingScreen";

function Layout() {
  const { showLobby, showUserOptions, showWaitingRoom } = useStateContext();

  return (
    <div className="layout">
      {showLobby && <Lobby />}
      {showUserOptions && <UserOptions />}
      {showWaitingRoom && <WaitingScreen />}
    </div>
  );
}

export default Layout;
