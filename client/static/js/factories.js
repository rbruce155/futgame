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

    factory.updateCredit = function (purchaseInfo, callback) {
      $http.post('/updatecredit', purchaseInfo).success(function (output) {
        callback(output);
      });
    };

    return factory;
});

//POOL SERVICES TO STORE THE POOL FROM 
futgame_app.factory('poolServiceFactory', function(){

    var factory = {};
    var pool;

    factory.setPool = function(pol)
    {
        pool = pol;
    }

    factory.getPool = function()
    {
      return pool;
    }

    return factory;
});

//POOLS FACTORY
futgame_app.factory('poolsFactory', function($http) {
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

//PREDICTIONS FACTORY
futgame_app.factory('predictionsFactory', function($http){
    var factory = {};

    factory.create = function(newPrediction, callback)
    {
        $http.post('/createprediction', newPrediction).success(function(response){
            callback(response);
        });
    }

    return factory;
});

//MATCHS FACTORY
futgame_app.factory('matchsFactory', function($http){
    var factory = {};

    factory.index = function(callback){
        $http.get('/getmatches').success(function(response){
            callback(response);
        })
    }

    return factory;
});
