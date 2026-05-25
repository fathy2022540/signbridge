import { state } from "./state.js";

import { dom }
from "./dom.js";

import { socket }
from "./socketInstance.js";

import {
  addVideo
}
from "./ui.js";

import {
  unlockAudio
}
from "./audio.js";

import {
  peer
}
from "./peerInstance.js";

import {
  AI_SERVER,
  IS_LOCAL
}
from "./config.js";


// ─────────────────────────
// JOIN ROOM
// ─────────────────────────

export function joinRoom() {

  unlockAudio();

  const room =
    window.location.pathname
      .split("/")
      .pop();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const username =
    user?.username || "Guest";

  if (!room)
   return;
  
  if (!state.myPeerId) {

    alert(
      "Peer still connecting..."
    );

    return;

  }

  state.ROOM_ID = room;

  state.USERNAME = username;

  state.users[
    state.myPeerId
  ] = username;


  addVideo(
    state.myStream,
    "me",
    username,
    true
  );

  socket.emit(
    "join-room",
    {
      roomId: state.ROOM_ID,
      peerId: state.myPeerId,
      username
    }
  );

}


// ─────────────────────────
// COPY LINK
// ─────────────────────────

export function copyLink() {

  navigator.clipboard.writeText(
    window.location.href
  );

  const status =
    document.getElementById(
      "copyStatus"
    );

  if (!status)
    return;

  status.style.opacity = "1";

  setTimeout(() => {

    status.style.opacity = "0";

  }, 2000);

}

// ─────────────────────────
// LEAVE CALL
// ─────────────────────────

export function leaveCall() {

  if (state.aiInterval) {

    clearInterval(
      state.aiInterval
    );

  }

  if (IS_LOCAL) {

    fetch(

      `${AI_SERVER}/reset_peer`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          peerId:
            state.myPeerId
        })

      }

    ).catch(() => {});

  }

  socket.emit("leave-room");

  setTimeout(() => {

    state.myStream
      ?.getTracks()
      .forEach(track => {

        track.stop();

      });

    Object.values(
      state.peers
    ).forEach(call => {

      call.close();

    });

    socket.disconnect();

    peer.destroy();

    const token =

      localStorage.getItem(
        "token"
      );

    window.location.href =

      "/dashboard";

  }, 200);

}