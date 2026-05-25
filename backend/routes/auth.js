const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ─────────────────────────
// REGISTER
// ─────────────────────────

router.post("/register", async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      voice
    } = req.body;


    // check existing
    const existingUser = await User.findOne({

      $or: [
        { email },
        { username }
      ]

    });


    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists"

      });

    }


    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // create user
    const user = await User.create({

      username,
      email,

      password:
        hashedPassword,

      voice

    });


    // token
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // cookie
    res.cookie(

      "token",

      token,

      {

        httpOnly: true,

        secure: false,

        sameSite: "lax",

        maxAge:
          7 * 24 * 60 * 60 * 1000

      }

    );


    res.status(201).json({

      user: {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

        voice:
          user.voice

      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server Error"

    });

  }

});


// ─────────────────────────
// LOGIN
// ─────────────────────────

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    const user =
      await User.findOne({
        email
      });


    if (!user) {

      return res.status(400).json({

        message:
          "Invalid credentials"

      });

    }


    const isMatch =
      await bcrypt.compare(

        password,
        user.password

      );


    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials"

      });

    }


    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // cookie
    res.cookie(

      "token",

      token,

      {

        httpOnly: true,

        secure: false,

        sameSite: "lax",

        maxAge:
          7 * 24 * 60 * 60 * 1000

      }

    );


    res.json({

      user: {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

        voice:
          user.voice

      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server Error"

    });

  }

});


// ─────────────────────────
// LOGOUT
// ─────────────────────────

router.post(

  "/logout",

  (req, res) => {

    res.clearCookie(
      "token"
    );

    res.json({

      message:
        "Logged out"

    });

  }

);


module.exports = router;