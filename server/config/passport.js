var mongoose = require("mongoose");
var LocalStrategy = require("passport-local").Strategy;

var User = mongoose.model("User");

module.exports = function(passport)
{
	passport.serializeUser(function(user, callback){
		var sessionUser = {_id: user._id, name: user.username };
		callback(null, sessionUser);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});

	passport.use("local-login", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
	},
	function(email, password, callback){
		process.nextTick(function(){
			User.findOne({"email": email}, function(err, user){
				if(err)
				{
					return callback(err, false);
				}
				if(!user)
				{
					return callback("Not user found.", false);
				}
				if(!user.comparePassword(password))
				{
					return callback("Incorrect password.", false);
				}
				return callback(null, user);
			});
		});
	}));
}
