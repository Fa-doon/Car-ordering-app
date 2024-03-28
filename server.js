const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const OrderingApp = require("./orderingApp");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;
const server = http.createServer(app);
// So server can function as a websocket
const io = socketIO(server);

app.get("/", (req, res) => {
  res.send("Car Ordering App");
});

app.get("/sender", (req, res) => {
  res.sendFile(path.join(__dirname, "sender.html"));
});

app.get("/driver", (req, res) => {
  res.sendFile(path.join(__dirname, "driver.html"));
});

const orderingApp = new OrderingApp();

// io to listen to connection/events
io.on("connection", (socket) => {
  console.log("User has connected: ", socket.id);

  socket.on("join", (user_type, Username) => {
    const userInfo = {
      socket: socket,
      user_type: user_type,
      name: Username,
    };

    orderingApp.joinSession(userInfo);
  });

  socket.on("requestOrder", (order) => {
    orderingApp.requestOrder(order);
  });

  socket.on("acceptOrder", (id, driverId) => {
    orderingApp.acceptOrder(id, driverId);
  });

  socket.on("rejectOrder", (id, driverId) => {
    orderingApp.rejectOrder(id, driverId);
  });

  socket.on("finishRide", (id, driverId) => {
    orderingApp.finishRide(id, driverId);
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});
