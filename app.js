require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mongoose = require("mongoose");


const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));



mongoose.connect(process.env.MONGODBCONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = {
  url: String,
  shortUrl: String,
};

const Url = mongoose.model("Url", urlSchema);


app.get("/", function (req, res) {
  Url.find({}, function(err, foundUrl){
    res.render("index",{receivedUrl:foundUrl});
  });
});


app.post("/", function (req, res) {
    const originalUrl = req.body.newUrl;
    const url = "https://api-ssl.bitly.com/v4/shorten";
    const jsonData = JSON.stringify({ "long_url": originalUrl, "domain": "bit.ly",});
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.BITLY
      },
    };
    const request =  https.request(url, options, function (response) {
      response.on("data", function (data) {
        const shorterLink = JSON.parse(data).link;
        const nUrl = new Url ({
          url: originalUrl,
          shortUrl: shorterLink,
        });
        nUrl.save();
      });
      res.redirect("/");
    });
    request.write(jsonData);
    request.end();
  });
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }

app.listen(port, function () {
  console.log("Server has started successfully.");
});
