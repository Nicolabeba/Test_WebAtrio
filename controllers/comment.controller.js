const db = require("../models");
const Post = db.post;
const Comment = db.comment;

// Création d'un commentaire
exports.createComment = (req, res) => {
  if (!req.body.comment.content) {
    res.status(400).send({
      message: "Comment can not be empty!",
    });
  }
  const comment = {
    ...req.body.comment,
    PostId: req.body.PostId,
    UserId: req.body.UserId,
  };

  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while commenting.",
      });
    });
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
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
        message: "Could not delete comment with id=" + id,
      });
    });
};
