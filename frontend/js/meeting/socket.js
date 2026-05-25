import { socket }
from "./socketInstance.js";

import {
  showToast
}
from "./toast.js";

import { state }
from "./state.js";

import { peer }
from "./peerInstance.js";

import {
  showSubtitle
}
from "./ui.js";

import {
  playAudio
}
from "./audio.js";

import {
  addVideo,
  removeVideo
}
from "./ui.js";


export function initSocketEvents() {

  // ─────────────────────────
  // USER CONNECTED
  // ─────────────────────────

  socket.on(
    "user-connected",
    data => {

      state.users[
        data.peerId
      ] = data.username;

      showToast(`${data.username} joined the room`);

      if (
        data.peerId ===
        state.myPeerId
      ) return;

      const call =
        peer.call(
          data.peerId,
          state.myStream
        );

      call.on("stream", stream => {

        addVideo(
          stream,
          data.peerId,
          data.username
        );

      });

      call.on("close", () => {
        showToast("A participant left the room","error");

        removeVideo(
          data.peerId
        );

      });

      state.peers[
        data.peerId
      ] = call;

    }
  );


  // ─────────────────────────
  // USER DISCONNECTED
  // ─────────────────────────

  socket.on(
    "user-disconnected",
    id => {

      if (state.peers[id]) {

        state.peers[id].close();

        delete state.peers[id];

      }

      removeVideo(id);

    }
  );


  // ─────────────────────────
  // PARTICIPANTS COUNT
  // ─────────────────────────

  socket.on(
    "participants-count",
    count => {

      state.participantsCount =
        count;

      document.getElementById(
        "participants"
      ).innerText =
        count + " participants";

    }
  );


  // ─────────────────────────
  // RECEIVE MESSAGE
  // ─────────────────────────

  socket.on(
    "receive-message",
    data => {

      console.log(
        "📩 MESSAGE:",
        data
      );

      const videos =

        document.querySelectorAll(
          ".video-container"
        );

      const container =

        [...videos].find(
          v => v.id !== "me"
        );

      console.log(
        "REMOTE CONTAINER:",
        container
      );

      if (!container)
        return;

      // subtitle
      if (data.text) {

        showSubtitle(
          container,
          data.text
        );

      }

      // audio
      if (data.audio) {

        playAudio(
          data.audio
        );

      }

    }
  );

}