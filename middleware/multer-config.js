// Importation de multer qui gère les fichiers dl dans une requête HTTP
const multer = require("multer");

// Définition du format des images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Permet de dire où enregistrer les images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Dossier 'images' dans le back
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extention = MIME_TYPES[file.mimetype];
    if (extention) callback(null, name + Date.now() + "." + extention);
    else console.log("l'extention n est pas supportée");
  },
});

module.exports = multer({ storage }).single("image");
