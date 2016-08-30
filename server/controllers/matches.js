var mongoose = require('mongoose');
var Match = mongoose.model('Match');

module.exports = {
    index: function(req, res) {
        console.log('matches - index', req.body);
        Match.find({}, function(err, matches) {
            if (err) {
                console.log('matches - index - err', err);
                res.json({
                    status: 'error',
                    errors: err
                });
            } else {
                console.log('matches - index - success', matches);
                res.json({
                    status: 'success',
                    matches: matches
                });
            }
        });
    }, //END index

    create: function(req, res) {
        console.log('matches - create', req.body);
        //Instantiate new Match object and poulate with initial data
        var newMatch = new Match();
        console.log(newMatch._id);
        newMatch.homeTeamName = req.body.homeTeamName;
        newMatch.awayTeamName = req.body.awayTeamName;
        newMatch.homeTeamScore = req.body.homeTeamScore;
        newMatch.awayTeamScore = req.body.awayTeamScore;
        // Save to db
        newMatch.save(function(err) {
            if (err) {
                console.log('matches - index - err', err);
                res.json({
                    status: 'error',
                    errors: err
                });
            } else {
                console.log('matches - index - success');
                res.json({
                    status: 'success',
                    data: 'Match created succesfully',
                    newMatchId: newMatch._id
                });
            }
        });
    }, //END create

    update: function(req, res){
        Match.findOne({_id: req.body.matchId}, function(err, match){
            if(err){
                res.json({
                    status: 'error',
                    errors: err
                });
            }else if (!err && !match){
                res.json({
                    status: 'error',
                    errors: 'Match not found'
                });
            }else{
                match.homeTeamScore = req.body.homeTeamScore;
                match.awayTeamScore = req.body.awayTeamScore;
                match.save(function(err){
                    if (err) {
                        console.log('matches - update - err', err);
                        res.json({
                            status: 'error',
                            errors: err
                        });
                    } else {
                        console.log('matches - index - success');
                        res.json({
                            status: 'success',
                            data: 'scores updated succesfully'
                        });
                    }
                });
            }
        });
    }//END update

}; //END module.exports
