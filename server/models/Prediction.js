var mongoose = require('mongoose'),
    validators = require('mongoose-validators');
var Schema = mongoose.Schema;

// ******************** Match Schema *******************
var PredictionSchema = new Schema({
    _predictionUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _predictionPool: {
        type: Schema.Types.ObjectId,
        ref: 'Pool',
        required: true
    },
    predictions: [{
        _match: {
            type: Schema.Types.ObjectId,
            ref: 'Match',
            required: true
        },
        homeTeamScorePrediction: {
            type: Number,
            min: 0,
            required: true
        },
        awayTeamScorePrediction: {
            type: Number,
            min: 0,
            required: true
        },
    }],
    predictionPay: {
        type: Boolean, 
    },
    points: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
