var express = require("express");
var morgan = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(session);

require("./server/config/mongoose");
require("./server/config/passport")(passport);

var app = express();
var port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: "futgamesecret",
	saveUninitialized: true,
	resave: true,
	store: new MongoStore({
			mongooseConnection: mongoose.connection
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require("./server/config/routes");
routes(app, passport);

app.listen(8000, function(){
	console.log("Listening on port 8000");
})