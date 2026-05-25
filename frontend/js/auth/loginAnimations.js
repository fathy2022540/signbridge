import { dom } from "./loginDom.js";


export function onType() {

  if (!dom.mouth)
    return;

  dom.mouth.setAttribute(
    "d",
    "M112 170 Q130 166 148 170"
  );

  clearTimeout(window._mt);

  window._mt = setTimeout(() => {

    if (!dom.mouth)
      return;

    dom.mouth.setAttribute(
      "d",
      "M112 172 Q130 164 148 172"
    );

  }, 800);

}


export function sadReaction() {

  if (!dom.avatar)
    return;

  dom.avatar.style.transform =
    "translateX(-6px)";

  setTimeout(() => {

    if (!dom.avatar)
      return;

    dom.avatar.style.transform =
      "translateX(0)";

  }, 400);

}


export function happyReaction() {

  if (dom.tear)
    dom.tear.style.opacity = "0";

  if (dom.soundWave)
    dom.soundWave.style.opacity = "1";

  if (dom.happyBg)
    dom.happyBg.classList.add(
      "active"
    );

  if (dom.chip) {

    dom.chip.classList.add(
      "live"
    );

    dom.chip.innerText =
      "🤟 Welcome! ♥️✨";

  }

  if (dom.browL) {

    dom.browL.setAttribute(
      "d",
      "M92 106 Q105 98 118 102"
    );

  }

  if (dom.browR) {

    dom.browR.setAttribute(
      "d",
      "M142 102 Q155 98 168 106"
    );

  }

  if (dom.mouth) {

    dom.mouth.setAttribute(
      "d",
      "M108 168 Q130 194 152 168"
    );

  }

  if (dom.handL) {

    dom.handL.style.transform =
      "translateY(-14px) rotate(-8deg)";

  }

  if (dom.handR) {

    dom.handR.style.transform =
      "translateY(-24px) rotate(12deg)";

  }

  if (dom.stars)
    dom.stars.style.opacity = "1";

  if (dom.avatar) {

    dom.avatar.classList.add(
      "bounce"
    );

    setTimeout(() => {

      if (!dom.avatar)
        return;

      dom.avatar.classList.remove(
        "bounce"
      );

    }, 700);

  }

}


export function burst() {

  [
    "#63b3ed",
    "#7ee8a2",
    "#f6e05e",
    "#fc8181",
    "#b794f4",
    "#FFA07A"
  ].forEach(c => {

    for (let i = 0; i < 6; i++) {

      const d =
        document.createElement("div");

      d.className = "pt";

      d.style.cssText = `
      width:${6 + Math.random() * 6}px;
      height:${6 + Math.random() * 6}px;
      background:${c};
      left:${15 + Math.random() * 70}vw;
      top:${15 + Math.random() * 70}vh;
      --d:translate(
      ${(Math.random() - .5) * 400}px,
      ${(Math.random() - .5) * 400}px);
      animation-duration:${.5 + Math.random() * 1.1}s;
      `;

      document.body.appendChild(d);

      setTimeout(() => {

        d.remove();

      }, 1700);

    }

  });

}