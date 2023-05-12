const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const { log } = require("console");
const ejs = require("ejs");
var fs = require("fs");
var formidable = require("formidable");

const app = express();
const PORT = 3000;

const Biodata = {
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String,
  summary: String,
  skills: Array,
  experience: Array,
};

const Skill = [];
const Experience = [];

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
    // const userBiodata = new Biodata({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   address: req.body.address,
    //   phone: req.body.phone,
    //   email: req.body.email,
    //   summary: req.body.summary,
    // });

    Biodata.firstName = req.body.firstName;
    Biodata.lastName = req.body.lastName;
    Biodata.address = req.body.address;
    Biodata.phone = req.body.phone;
    Biodata.email = req.body.email;
    Biodata.summary = req.body.summary;

    // const foto = new formidable.IncomingForm

    // const dataContent = JSON.stringify(dataJson);

    // console.log(data);
    const dataJson = JSON.stringify(Biodata);

    fs.writeFileSync("biodata.json", dataJson, "utf-8", (err) => {
      if (err) throw err;
      console.log("Done");
    });

    res.redirect("/skill");
  });

app
  .route("/skill")
  .get((req, res) => {
    res.render("skill");
  })
  .post((req, res) => {
    let data = require("./biodata.json");

    // console.log(data);

    Skill.unshift(req.body.skill);

    const select = req.body.skillOption;

    if (select == "more") {
      res.redirect("/skill");
    } else if (select == "next") {
      console.log(Skill);
      data.skill = Skill;

      console.log(data);

      const dataJson = JSON.stringify(data);

      fs.writeFileSync("biodata.json", dataJson, "utf-8", (err) => {
        if (err) throw err;
        console.log("Done");
      });
      res.redirect("/experience");
    }
  });

app
  .route("/experience")
  .get((req, res) => {
    res.render("experience");
  })
  .post((req, res) => {
    // untuk dapetin inputtan dari web experience.ejs nya
    // experience.ejs nya di modif aja kalo bisa langsung terstruktur persis kaya data di sampel,
    // pembentukan datanya baru sampe "skill", gw gkuat ini udh mau pagi
  });

const sampleResumeData = require("./views/templates/sample_resume_data.js");

app.get("/resume", (req, res) => {
  const resumeTemplate = fs.readFileSync(
    "views/templates/ats_resume.ejs",
    "utf8"
  );

  // Define your resume data object
  const resumeData = {
    //DATA YANG DIAMBIL DARI FORM DISINI
  };
  log(sampleResumeData);

  const renderedResume = ejs.render(resumeTemplate, sampleResumeData);
  res.send(renderedResume);
});

app.listen(PORT, () => {
  console.log("Server is on http://localhost:3000");
});
