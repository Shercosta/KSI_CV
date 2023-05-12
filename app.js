const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const { log } = require("console");
const ejs = require('ejs');
var fs = require("fs");
var formidable = require("formidable");

const app = express();
const PORT = 3000;


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
const sampleResumeData = require("./views/templates/sample_resume_data.js");

app.get('/resume', (req, res) => {
  const resumeTemplate = fs.readFileSync('views/templates/ats_resume.ejs', 'utf8');

  // Define your resume data object
  const resumeData = {
    //DATA YANG DIAMBIL DARI FORM DISINI
  };
  log(sampleResumeData)

  const renderedResume = ejs.render(resumeTemplate, sampleResumeData);
  res.send(renderedResume);
});


app.listen(PORT, () => {
  console.log("Server is on http://localhost:3000");
});
