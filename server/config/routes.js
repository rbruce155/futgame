//load controllers
var persons = require('../controllers/persons.js');

//routes
module.exports = function(app) {
  app.get('/names', function(req, res) {
    persons.showAll(req, res)
  });
  app.get('/new/:name/', function(req,res){
    persons.create(req, res)
  });
  app.get('/remove/:name/', function (req, res) {
    persons.delete(req, res)
  });
  app.get('/:name', function (req, res){
    persons.showOne(req, res)
  });
}
