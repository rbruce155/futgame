var mongoose = require('mongoose');
var Pool = mongoose.model('Pool');

module.exports = {
    index: function(req, res) {
        console.log('pools - index', req.body);
        Pool.find({}).populate('_poolCreateBy').populate('_poolMatches').populate('_poolUsers').exec(function(err, pools) {
            if (err) {
                console.log('pools - index - err', err);
                res.json({
                    status: 'error',
                    errors: err
                });
            } else {
                console.log('pools - index - success', pools);
                res.json({
                    status: 'success',
                    pools: pools
                });
            }
        });
    }, //END index

    create: function(req, res) {
        console.log('pools - create', req.body);
        //Instantiate new Pool object and poulate with initial data
        var newPool = new Pool();
        console.log(newPool._id);
        newPool.poolName = req.body.poolName;
        newPool._poolCreateBy = req.body.userId;
        newPool.poolPlayAmount = req.body.playAmount;

        newPool._poolMatches = req.body.poolMatches;
        // req.body.poolMatches.map(newPool._poolMatches.push());
        // for(var i=0; i<req.body.poolMatches.length; i++){
        //     newPool._poolMatches.push(req.body.poolMatches[i]);
        // }
        // Save to db
        newPool.save(function(err) {
            if (err) {
                console.log('pools - index - err', err);
                res.json({
                    status: 'error',
                    errors: err
                });
            } else {
                console.log('pools - index - success');
                res.json({
                    status: 'success',
                    data: 'pool created succefully',
                    newPoolId: newPool._id
                });
            }
        });
    }, //END index

}; //END module.exports
