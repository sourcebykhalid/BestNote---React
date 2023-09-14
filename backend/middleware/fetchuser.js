const jwt = require("jsonwebtoken");
const JWT_SECRET = "This password is protected";
const fetchuser = (req, res, next) => {
  // Get the user from auth token and add it to the req object
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate with using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res
      .status(401)
      .send({ error: "Please authenticate with using a valid token" });
  }
};
module.exports = fetchuser;
