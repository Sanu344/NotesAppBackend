const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.body.token;

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Session Please login");
  }
}

module.exports = auth;
