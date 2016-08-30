futgame_app.factory('loginFactory', function ($http) {
  var factory = {};


  factory.login = function (user, callback) {
    $http.post('/login', user).success(function (output) {
      callback(output);
    })
  };

  factory.register = function (newUser, callback) {
      console.log('register' + newUser);
      $http.post('/signup', newUser).success(function (output) {
        callback(output);
      });
  };

  factory.logout = function (callback) {
    console.log('hi fact');
    $http.get('/logout').success(function (output) {
      console.log('hi success');
      callback(output);
    });
  };


  return factory;
});


futgame_app.factory('dashboardFactory', function ($http) {
  var factory = {};
  var personList = [];

  //Restful syntax: index = get all that object
  factory.index = function(callback) {

      $http.get('/pools').success(function(output) {
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
