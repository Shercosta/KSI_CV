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
  .route("/resume")
  .post((req, res) => {
    const resumeData = req.body;
    //FIXME: resumeData is empty
    log(req.body)
    fs.writeFileSync("resume_data.json", JSON.stringify(resumeData), "utf-8");
    // send json 200 ok
    res.status(200).json({ message: "Resume data received" });
  })
  .get((req, res) => {
    const resumeTemplate = fs.readFileSync(
      "views/templates/ats_resume.ejs",
      "utf8"
    );

    // read resume data from json file
    const resumeData = fs.readFileSync("resume_data.json", "utf8");
    log(resumeData);

    const renderedResume = ejs.render(resumeTemplate, resumeData);
    res.send(renderedResume);
  });

app
  .route("/forms")
  .get((req, res) => {
    res.render("forms");
  })

app.listen(PORT, () => {
  console.log("Server is on http://localhost:3000");
});
