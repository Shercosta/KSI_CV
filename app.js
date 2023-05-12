const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const { log } = require("console");

const app = express();

app.set("views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app
  .route("/")
  .get((req, res) => {
    res.render("home");
  })
  .post((req, res) => {
    const data = {
      Nama: req.body.Nama,
      Tentang: req.body.Tentang,
      Email: req.body.Email,
      Nomor: req.body.Nomor,
      Skill: req.body.Skill,
    };

    console.log(data);

    res.redirect("/browse");
  });

// app.route("/browse").get((req, res) => {
//   res.render()
// })

app.listen(3000, () => {
  console.log("Server is on http://localhost:3000");
});
