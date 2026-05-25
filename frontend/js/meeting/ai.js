import { state }
from "./state.js";

import { dom }
from "./dom.js";

import {
  AI_SERVER,
  IS_LOCAL
}
from "./config.js";

import {
  playAudio
}
from "./audio.js";

import {
  showSubtitle
}
from "./ui.js";

import {
  socket
}
from "./socketInstance.js";


const CAPTURE_W = 640;
const CAPTURE_H = 480;

const canvas =
  document.createElement("canvas");

canvas.width = CAPTURE_W;
canvas.height = CAPTURE_H;

const ctx =
  canvas.getContext("2d");


export function getTTSSettings() {

  const rateVal =
    parseFloat(
      dom.ttsRate?.value || 0
    );

  const pitchVal =
    parseFloat(
      dom.ttsPitch?.value || 0
    );

  const voice =
    dom.ttsVoice?.value
    || "female";

  const rateSign =
    rateVal >= 0 ? "+" : "";

  const pitchSign =
    pitchVal >= 0 ? "+" : "";

  return {

    voice,

    rate:
      rateSign +
      (rateVal * 50).toFixed(0)
      + "%",

    pitch:
      pitchSign +
      (pitchVal * 50).toFixed(0)
      + "Hz",

    volume: "+0%"

  };

}


export function toggleAI() {

  state.aiEnabled =
    !state.aiEnabled;

  dom.aiBtn.className =
    state.aiEnabled
      ? "ai-on"
      : "ai-off";

  dom.aiBtn.innerText =
    state.aiEnabled
      ? "🤟 Sign ON"
      : "🤟 Sign OFF";

}


export function startAICapture(
  videoEl,
  containerDiv
) {

  // ─────────────────────────
  // AI ENABLE CHECK
  // ─────────────────────────

  if (!state.aiEnabled) {

    console.log(
      "🤖 AI disabled for this user"
    );

    return;

  }

  if (!IS_LOCAL) {

    console.log(
      "📱 AI disabled remotely"
    );

    return;

  }

  const badge =
    document.createElement("div");

  badge.id =
    "ai-status-badge";

  badge.innerText =
    "🤟 AI ready";

  containerDiv.appendChild(
    badge
  );

  let processingFrame = false;

  state.aiInterval = setInterval(async () => {

    if (!state.aiEnabled)
      return;

    if (!videoEl.videoWidth)
      return;

    if (processingFrame)
      return;

    processingFrame = true;

    ctx.drawImage(
      videoEl,
      0,
      0,
      CAPTURE_W,
      CAPTURE_H
    );

    const frame =
      canvas.toDataURL(
        "image/jpeg",
        0.85
      );

    try {

      const resp =
        await fetch(

          `${AI_SERVER}/process_frame`,

          {
            method: "POST",

            body: JSON.stringify({

              peerId:
                state.myPeerId,

              frame,

              ...getTTSSettings()

            })

          }

        );

      if (!resp.ok)
        return;

      const result =
        await resp.json();

      console.log(
        "AI RESULT:",
        result
      );

      if (
        result.text &&
        result.text !==
        state.lastSubtitle
      ) {

        state.lastSubtitle =
          result.text;

        socket.emit(
          "send-message",
          {
            peerId:
              state.myPeerId,

            text:
              result.text,

            audio:
              result.audio
          }
        );

      }

    } catch (e) {

      console.error(e);

    } finally {

      processingFrame = false;

    }

  }, 300);

}