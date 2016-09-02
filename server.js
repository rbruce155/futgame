var express = require("express");
var morgan = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(session);
var path = require("path");

require("./server/config/mongoose");
require("./server/config/passport")(passport);

var app = express();
var port = process.env.PORT || 8000;


app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/static")));
app.use(session({
	secret: "futgamesecret",
	saveUninitialized: true,
	cookie: {httpOnly: false},
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

var server = app.listen(8000, function(){
	console.log("Listening on port 8000");
});

var io = require("socket.io").listen(server);
var Match = mongoose.model('Match');

io.sockets.on("connection", function(socket){

	socket.on("live_matches", function(livematches){
		setInterval(timer, 10000);
		function timer(){
			Match.find({}, function(err, matches) {
	            if (err) {
	                io.emit("testing", null);
	            } else {
	                io.emit("testing", {matches});
	            }
	        });
	}
	})
});