$("#scrape").on("click", function(wows){
 $("tbody").empty();

  animals.forEach(function(wow) {
    $("tbody").append("<tr><th>" + wow.title + "</td>" +
                         "<th>" + wow.link + "</td></tr>" 
                         
  });
}

});


