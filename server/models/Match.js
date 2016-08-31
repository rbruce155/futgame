var mongoose = require('mongoose'),
    validators = require('mongoose-validators');
var Schema = mongoose.Schema;

// ******************** Match Schema *******************
var MatchSchema = new Schema({
    homeTeamName: {
        type: String,
        required: true
    },
    awayTeamName: {
        type: String,
        required: true
    },
    awayTeamImg: {
        type: String,
        required: true
    },
    homeTeamScore: {
        type: Number,
        min: 0,
        required: true,
    },
    homeTeamImg: {
        type: String,
        required: true
    },
    awayTeamScore: {
        type: Number,
        min: 0,
        required: true,
    },
    matchDate: {
        type: String,
        required: true,
    } 
}, {
    timestamps: true
});

var Match = mongoose.model('Match', MatchSchema);
