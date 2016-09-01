var mongoose = require('mongoose');
var Prediction = mongoose.model('Prediction');
var Pool = mongoose.model('Pool');
var User = mongoose.model('User');

module.exports = {
    findAllWithPoolId: function(req, res) {
        Prediction.find({
            _preditcionPool: req.body.poolId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    predictionsByPool: predictionsByPool
                });
            }
        });
    }, //END findAllWithPoolId

    findAllWithUserlId: function(req, res) {
        Prediction.find({
            _preditcionUser: req.body.userId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    predictionsByUser: predictionsByUser
                });
            }
        });
    }, //END findAllWithUserlId

    create: function(req, res) {
        //Instantiate new Pool object and poulate with initial data
        var newPrediction = new Prediction();
        newPrediction._predictionPool = req.body.poolId;
        newPrediction._predictionUser = req.body.userId;
        newPrediction.predictions = req.body.predictions;
        newPrediction.predictionPay = true;
        // Save to db
        newPrediction.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                Pool.findByIdAndUpdate(req.body.poolId, {$push: {"poolPredictions": req.body.poolId, "_poolUsers": req.body.userId}}, 
                    {save: true, upsert: true}, function(err, pool){

                    if(err)
                    {
                        res.json({
                            success: false,
                            msg: err
                        });
                    }
                    else
                    {
                        User.findOneAndUpdate(
                        {_id: req.body.userId},
                        {$inc: {"credit": -req.body.playAmount}},
                        {upsert: true},
                        function(err, user) {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: "Users credit is not update"
                                });
                            }
                            else{
                                res.json({
                                    success: true,
                                    msg: "Successfully create and pay the predictions!"
                                });
                            }
                        });

                    }
                })
            }
        });
    }, //END create


}; //END module.exports
