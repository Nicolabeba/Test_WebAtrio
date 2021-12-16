const db = require("../models");
const Post = db.post;
const Comment = db.comment;

//créer un post
exports.createPost = (req, res, next) => {
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.UserId || !req.body.first_name || !req.body.last_name) {
    res.status(400).send({
      message: "Missing fields in request",
    });
    return;
  }

  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  } else image = "";

  const post = {
    UserId: req.body.UserId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    content: req.body.content,
    image: image,
  };

  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while posting.",
      });
    });
};

// Accès à tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: Comment,
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Accès à un post
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id, {
    include: Comment,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error }));
};

//Modifier un post
exports.modifyPost = async (req, res) => {
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const id = req.params.id;
  let result = [];
  try {
    result = await Post.update(
      { content: req.body.content },
      {
        where: { id: id },
      }
    );
  } catch (err) {
    res.status(500).send({
      message: "Error updating Post with id=" + id,
    });
  }

  if (result[0] === 1) {
    res.status(200).send({
      message: "Post was updated successfully.",
    });
  } else {
    res.status(400).send({
      message: `Cannot update Post with id=${id}.`,
    });
  }
};

// Supprimer un post
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { PostId: id },
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
    where: { id: id },
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
};
