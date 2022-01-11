const db = require("../models");
const dotenv = require("dotenv");

const User = db.user;
const Post = db.post;
const Comment = db.comment;

dotenv.config();

// Save User in the database

exports.create = (req, res) => {
  const user = {
    username: req.body.username,
  };
  User.create(user)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new User.",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // bcrypt
      //   .compare(req.body.password, user.password)
      //   .then((valid) => {
      //     if (!valid) {
      //       return res.status(401).json({ error: "Mot de passe incorrect !" });
      //     }
      //     res.status(200).json({
      //       UserId: user.id,
      //       first_name: user.first_name,
      //       last_name: user.last_name,
      //       admin: user.admin,
      //       token: jwt.sign(
      //         { UserId: user.id, admin: user.admin },
      //         process.env.AUTH_SECRET_KEY_TOKEN,
      //         {
      //           expiresIn: "24h",
      //         }
      //       ),
      //     });
      //   })
      //     .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Supprime le compte d'un utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { UserId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });

  Post.destroy({
    where: { UserId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete post with id=" + id,
      });
    });

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé !",
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'utilisateur ${req.body.name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
