const express = require("express");
const { log } = require("console");
const ejs = require("ejs");
var fs = require("fs");

const app = express();
const PORT = 3000;

app.set("views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    log(req.headers["content-type"])
    log(req.body)
    //write request to req.txt
    fs.writeFileSync("resume_data.json", JSON.stringify(req.body), "utf-8");
    // send json 200 ok
    res.status(200).json({ 
      message: "Resume data received",
      body: req.body
    });
  })
  .get((req, res) => {
    const resumeTemplate = fs.readFileSync(
      "views/templates/ats_resume.ejs",
      "utf8"
    );

    const resumeData = fs.readFileSync("resume_data.json", "utf8");
    // parse json to object
    const resumeDataObj = JSON.parse(resumeData);
    
    log(resumeDataObj)

    const renderedResume = ejs.render(resumeTemplate, resumeDataObj);
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
