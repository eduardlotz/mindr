import React from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const ENDPOINT = process.env.API_URL ? process.env.API_URL : 'localhost:4000';

  const socket = io(ENDPOINT, {
    autoConnect: false,
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
