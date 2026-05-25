import { dom } from "./dom.js";

import {
  showSubtitle
} from "./subtitles.js";

import {
  startAICapture
} from "./ai.js";


export function addVideo(
  stream,
  id,
  username,
  mute = false
) {

  if (document.getElementById(id))
    return;

  const div =
    document.createElement("div");

  div.className =
    "video-container";

  div.id = id;

  const video =
    document.createElement("video");

  video.srcObject = stream;

  video.autoplay = true;

  video.playsInline = true;

  video.muted = !!mute;

  setTimeout(() => {

    video.play().catch(() => {});

  }, 300);

  const name =
    document.createElement("div");

  name.className =
    "username-label";

  name.innerText = username;

  div.appendChild(video);

  div.appendChild(name);

  dom.videoGrid.appendChild(div);

  const empty = document.getElementById("emptyState");

  if (empty) {empty.style.display = "none";}


  // START AI FOR LOCAL USER
  if (id === "me") {

    startAICapture(
      video,
      div
    );

  }

}


export function removeVideo(id) {

  const el =
    document.getElementById(id);

  if (el) {

    el.remove();

  }

}


export {
  showSubtitle
};