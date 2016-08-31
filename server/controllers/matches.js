var mongoose = require('mongoose');
var Match = mongoose.model('Match');

module.exports = {
    index: function(req, res) {
        Match.find({}, function(err, matches) {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                });
            } else {
                res.json({
                    success: true,
                    matches: matches
                });
            }
        });
    }, //END index

    create: function(req, res) {
        //Instantiate new Match object and poulate with initial data
        var newMatch = new Match();
        newMatch.homeTeamName = req.body.homeTeamName;
        newMatch.awayTeamName = req.body.awayTeamName;
        newMatch.homeTeamScore = req.body.homeTeamScore;
        newMatch.awayTeamScore = req.body.awayTeamScore;
        newMatch.homeTeamImg = req.body.homeTeamImg;
        newMatch.awayTeamImg = req.body.awayTeamImg;
        newMatch.matchDate = req.body.matchDate;
        // Save to db
        newMatch.save(function(err) {
            if (err) {
                //console.log('matches - index - err', err);
                res.json({
                    success: false,
                    mgs: err
                });
            } else {
                res.json({
                    success: true,
                    msg: 'Match created succesfully',
                    newMatchId: newMatch._id
                });
            }
        });
    }, //END create

    update: function(req, res){
        Match.findOne({_id: req.body.matchId}, function(err, match){
            if(err){
                res.json({
                    success: false,
                    msg: err
                });
            }else if (!err && !match){
                res.json({
                    success: false,
                    msg: 'Match not found'
                });
            }else{
                match.homeTeamScore = req.body.homeTeamScore;
                match.awayTeamScore = req.body.awayTeamScore;
                match.save(function(err){
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: 'scores updated succesfully'
                        });
                    }
                });
            }
        });
    }//END update

}; //END module.exports
