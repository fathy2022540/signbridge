import { dom }
from "./registerDom.js";


export let currentStep = 1;

const totalSteps = 3;


export function showError(msg) {

  dom.errorBox.innerText = msg;

  dom.errorBox.style.display =
    "block";

}


function updateProgress() {

  dom.progressFill.style.width =
    (
      currentStep /
      totalSteps
    ) * 100 + "%";

}


export function nextStep(step) {

  dom.errorBox.style.display =
    "none";

  [
    dom.panel1,
    dom.panel2,
    dom.panel3
  ].forEach(panel => {

    panel.classList.remove(
      "active"
    );

  });

  [
    dom.step1,
    dom.step2,
    dom.step3
  ].forEach(stepEl => {

    stepEl.classList.remove(
      "active"
    );

  });

  currentStep = step;

  dom["panel" + step]
    .classList.add("active");

  dom["step" + step]
    .classList.add("active");

  updateProgress();

}