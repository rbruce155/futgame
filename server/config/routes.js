var users = require("./../controllers/users.js");
var pools = require('./../controllers/pools');
var predictions = require('./../controllers/predictions');
var matches = require('./../controllers/matches');


module.exports = function(app, passport)
{

    app.post("/signup", function(req, res){
        users.create(req, res);
    });

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/getpools",
    }));

    app.get("/logout", function (req, res) {
        req.logout();
        res.json('user has been logged out');
    });

    ///==================== pools controller =============
  app.get('/getpools', isLoggedIn, function(req, res) {
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
    res.json(false);
  }
}
