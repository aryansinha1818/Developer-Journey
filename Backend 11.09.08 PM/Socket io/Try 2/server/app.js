const { Server } = require("socket.io");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;
const httpServer = app.listen(PORT, () => {
  console.log(`Server is now listening to PORT ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    //any client could access them but when in dev then we want a particular client to access
    // origin : [" ", " "]
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  //notify curr user
  socket.emit("mesaage", "Welcome to chat app!");

  //notify all

  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`
  );

  // disconnected
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`
    );
  });

  //capturing the activity
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("message", (data) => {
    console.log(data);
    io.emit(
      "message",
      `
      ${socket.id.substring(0, 5)} : ${data}
    `
    );
  });
});
