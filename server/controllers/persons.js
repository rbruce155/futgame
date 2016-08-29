//load required models
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

// controller methods
module.exports = (function () {

return {

  showAll: function(req, res) {
    Person.find({}, function(err, persons) {
      res.send(persons);
    })
  },
  create: function(req, res) {
    var person = new Person({name: req.params.name});
    person.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        res.redirect('/names');
      }
    })
  },
  delete: function(req, res) {
    Person.findOneAndRemove({name: req.params.name}, function(err, person){
      if(err){
        console.log('Something is effed up');
      }
      else{
        console.log('deleted: ' + person)
        res.redirect('/names');
      }
    })
  },
  showOne: function(req, res) {
    Person.findOne({name: req.params.name}, function(err, person){
      if(err){
        console.log('shit is not working right man');
      }
      else{
        res.send(person);
      }
    })
  }
}
})();
