const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const { log } = require("console");

const app = express();

var fs = require("fs");
var formidable = require("formidable");

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

    const dataArray = [
      data.Nama,
      data.Tentang,
      data.Email,
      data.Nomor,
      data.Skill,
    ];

    // const foto = new formidable.IncomingForm

    const dataJson = JSON.stringify(data);
    // const dataContent = JSON.stringify(dataJson);

    // console.log(data);

    fs.appendFileSync("biodata.json", dataJson, "utf-8", (err) => {
      if (err) throw err;
      console.log("Done");
    });

    res.redirect("/");
  });

// app.route("/browse").get((req, res) => {
//   res.render()
// })

app.listen(3000, () => {
  console.log("Server is on http://localhost:3000");
});
