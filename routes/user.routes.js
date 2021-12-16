const express = require("express");
const router = express.Router();
const db = require("../models");
const userCtrl = require("../controllers/user.controller");
//const auth = require("../middleware/auth");
// Router de l'inscription
router.post("/create", userCtrl.create);
// Router de la connexion
router.post("/login", userCtrl.login);
// Router de la suppression
router.delete("/delete/:id", userCtrl.delete);
//Router de la modification de l'utilisateur (à implémenter)
//router.put("/user/:id", auth, userCtrl.delete);

module.exports = router;
