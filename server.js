// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");
    

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({
    extended: true
}));
 
var db = require("./models/index.js");

// ROUTES

app.get('/', function (req, res) {
   db.Post.find({}, function (err, posts) {
     console.log('posts: ', posts);
     	res.render('index', {posts: posts});

   });

app.get('/api/posts', function(req,res){
	res.json(posts);
});


// POST route

app.post('/api/posts', function(req, res){
	var newPost = req.body;
	console.log("new post in server", newPost);
	db.Post.create(newPost, function(err, post){
		if (err){ 
			console.log(err); 
		} 
		console.log("db response", post);
		res.json(post);
	});
});
   
 	// 	var posts = [
	// 	{body: "This is the first test post."},
	// 	{body: "This is the second test post."}
	// ];
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});  