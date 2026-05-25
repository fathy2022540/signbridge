import { state } from "./state.js";

import { peer }
from "./peerInstance.js";

import {
  addVideo,
  removeVideo
}
from "./ui.js";


peer.on("open", id => {

  state.myPeerId = id;

  console.log("🆔 Peer ID:", id);

});


export function initPeerEvents() {

  peer.on("call", call => {

    call.answer(state.myStream);

    call.on("stream", stream => {

      const name =
        state.users[call.peer]
        || "User";

      addVideo(
        stream,
        call.peer,
        name
      );

    });

    call.on("close", () => {

      removeVideo(call.peer);

    });

    state.peers[call.peer] = call;

  });

}