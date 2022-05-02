const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Not athurize" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.json({ error: "Invalid Token" });
    }

    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not athurize" });
  }
  try {
  } catch (error) {}
};
