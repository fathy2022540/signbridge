const createBtn =
  document.getElementById(
    "createRoomBtn"
  );

const joinBtn =
  document.getElementById(
    "joinRoomBtn"
  );

const aiToggle =
  document.getElementById(
    "aiToggle"
  );

const roomInput =
  document.getElementById(
    "roomIdInput"
  );

const logoutBtn =

  document.getElementById(
    "logoutBtn"
  );


// ─────────────────────────
// CREATE ROOM
// ─────────────────────────

createBtn.onclick = () => {

  const roomId =
    Math.random()
      .toString(36)
      .substring(2, 8);

  localStorage.setItem(
    "aiEnabled",
    aiToggle.checked
  );

  window.location.href =

    `/room/${roomId}`;

};


// ─────────────────────────
// JOIN ROOM
// ─────────────────────────

joinBtn.onclick = () => {

  const roomId =
    roomInput.value.trim();

  if (!roomId)
    return;

  localStorage.setItem(
    "aiEnabled",
    aiToggle.checked
  );

  window.location.href =

    `/room/${roomId}`;

};


// ─────────────────────────
// LOGOUT
// ─────────────────────────

logoutBtn.onclick = async () => {

  try {

    await fetch(

      "/api/auth/logout",

      {
        method: "POST"
      }

    );

  } catch (err) {

    console.log(err);

  }

  localStorage.removeItem(
    "user"
  );

  localStorage.removeItem(
    "aiEnabled"
  );

  window.location.href =
    "/login.html";

};


// ─────────────────────────
// ENTER KEY SUPPORT
// ─────────────────────────

roomInput.addEventListener(
  "keydown",
  e => {

    if (e.key === "Enter") {

      joinBtn.click();

    }

  }
);