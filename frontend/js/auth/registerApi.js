import { dom }
from "./registerDom.js";

import {
  showError
}
from "./registerSteps.js";

import {
  burstParticles
}
from "./registerAnimations.js";


export async function doRegister() {

  try {

    const res =
      await fetch(
        "/api/auth/register",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          credentials: "include",

          body: JSON.stringify({

            username:
              dom.username.value,

            email:
              dom.email.value,

            password:
              dom.password.value,

            voice:
              dom.voice.value

          })

        }
      );

    const data =
      await res.json();

    if (!res.ok) {

      showError(

        data.message ||

        "Registration failed"

      );

      return;

    }


    // save only user data
    localStorage.setItem(

      "user",

      JSON.stringify(data.user)

    );


    dom.panel3.classList.remove(
      "active"
    );

    dom.successScreen.classList.add(
      "show"
    );

    burstParticles();

    setTimeout(() => {

      location.href =
        "/dashboard";

    }, 2000);

  } catch (err) {

    console.error(err);

    showError(
      "Server error"
    );

  }

}