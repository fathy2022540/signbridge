export function showSubtitle(container, text) {

  let sub =
    container.querySelector(".subtitle");

  if (!sub) {

    sub = document.createElement("div");

    sub.className = "subtitle";

    container.appendChild(sub);

  }

  sub.innerText = text;

  sub.style.opacity = "1";

  clearTimeout(sub._fadeTimer);

  sub._fadeTimer = setTimeout(() => {

    sub.style.opacity = "0";

  }, 4000);

}