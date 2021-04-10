import io from 'socket.io-client';

let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:5000');
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToUsersInRoom = cb => {
  if (!socket) return true;
  socket.on('roomData', ({ room, users }) => {
    return cb(null, { room, users });
  });
};

export const joinRoom = (name: string, room: string, avatar: string) => {
  if (socket)
    socket.emit('join', { name, room, avatar }, error => {
      if (error) alert(error);
    });
};

export const createRoom = (username: string, avatar: string) => {
  if (socket)
    socket.emit('create_room', { username, avatar }, error => {
      if (error) alert(error);
    });
};
