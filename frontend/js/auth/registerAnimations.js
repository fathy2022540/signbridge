export function burstParticles() {

  const colors = [
    "#7ee8a2",
    "#63b3ed",
    "#f6e05e",
    "#fc8181"
  ];

  for (let i = 0; i < 20; i++) {

    const p =
      document.createElement("div");

    p.style.cssText = `
      position:fixed;
      width:8px;
      height:8px;
      border-radius:50%;
      background:${colors[i % colors.length]};
      left:${40 + Math.random()*20}vw;
      top:${40 + Math.random()*20}vh;
      pointer-events:none;
      z-index:999;
      animation: pf 1s ease-out forwards;
      --dx: translate(
        ${(Math.random()-.5)*400}px,
        ${(Math.random()-.5)*400}px
      );
    `;

    document.body.appendChild(p);

    setTimeout(() => {

      p.remove();

    }, 1200);

  }

}