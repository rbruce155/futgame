var mongoose = require('mongoose'),
    validators = require('mongoose-validators'),
    uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// ******************** Match Schema *******************
var PoolSchema = new Schema({
    poolName: {
        type: String,
        required: true,
        unique: true
    },
    _poolCreateBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    poolPlayAmount: {
        type: Number,
        min: 0,
        required: true
    },
    _poolMatches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    }],
    _poolUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    poolPredictions: [{
        type: Schema.Types.ObjectId,
        ref: 'Prediction',
    }],
    poolStart: Boolean
}, {
    timestamps: true
});
PoolSchema.plugin(uniqueValidator);
var Pool = mongoose.model('Pool', PoolSchema);
