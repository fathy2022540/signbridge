// sockets/roomSocket.js

const rooms = {};


module.exports = function initSocket(io) {

  io.on("connection", socket => {

    console.log(
      "🔌 User connected:",
      socket.id
    );


    // ─────────────────────────
    // JOIN ROOM
    // ─────────────────────────

    socket.on(

      "join-room",

      ({
        roomId,
        peerId,
        username
      }) => {

        socket.join(roomId);

        socket.roomId = roomId;

        socket.peerId = peerId;

        socket.username = username;


        // create room if not exists
        if (!rooms[roomId]) {

          rooms[roomId] = {};

        }

        rooms[roomId][peerId] = {

          socketId: socket.id,
          username

        };


        console.log(

          `👤 ${username} joined room ${roomId}`

        );


        // notify others
        socket.to(roomId).emit(

          "user-connected",

          {
            peerId,
            username
          }

        );


        // participants count
        io.to(roomId).emit(

          "participants-count",

          Object.keys(
            rooms[roomId]
          ).length

        );

      }

    );


    // ─────────────────────────
    // SEND MESSAGE
    // ─────────────────────────

    socket.on(

      "send-message",

      data => {

        if (!socket.roomId)
          return;

        socket.to(
          socket.roomId
        ).emit(
          "receive-message",
          data
        );

      }

    );


    // ─────────────────────────
    // DISCONNECT
    // ─────────────────────────

    socket.on("disconnect", () => {

      const roomId =
        socket.roomId;

      const peerId =
        socket.peerId;

      if (
        roomId &&
        rooms[roomId]
      ) {

        delete rooms[roomId][peerId];

        socket.to(roomId).emit(

          "user-disconnected",

          peerId

        );

        io.to(roomId).emit(

          "participants-count",

          Object.keys(
            rooms[roomId]
          ).length

        );


        // delete empty room
        if (

          Object.keys(
            rooms[roomId]
          ).length === 0

        ) {

          delete rooms[roomId];

        }

      }

      console.log(
        "❌ User disconnected:",
        socket.id
      );

    });

  });

};