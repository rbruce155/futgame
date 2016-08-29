// require mongoose
var mongoose = require('mongoose');
// create the schema
var PersonSchema = new mongoose.Schema({
  name: { type: String, required: true}
}, {timestamps: true})
// register the schema as a model
var Person = mongoose.model('Person', PersonSchema);
