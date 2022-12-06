import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState();
  const [roomData, setRoomData] = useState([]);

  const [showLobby, setShowLobby] = useState(true);
  const [showUserOptions, setUserOptions] = useState(false);
  const [showWaitingRoom, setWaitingRoom] = useState(false);
  const [host, sethost] = useState(false);
  const [position, setPosition] = useState(0);

  const updateUserName = (name) => {
    setUserName(name);
  };

  const updatePosition = (position) => {
    setPosition(position);
  };

  const updatehost = () => {
    sethost(true);
  };

  const updateRoomData = (data) => {
    setRoomData(data);
  };

  const updateRoom = (room) => {
    setRoom(room);
  };
  const updateShowLobby = () => {
    if (showLobby) setShowLobby(false);
    else setShowLobby(true);
  };
  const updateUserOptions = () => {
    if (showUserOptions) setUserOptions(false);
    else setUserOptions(true);
  };

  const updateWaitingRoom = () => {
    if (showWaitingRoom) setWaitingRoom(false);
    else setWaitingRoom(true);
  };

  return (
    <Context.Provider
      value={{
        updateUserName,
        updateShowLobby,
        updateUserOptions,
        updateWaitingRoom,
        updateRoom,
        updateRoomData,
        updatehost,
        updatePosition,
        showLobby,
        userName,
        showUserOptions,
        showWaitingRoom,
        room,
        roomData,
        host,
        position,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
