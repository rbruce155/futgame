//USERS FACTORY
futgame_app.factory('usersFactory', function ($http) {
    var factory = {};


    factory.login = function (user, callback) {
        $http.post('/login', user).success(function (output) {
            callback(output);
        });
    };

    factory.register = function (newUser, callback) {
        //console.log('register' + newUser);
        $http.post('/signup', newUser).success(function (output) {
            callback(output);
        });
    };

    factory.logout = function (callback) {
      //console.log('hi fact');
        $http.get('/logout').success(function (output) {
        // console.log('hi success');
            callback(output);
        });
    };

    factory.getCredit = function (userInfo, callback) {
      $http.post('/getuser', userInfo).success(function (output) {
        callback(output.userInfo.credit);
      });
    };

    factory.addCredit = function (purchaseInfo, callback) {
      $http.post('/addcredit', purchaseInfo).success(function (output) {
        callback(output);
      });
    };

    return factory;
});

//POOLS FACTORY
futgame_app.factory('poolsFactory', function ($http) {
  var factory = {};

  factory.index = function(callback) {
      $http.get('/getpools').success(function(response) {
        // console.log('in fact ' + response.pools[0].poolName);
      callback(response);
    });
  };

  factory.create = function(newPool, callback){
      $http.post('/createpool', newPool). success(function(response){
        callback(response);
      })
    }


  return factory;
});

futgame_app.factory('matchsFactory', function($http){
    var factory = {};

    factory.index = function(callback){
        $http.get('/getmatches').success(function(response){
            callback(response);
        })
    }

    return factory;
});
