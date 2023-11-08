import { Server } from "socket.io";
import { server } from "./http";

export const socket = new Server(server, {
  cors: {
    origin: "*",
  },
});

socket.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
