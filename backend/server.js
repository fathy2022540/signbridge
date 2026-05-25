// server.js

const cookieParser =
  require("cookie-parser");

require("dotenv").config();
const authMiddleware =
  require(
    "./middleware/authMiddleware"
  );

const express = require("express");

const path = require("path");

const {
  createProxyMiddleware
} = require("http-proxy-middleware");

const connectDB =
  require("./config/db");

const initSocket =
  require("./sockets/roomSocket");


const app = express();
// ─────────────────────────────
// DATABASE
// ─────────────────────────────
connectDB();
// ─────────────────────────────
// MIDDLEWARES
// ─────────────────────────────

app.use(express.json());

app.use(cookieParser());


// ─────────────────────────────
// API ROUTES
// ─────────────────────────────

app.use(
  "/api/auth",
  require("./routes/auth")
);


// ─────────────────────────────
// AI PROXY
// ─────────────────────────────

app.use(

  "/ai",

  createProxyMiddleware({

    target:
      "http://localhost:5001",

    changeOrigin: true,

    pathRewrite: {
      "^/ai": ""
    }

  })

);


// ─────────────────────────────
// FAVICON FIX
// ─────────────────────────────

app.get(

  "/favicon.ico",

  (req, res) => {

    res.status(204).end();

  }

);


// ─────────────────────────────
// STATIC FILES
// ─────────────────────────────

app.use(

  express.static(

    path.join(
      __dirname,
      "../frontend"
    ),

    {
      index: false
    }

  )

);


// ─────────────────────────────
// ROOT → LOGIN
// ─────────────────────────────

app.get("/", (req, res) => {

  res.redirect(
    301,
    "/login.html"
  );

});


// ─────────────────────────────
// LOGIN PAGE
// ─────────────────────────────

app.get(

  "/login.html",

  (req, res) => {

    res.sendFile(

      path.join(

        __dirname,

        "../frontend/pages/login.html"

      )

    );

  }

);


// ─────────────────────────────
// REGISTER PAGE
// ─────────────────────────────

app.get(

  "/register.html",

  (req, res) => {

    res.sendFile(

      path.join(

        __dirname,

        "../frontend/pages/register.html"

      )

    );

  }

);

// ─────────────────────────
// DASHBOARD PAGE
// ─────────────────────────

app.get(

  "/dashboard",

  authMiddleware,

  (req, res) => {

    res.sendFile(

      path.join(
        __dirname,
        "../frontend/pages/dashboard.html"
      )

    );

  }

);


// ─────────────────────────
// ROOM PAGE
// ─────────────────────────

app.get(

  "/room/:id",

  authMiddleware,

  (req, res) => {

    res.sendFile(

      path.join(
        __dirname,
        "../frontend/pages/room.html"
      )

    );

  }

);

// ─────────────────────────────
// START SERVER
// ─────────────────────────────

const PORT =
  process.env.PORT || 3000;

const server =
  app.listen(PORT, () => {

    console.log(
      `✅ Server running → http://localhost:${PORT}`
    );

    console.log(
      `🔐 Root "/" redirects to login page`
    );

  });


// ─────────────────────────────
// SOCKET.IO
// ─────────────────────────────

const io = require("socket.io")(server, {

  cors: {
    origin: "*"
  }

});


initSocket(io);