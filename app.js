//jshint esversion:6

const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const ejs = require("ejs");
const key = require(__dirname + "/apikey.js")

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const url =
    key.config();

  https.get(url, function (response) {
   
    response.on("data", function (data) {
      const nasaData = JSON.parse(data);

      const imageURL = nasaData.hdurl;
      const date = nasaData.date;
      const title = nasaData.title;
      const explanation = nasaData.explanation;

      res.render("index", {
        imageURL: imageURL,
        date: date,
        title: title,
        explanation: explanation,
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000. ");
});
