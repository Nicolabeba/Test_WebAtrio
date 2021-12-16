const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY_TOKEN);

    const UserId = String(decodedToken.UserId);
    if (req.body.UserId && req.body.UserId !== UserId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "Requête non authentifiée !" });
  }
};
