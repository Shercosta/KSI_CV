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
  .route("/resume")
  .post((req, res) => {
    log(req.headers["content-type"]);
    log(req.body);
    //write request to req.txt
    fs.writeFileSync("resume_data.json", JSON.stringify(req.body), "utf-8");
    // send json 200 ok
    res.status(200).json({
      message: "Resume data received",
      body: req.body,
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

    log(resumeDataObj);

    const renderedResume = ejs.render(resumeTemplate, resumeDataObj);
    res.send(renderedResume);
  });

app.route("/").get((req, res) => {
  res.render("forms");
});

app.listen(PORT, () => {
  console.log("Server is on http://localhost:3000");
});
