import "./config.js";

import { state }
from "./state.js";

import {
  startSpeechRecognition
}
from "./speech.js";

import { dom }
from "./dom.js";

import {
  initMedia
} from "./media.js";

import {
  initAudioUnlock
} from "./audio.js";

import {
  joinRoom
} from "./room.js";

import {
  initPeerEvents
} from "./peer.js";

import {
  initSocketEvents
} from "./socket.js";

import {
  bindControls
} from "./controls.js";


// ─────────────────────────
// INIT APP
// ─────────────────────────

async function initApp() {

  // check auth
  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  if (!user) {

    window.location.href =
      "/login.html";

    return;

  }
  // ─────────────────────────
  // AI MODE
  // ─────────────────────────

  state.aiEnabled =

    localStorage.getItem(
      "aiEnabled"
    ) === "true";

  console.log(
    "AI ENABLED:",
    state.aiEnabled
  );

  // unlock browser audio
  initAudioUnlock();

  // init camera + mic
  await initMedia();
  const loadingText =

    document.getElementById(
      "loadingText"
    );

  if (loadingText) {

    loadingText.innerText =
      "Joining room...";

  }

  // peer listeners
  initPeerEvents();

  // socket listeners
  initSocketEvents();

  // controls
  bindControls();
  // ─────────────────────────
  // HIDE AI UI FOR NORMAL USERS
  // ─────────────────────────

  if (!state.aiEnabled) {

    const aiBtn =

      document.getElementById(
        "aiBtn"
      );

    const ttsControls =

      document.getElementById(
        "tts-controls"
      );

    if (aiBtn) {

      aiBtn.style.display =
        "none";

    }

    if (ttsControls) {

      ttsControls.style.display =
        "none";

    }

  }
  setTimeout(() => {

    const loading =

      document.getElementById(
        "loadingScreen"
      );

    if (loading) {

      loading.classList.add(
        "hidden"
      );

    }

  }, 1200);
  
  // speech recognition
  startSpeechRecognition();

  console.log(
    "✅ App initialized"
  );

}


// ─────────────────────────
// AUTO JOIN ROOM
// ─────────────────────────

window.addEventListener(
  "load",
  async () => {

    await initApp();

    setTimeout(() => {

      joinRoom();

    }, 1200);

  }
);