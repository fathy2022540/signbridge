import { dom }
from "./registerDom.js";

import {
  bindValidation
}
from "./registerValidation.js";

import {
  nextStep
}
from "./registerSteps.js";

import {
  doRegister
}
from "./registerApi.js";


function bindButtons() {

  dom.toStep2Btn?.addEventListener(
    "click",
    () => nextStep(2)
  );

  dom.backStep1Btn?.addEventListener(
    "click",
    () => nextStep(1)
  );

  dom.toStep3Btn?.addEventListener(
    "click",
    () => nextStep(3)
  );

  dom.backStep2Btn?.addEventListener(
    "click",
    () => nextStep(2)
  );

  dom.registerBtn?.addEventListener(
    "click",
    doRegister
  );

  dom.goLoginBtn?.addEventListener(
    "click",
    () => {

      location.href =
        "/login.html";

    }
  );

}


function init() {

  bindValidation();

  bindButtons();

  console.log(
    "✅ Register initialized"
  );

}


init();