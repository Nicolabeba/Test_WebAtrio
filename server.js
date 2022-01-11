const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
// const commentRoutes = require("./routes/comment.routes");
const bodyParsers = require("body-parser");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParsers.json());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

db.sequelize.sync();
// ({ force: true })
// .then(() => {
//   console.log("Drop and re-sync db.");
// })
// .catch((err) => {
//   console.log(err);
// });

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/api", userRoutes);
app.use("/api", postRoutes);
// app.use("/api", commentRoutes);
