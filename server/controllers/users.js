var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = (function() {

    return {
        create: function(req, res) {
            // console.log('users - create');
            if (!req.body.username || !req.body.password || !req.body.email) {
                res.json({
                    success: false,
                    msg: "Please pass username, email and password"
                });
            } else {
                var newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    credit: req.body.credit
                });

                newUser.save(function(err) {
                    if (err) {
                        return res.json({
                            success: false,
                            msg: "email already exists."
                        });
                    } else {
                        // console.log('users - create - success');
                        // var session = req.session;
                        res.json({
                            success: true,
                            msg: "Successful created new " + req.body.username + ".",
                            user_email: req.body.email,
                            user_password: req.body.password
                        });
                    }
                });
            }
        }, // END create

        login: function(req, res) {
                // console.log('users - login');
                User.findOne({
                    email: req.body.email
                }, function(err, user) {
                    if (err) {
                        return res.json({
                            success: false,
                            msg: "email not found."
                        });
                    } else {
                        // console.log('users - login - success');
                        // var session = req.session;
                        res.json({
                            success: true,
                            msg: "Successful logged in " + req.body.username + ".",
                            username: user.username,
                            id: user._id
                        });
                    }
                });
            },

            getuser: function (req, res) {
              User.findOne({
                  _id: req.body.id
              }, function(err, user) {
                  if (err) {
                      return res.json({
                          success: false,
                          msg: "user not found."
                      });
                  } else {
                      res.json({
                          success: true,
                          userInfo: user
                      });
                  }
              });
            },
            addcredit: function (req, res) {
              User.findOneAndUpdate(
                {_id: req.body.purchase_user.id},
                {$inc: {"credit": req.body.purchase_amt.amount}},
                {upsert: true},
                function(err, user) {
                  if(err){
                    console.log(err);
                  }
                  else{
                    req.body.id = req.body.purchase_user.id; //hacky fix if we have time
                    module.exports.getuser(req, res);
                  }
                });
            }
    };

})();
