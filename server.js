var cheerio = require("cheerio");
var request = require("request");

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var path = require("path");

var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

mongoose.Promise = Promise;
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);

} else {
    mongoose.connect("mongodb://localhost/wowscraper", );
}



app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./views/layouts/main.html"));
});

app.get("/scrape", function(req, res) {
    res.sendFile(path.join(__dirname, "./views/index.html"));
    axios.get("http://www.reddit.com/r/WoW").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("p.title").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });

        });
    });
});
app.get("/saved", function(req, res) {
    res.sendFile(path.join(__dirname, "./views/layouts/saved.html"));
});





app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});