const jwt = require("jsonwebtoken");


module.exports = function (

  req,
  res,
  next

) {

  try {

    const token =
      req.cookies.token;

    if (!token) {

      return res.redirect(
        "/login.html"
      );

    }

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    return res.redirect(
      "/login.html"
    );

  }

};