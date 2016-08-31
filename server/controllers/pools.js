var mongoose = require('mongoose');
var Pool = mongoose.model('Pool');

module.exports = {
    index: function(req, res) {
        Pool.find({}).populate('_poolCreateBy').populate('_poolMatches').populate('_poolUsers').exec(function(err, pools) {
            if (err) {                
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                    res.json({
                    success: true,
                    pools: pools
                });
            }
        });
    }, //END index

    create: function(req, res) {

        var newPool = new Pool();
        newPool.poolName = req.body.poolName;
        newPool._poolCreateBy = req.body.userId;
        newPool.poolPlayAmount = req.body.playAmount;
        newPool._poolMatches = req.body.poolMatches;

        newPool.save(function(err) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    msg: 'pool created succefully',
                    newPoolId: newPool._id
                });
            }
        });
    }, //END index

}; //END module.exports
