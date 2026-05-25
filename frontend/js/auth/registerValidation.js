import { dom }
from "./registerDom.js";


export function checkUsername() {

  const value =
    dom.username.value.trim();

  if (value.length < 3) {

    dom.userHint.className =
      "field-hint";

    dom.userHint.innerText =
      "Minimum 3 characters";

    dom.username.className =
      "";

    return false;

  }

  dom.userHint.className =
    "field-hint success";

  dom.userHint.innerText =
    "✓ Looks good";

  dom.username.className =
    "valid";

  return true;

}


export function checkStrength() {

  const value =
    dom.password.value;

  let score = 0;

  if (value.length >= 8)
    score++;

  if (/[A-Z]/.test(value))
    score++;

  if (/[0-9]/.test(value))
    score++;

  if (/[^A-Za-z0-9]/.test(value))
    score++;

  const labels = [
    "",
    "weak",
    "weak",
    "medium",
    "strong"
  ];

  for (let i = 1; i <= 4; i++) {

    const seg =
      dom["seg" + i];

    seg.className =
      "strength-seg" +
      (
        i <= score
        ? " " + labels[score]
        : ""
      );

  }

}


export function checkMatch() {

  const pass =
    dom.password.value;

  const confirm =
    dom.confirmPassword.value;

  if (!confirm)
    return;

  if (pass === confirm) {

    dom.matchHint.className =
      "field-hint success";

    dom.matchHint.innerText =
      "✓ Passwords match";

  } else {

    dom.matchHint.className =
      "field-hint error";

    dom.matchHint.innerText =
      "✗ Does not match";

  }

}


export function bindValidation() {

  dom.username?.addEventListener(
    "input",
    checkUsername
  );

  dom.password?.addEventListener(
    "input",
    checkStrength
  );

  dom.confirmPassword?.addEventListener(
    "input",
    checkMatch
  );

}