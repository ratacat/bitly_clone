var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");
var app = express();
var redirects = [];

app.use(bodyparser.urlencoded({extended: true}));
var viewsDir = path.join(process.cwd(),"views");

app.get("/",function(req,res) {
	res.sendFile(path.join(viewsDir,"/input.html"));
});

app.get("/yourlink", function(req,res) {
	res.send("your link is: " + redirects[req.query.index]);
	//console.log(req.query);
});

app.get("/redirect/:index") {
	res.redirect(redirects[req.params.index]);
}

app.post("/submit",function(req,res) {
	//console.log(req.body.redirect.url);
	var i = redirects.push(req.body.redirect.url) -1;
	res.redirect("/yourlink?index="+i);
});

app.listen(3000);

//add data about redirector to array
//process incoming requests as redirects


// We had to require express, then require path to build the
// directory.  We set a variable viewsDir to 
// process.cwd + "views" folder.

// We set app.get for the root route, and then app.post for 
// /submit.

// The form took an ACTION="/submit" property and a method="POST"
// inside the form we needed an input, type text, with name =
// redirector[url].  THe redirector becomes the name of the object
// and url is the property where the url is stored.

// Net we did an npm install --save body-parser so that we can actually
// parse the body of the http req. near the top we set app.use 
// (bodyparser.urlencoded({extended: true})); To modify the way the 
// information is stored.  

// We made app.listen(3000) down near the bottom so express knows which 
// port to listen on.

// last we created a new route with app.post('/submit') to receive
// the url upon submission, and we are accessing it within req.body
