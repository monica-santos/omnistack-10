const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocker = server => {
  io = socketio(server);
  io.on('connection', socket => {
    const { techs, latitude, longitude } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });
};

exports.findConnection = (coordinates, techs) => {
  return connections.filter(conn => {
    return (
      calculateDistance(coordinates, conn.coordinates) < 10 &&
      conn.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(conn => {
    io.to(conn.id).emit(message, data);
  });
};
