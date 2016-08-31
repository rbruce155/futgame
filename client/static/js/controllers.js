futgame_app.controller('usersController', function ($scope, $cookies, $location, usersFactory) {

  $scope.login = function () {
    usersFactory.login($scope.loginUser, function (data){
        $location.url('/dashboard');
    });
}

  $scope.register = function () {
    usersFactory.register($scope.newUser, function (data){
      if (data.data.errors){
        $scope.errors = data.data.errors;
      }
      else{
        $scope.user = data.data;
        $location.path('/dashboard');
      }
    }, function(err){
      console.log("I am an error",err);
    });
  };

  $scope.logout = function () {
    console.log('hi cont');
      usersFactory.logout(function (data) {
        $location.path('/login');
      })
  }


});


futgame_app.controller('poolsController', function ($scope, usersFactory, poolsFactory) {

  poolsFactory.index(function(data){
    $scope.poolsList = data;
  });

});
