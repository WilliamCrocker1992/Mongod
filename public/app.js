$("#home").on("click", function(){
	app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./views/layouts/main.html"));
});
})