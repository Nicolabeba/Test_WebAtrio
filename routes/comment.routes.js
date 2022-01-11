const express = require("express");
const router = express.Router();

//Important de "auth" qui permet de sécuriser les routes
//const auth = require("../middleware/auth");

//Importation du "controller" concernant les "commentaires"
const commentCtrl = require("../controllers/comment.controller");
// middleware d'authentification du user effectuant le comment avec celui du Token
// const commentOwner = require("../middleware/comment-owner");

//création d'un commentaire
router.post("/comment/:id", commentCtrl.createComment);

//recupération du comment
router.get("/comment/:id/comment", commentCtrl.getAllComments);

//suppression d'un commentaire
router.delete("/delete_comment/:id", commentCtrl.deleteComment);

module.exports = router;
