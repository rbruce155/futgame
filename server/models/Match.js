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
    homeTeamScore: {
        type: Number,
        min: 0,
        required: true,
    },
    awayTeamScore: {
        type: Number,
        min: 0,
        required: true,
    },
    matchDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

var Match = mongoose.model('Match', MatchSchema);
