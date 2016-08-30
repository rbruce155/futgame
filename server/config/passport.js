var mongoose = require("mongoose");
var LocalStrategy = require("passport-local").Strategy;

var User = mongoose.model("User");

module.exports = function(passport)
{
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});

	passport.use("local-signup", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	},
	function(req, email, password, callback){
		process.nextTick(function(){
			User.findOne({"email": email}, function(err, user){
				if(err)
				{
					return callback(err, false);
				}
				if(user)
				{
					return callback(null, false, req.flash("signupMessage", "That email already taken"));
				}
				else
				{
					var newUser = new User({
						username: req.body.username,
						password: password,
						email: email,
						credit: req.body.credit
					});

					newUser.save(function(err){
						if(err)
						{
							throw err;
						}
						else
						{
							return callback(null, newUser);
						}
					})
				}
			})
		});
	}));

	passport.use("local-login", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	},
	function(req, email, password, callback){
		process.nextTick(function(){
			User.findOne({"email": email}, function(err, user){
				if(err)
				{
					return callback(err, false);
				}
				if(!user)
				{
					return callback(null, false, req.flash("loginmessage", "No User found"));
				}
				if(!user.comparePassword(password))
				{
					return callback(null, false, req.flash("loginMessage", "invalid password"))
				}
				return callback(null, user);
			})
		})
	}))
}