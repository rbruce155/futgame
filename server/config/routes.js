var mongoose = require("mongoose");
var User = mongoose.model("User");
var users = require("./../controllers/users.js");

module.exports = function(app, passport)
{
    app.get('/', function(req, res){
      res.send("Good Signup or login");
    });

    app.post("/signup", function(req, res){
        users.create(req, res);
    });

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/dashboard",
    }));

    app.get("/dashboard", isLoggedIn, function(req, res){
        res.json({success: true, msg: "user login"});
    })
}

function isLoggedIn(req, res, next)
{
  if(req.isAuthenticated()){
    return next();
  }
  else
  {
    res.json({success: false, msg: "you are not login"});
  }
}