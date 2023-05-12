const express = require("express");
const bodyParser = require("body-parser");
const exp = require("constants");
const { log } = require("console");

const app = express();

app.set("views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server is on http://localhost:3000");
});
