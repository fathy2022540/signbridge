import { socket }
from "./socketInstance.js";

import { state }
from "./state.js";


let recognition = null;

let isRestarting = false;

let lastTranscript = "";

let lastSentAt = 0;


// ─────────────────────────
// START SPEECH RECOGNITION
// ─────────────────────────

export function startSpeechRecognition() {

  // deaf users already use AI
  if (state.aiEnabled)
    return;

  const SpeechRecognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    console.log(
      "❌ Speech recognition unsupported"
    );

    return;

  }

  recognition =
    new SpeechRecognition();

  recognition.lang = "ar-EG";

  recognition.continuous = true;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;


  // ─────────────────────────
  // RESULTS
  // ─────────────────────────

  recognition.onresult = e => {

    const transcript =

      e.results[
        e.results.length - 1
      ][0].transcript
        .trim();


    // ignore tiny text
    if (
      !transcript ||
      transcript.length < 2
    ) return;


    // prevent duplicates
    if (
      transcript ===
      lastTranscript
    ) return;


    // debounce
    const now = Date.now();

    if (
      now - lastSentAt < 1200
    ) return;


    lastTranscript =
      transcript;

    lastSentAt =
      now;


    console.log(
      "🎤 SPEECH:",
      transcript
    );

    socket.emit(
      "send-message",
      {
        peerId:
          state.myPeerId,

        text:
          transcript
      }
    );

  };


  // ─────────────────────────
  // ERRORS
  // ─────────────────────────

  recognition.onerror = err => {

    if (
      err.error !== "no-speech" &&
      err.error !== "network"
    ) {

      console.log(
        "🎤 Speech Error:",
        err
      );

    }

  };


  // ─────────────────────────
  // AUTO RESTART
  // ─────────────────────────

  recognition.onend = () => {

    if (isRestarting)
      return;

    isRestarting = true;

    setTimeout(() => {

      try {

        recognition.start();

      } catch (e) {

        console.log(e);

      }

      isRestarting = false;

    }, 1000);

  };


  // ─────────────────────────
  // START
  // ─────────────────────────

  try {

    recognition.start();

    console.log(
      "🎤 Speech recognition started"
    );

  } catch (e) {

    console.log(e);

  }

}