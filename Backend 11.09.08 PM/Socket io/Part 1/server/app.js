// ws reuqires ws module
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const httpServer = http.createServer();

httpServer.listen(3001);
//web socket server
const io = new Server(httpServer, {
  cors: {
    origin: ["*"],
  },
});
//callback function when a connection is made to the server
// when a client connects to the server, this function is called
io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});
