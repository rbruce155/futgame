var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var UserSchema = new Schema({
	username: {type: String, require: true},
	password: {type: String, require: true},
	email: {type: String, require: true, unique: true},
	credit: {type: Number, default: 0},
	points: [{type: String}]
});

UserSchema.pre("save", function(next){
	var user = this;
	if(this.isModified("password") || this.isNew)
	{
		bcrypt.genSalt(10, function(err, salt){
			if(err)
			{
				return next(err);
			}
			else
			{
				bcrypt.hash(user.password, salt, function(err, hash){
					if(err)
					{
						return next(err);
					}
					else
					{
						user.password = hash;
						next();
					}
				});
			}
		});
	}
	else
	{
		return next();
	}
});

UserSchema.methods.comparePassword = function(passw){
	return bcrypt.compareSync(passw, this.password)
}

mongoose.model("User", UserSchema);
