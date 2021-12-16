const db = require("../models");
const dotenv = require("dotenv");

const User = db.user;
const Post = db.post;
const Comment = db.comment;

dotenv.config();

// Save User in the database

exports.create = (req, res) => {
  User.create(User)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new User.",
      });
    });
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
