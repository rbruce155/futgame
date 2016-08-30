var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = function(app, passport)
{
    app.get('/', function(req, res){
      res.send("Good Signup or login");
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.get('/signup', function(req, res){
      res.send("error Signup");
    });

    app.post("/login", passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    }))

    app.get("/login", function(req, res){
      res.send("error login");
    });
}