const express = require("express");
const router = express.Router();

//  "auth" permet de sécuriser les routes
//const auth = require("../middleware/auth");
//const postOwner = require("../middleware/post-owner");

// Importation du "controller" concernant les "post"
const postCtrl = require("../controllers/post.controller");

// Router de la création du post
router.post("/post/create", postCtrl.createPost);
// Router de la modification du post
router.put("/post/:id", postCtrl.modifyPost);
// Router de la suppression du post
router.delete("/post/:id", postCtrl.deletePost);
// Router de l'accès à tous les posts
router.get("/post/all", postCtrl.getAllPost);
// Router de l'accès à un post
router.get("/post/:id", postCtrl.getOnePost);

module.exports = router;
