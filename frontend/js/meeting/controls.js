import { dom } from "./dom.js";

import {
  toggleMic,
  toggleCamera
} from "./media.js";

import {
  copyLink,
  leaveCall
} from "./room.js";

import {
  toggleAI
} from "./ai.js";


export function bindControls() {

  dom.aiBtn?.addEventListener(
    "click",
    toggleAI
  );

  dom.micBtn?.addEventListener(
    "click",
    toggleMic
  );

  dom.camBtn?.addEventListener(
    "click",
    toggleCamera
  );

  dom.copyBtn?.addEventListener(
    "click",
    copyLink
  );

  dom.leaveBtn?.addEventListener(
    "click",
    leaveCall
  );

}