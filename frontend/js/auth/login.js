import { dom }
from "./loginDom.js";

import {
  onType,
  sadReaction,
  happyReaction,
  burst
}
from "./loginAnimations.js";


function bindInputs() {

  dom.username?.addEventListener(
    "input",
    onType
  );

  dom.password?.addEventListener(
    "input",
    onType
  );

  dom.username?.addEventListener(
    "keydown",
    e => {

      if (e.key === "Enter") {

        doLogin();

      }

    }
  );

  dom.password?.addEventListener(
    "keydown",
    e => {

      if (e.key === "Enter") {

        doLogin();

      }

    }
  );

}


async function doLogin() {

  const email =
    dom.username.value.trim();

  const password =
    dom.password.value;

  dom.errorBox.style.display =
    "none";

  if (!email || !password) {

    dom.errorBox.innerText =
      "Please fill in all fields.";

    dom.errorBox.style.display =
      "block";

    return;

  }

  try {

    const res =
      await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password
          })

        }
      );

    const data =
      await res.json();

    console.log(data);

    if (!res.ok) {

      dom.errorBox.innerText =
        data.message ||
        "Invalid credentials";

      dom.errorBox.style.display =
        "block";

      dom.rightPanel.style.animation =
        "shake .4s ease";

      setTimeout(() => {

        dom.rightPanel.style.animation =
          "";

      }, 500);

      sadReaction();

      return;

    }


    // save only user data
    localStorage.setItem(

      "user",

      JSON.stringify(data.user)

    );


    happyReaction();

    burst();

    setTimeout(() => {

      location.href =
        "/dashboard";

    }, 2200);

  } catch (err) {

    console.error(err);

    dom.errorBox.innerText =
      "Server error. Please try again.";

    dom.errorBox.style.display =
      "block";

  }

}


function bindButtons() {

  dom.loginBtn?.addEventListener(
    "click",
    doLogin
  );

  dom.registerBtn?.addEventListener(
    "click",
    () => {

      location.href =
        "register.html";

    }
  );

}


function injectShakeAnimation() {

  const s =
    document.createElement("style");

  s.textContent = `
  @keyframes shake {

    0%,100%{
      transform:translateX(0)
    }

    20%{
      transform:translateX(-9px)
    }

    40%{
      transform:translateX(9px)
    }

    60%{
      transform:translateX(-5px)
    }

    80%{
      transform:translateX(5px)
    }

  }`;

  document.head.appendChild(s);

}


function init() {

  bindInputs();

  bindButtons();

  injectShakeAnimation();

  console.log(
    "✅ Login initialized"
  );

}


init();