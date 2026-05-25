import { state } from "./state.js";

import { dom }
from "./dom.js";


export function unlockAudio() {

  if (state.audioUnlocked)
    return;

  try {

    state.audioCtx =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    const buf =
      state.audioCtx.createBuffer(
        1,
        1,
        22050
      );

    const src =
      state.audioCtx
      .createBufferSource();

    src.buffer = buf;

    src.connect(
      state.audioCtx.destination
    );

    src.start(0);

    state.audioUnlocked = true;

    console.log("🔊 Audio unlocked");

  } catch (e) {

    console.error(e);

  }

}


export function initAudioUnlock() {

  document.addEventListener(
    "click",
    unlockAudio
  );

  document.addEventListener(
    "touchstart",
    unlockAudio
  );

}


export function playAudio(base64mp3) {

  if (!base64mp3) return;

  const vol =
    parseFloat(
      dom.ttsVol?.value || 1.0
    );

  if (state.audioCtx) {

    try {

      const binary =
        atob(base64mp3);

      const bytes =
        new Uint8Array(
          binary.length
        );

      for (
        let i = 0;
        i < binary.length;
        i++
      ) {

        bytes[i] =
          binary.charCodeAt(i);

      }

      state.audioCtx.decodeAudioData(

        bytes.buffer,

        buffer => {

          const gainNode =
            state.audioCtx.createGain();

          gainNode.gain.value =
            vol;

          gainNode.connect(
            state.audioCtx.destination
          );

          const src =
            state.audioCtx
            .createBufferSource();

          src.buffer = buffer;

          src.connect(gainNode);

          src.start(0);

        }

      );

      return;

    } catch (e) {

      console.error(e);

    }

  }

  try {

    const audio =
      new Audio(
        "data:audio/mp3;base64,"
        + base64mp3
      );

    audio.volume = vol;

    audio.play().catch(() => {});

  } catch (e) {

    console.error(e);

  }

}