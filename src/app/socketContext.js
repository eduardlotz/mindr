import React from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  let ENDPOINT;

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    ENDPOINT = 'localhost:5000';
  } else {
    // production code
    ENDPOINT = 'https://mindr-server.herokuapp.com/';
  }

  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
