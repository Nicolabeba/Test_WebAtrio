const db = require("../models");
const Post = db.post;
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY_TOKEN);

  if (decodedToken.admin === true) return next();

  const id = req.params.id;
  Post.findByPk(id, { where: { UserId: req.body.UserId } })
    .then((post) => {
      if (post.UserId !== decodedToken.UserId) {
        throw "invalid user";
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
