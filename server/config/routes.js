var users = require("./../controllers/users.js");
var pools = require('./../controllers/pools');
var predictions = require('./../controllers/predictions');
var matches = require('./../controllers/matches');


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

    ///==================== pools controller =============
  app.get('/getpools', function(req, res) {
      pools.index(req, res);
  });

  app.post('/createpool', function(req, res) {
      pools.create(req, res);
  });

  ///==================== predictions controller =============
  app.get('/findpredictionsbypoolid', function(req, res) {
      predictions.findAllWithPoolId(req, res);
  });

  app.get('/findpredictionsbyuserid', function(req, res) {
      predictions.findAllWithUserlId(req, res);
  });

  app.post('/createprediction', function(req, res) {
      predictions.create(req, res);
  });

  ///==================== matches controller =============
  app.get('/getmatches', function(req, res) {
      matches.index(req, res);
  });

  app.post('/creatematch', function(req, res) {
      matches.create(req, res);
  });

  app.post('/updatematch', function(req, res) {
      matches.update(req, res);
  });
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
