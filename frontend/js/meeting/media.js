import { state } from "./state.js";

export async function initMedia() {

  try {

    const stream =
      await navigator.mediaDevices.getUserMedia({

        video: true,

        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }

      });

    state.myStream = stream;

    console.log("✅ Media ready");

  } catch (err) {

    console.error("❌ Media error:", err);

  }

}

export function toggleMic() {

  const track =
    state.myStream
    ?.getAudioTracks()?.[0];

  if (!track) return;

  track.enabled = !track.enabled;

  return track.enabled;
}

export function toggleCamera() {

  const track =
    state.myStream
    ?.getVideoTracks()?.[0];

  if (!track) return;

  track.enabled = !track.enabled;

  return track.enabled;
}