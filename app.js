//jshint esversion:6

const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=JE1SJzTxk173i6H23FBeghGUD2yHWjB7mryPubcE";

  https.get(url, function (response) {
    console.log(response.statusCode);
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
