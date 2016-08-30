var mongoose = require('mongoose');
var Prediction = mongoose.model('Prediction');

module.exports = {
    findAllWithPoolId: function(req, res) {
        console.log('predictions - findAllWithPoolId');
        Prediction.find({
            _preditcionPool: req.body.poolId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                console.log('predictions - findAllWithPoolId - error', err);
                res.json({
                    status: 'errors',
                    errors: err
                });
            } else {
                res.json({
                    status: 'success',
                    predictionsByPool: predictionsByPool
                });
            }
        });
    }, //END findAllWithPoolId

    findAllWithUserlId: function(req, res) {
        console.log('predictions - findAllWithPoolId');
        Prediction.find({
            _preditcionUser: req.body.userId
        }).populate('_preditcionUser').populate('_preditcionPool').populate('predictions._match').exec(function(err, predictionsByPool) {
            if (err) {
                console.log('predictions - findAllWithUserlId - error', err);
                res.json({
                    status: 'errors',
                    errors: err
                });
            } else {
                res.json({
                    status: 'success',
                    predictionsByUser: predictionsByUser
                });
            }
        });
    }, //END findAllWithUserlId

    create: function(req, res) {
        console.log('predictions - create', req.body);
        //Instantiate new Pool object and poulate with initial data
        var newPrediction = new Prediction();
        console.log(newPrediction._id);
        newPrediction._predictionPool = req.body.poolId;
        newPrediction._predictionUser = req.body.userId;
        newPrediction.predictions = req.body.predictions;
        // Save to db
        newPrediction.save(function(err) {
            if (err) {
                console.log('predictions - create - err', err);
                res.json({
                    status: 'error',
                    errors: err
                });
            } else {
                console.log('predictions - create - success');
                res.json({
                    status: 'success',
                    // newPredictionId: newPrediction._id
                });
            }
        });
    }, //END create


}; //END module.exports
