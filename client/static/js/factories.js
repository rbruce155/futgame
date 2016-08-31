//LOGIN FACTORY
futgame_app.factory('usersFactory', function ($http) {
  var factory = {};


  factory.login = function (user, callback) {
    $http.post('/login', user).success(function (output) {
      callback(output);
  });
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

//POOLS FACTORY
futgame_app.factory('poolsFactory', function ($http) {
  var factory = {};
  var poolsList = [];

  factory.index = function(callback) {
      $http.get('/getpools').success(function(response) {
        // console.log('in fact ' + response.pools[0].poolName);
      callback(response);
  });
  };


  return factory;
});
