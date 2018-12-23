require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var databaseUri = 'mongodb://localhost/mongo-news-combine-harvester-db';
if (process.env.MONGODB_URI) {
  mongoose.connect( MONGODB_URI, { useNewUrlParser: true });  
} else {
  mongoose.connect (databaseUri);  
}
// Connect to the Mongo DB
//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo-news-combine-harvester-db";
//mongoose.connect( MONGODB_URI, { useNewUrlParser: true });
//mongoose.connect("mongodb://localhost/mongo-news-combine-harvester-db", { useNewUrlParser: true });

// Routes
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
}); 
