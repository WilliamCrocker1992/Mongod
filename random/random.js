request("https://www.reddit.com/r/WoW", function(error, response, html) {
  var $ = cheerio.load(html);
  var results = [];
  $("p.title").each(function(i, element) {
    var title = $(element).text();
    var link = $(element).children().attr("href");
    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});
