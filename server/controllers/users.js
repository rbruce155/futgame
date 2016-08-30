var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = (function(){

	return {

		create: function(req, res)
		{
			if(!req.body.username || !req.body.password || !req.body.email)
			{
				res.json({success: false, msg: "Please pass username, email and password"});
			}
			else
			{
				var newUser = new User({
						username: req.body.username,
						password: req.body.password,
						email: req.body.email,
						credit: req.body.credit
					});

					newUser.save(function(err){
						if(err)
						{
							return res.json({success: false, msg: "email already exists."});
						}
						else
						{
							res.json({success: true, msg: "Successful created new " + req.body.username + "."});
						}
					})
			}
		}
	}

})()