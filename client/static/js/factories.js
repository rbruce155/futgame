names_app.factory('namesFactory', function ($http) {
  var factory = {};
  var personList = [];

  //Restful syntax: index = get all that object
  factory.index = function(callback) {
      $http.get('/names').success(function(output) {
      callback(output);
    })
  };

  factory.create = function (newPerson, callback) {
    $http.get('/new/' + newPerson.name + '/').success(function (output) {
      callback(output);
    })
  };

  factory.delete = function (person, callback) {
      $http.get('/remove/'+ person.name +'/').success(function (output) {
        callback(output);
      })
  };


  return factory;
});
