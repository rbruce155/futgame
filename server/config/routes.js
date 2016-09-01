var users = require("./../controllers/users.js");
var pools = require('./../controllers/pools');
var predictions = require('./../controllers/predictions');
var matches = require('./../controllers/matches');


module.exports = function(app, passport) {

    ///==================== users routes =============
    app.post("/signup", function(req, res) {
        // console.log('signup route');
        users.create(req, res);
    });

    app.post("/login", passport.authenticate("local-login"), function(req, res) {
        // console.log('login route');
        users.login(req, res);
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.json('user has been logged out');
    });

    app.post("/getuser", function(req, res) {
        users.getuser(req, res);
    });

    app.post("/updatecredit", function (req, res) {
        users.updatecredit(req, res);
    });

    ///==================== pools routes =============
    app.get('/getpools', isLoggedIn, function(req, res) {
        pools.index(req, res);
        // console.log('/getpools');
    });

    app.post('/createpool', function(req, res) {
        pools.create(req, res);
    });

    ///==================== predictions routes =============
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
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({
            success: false
        });
    }
}
