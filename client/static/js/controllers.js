futgame_app.controller('loginController', function ($scope, $cookies, $location, loginFactory) {

  $scope.login = function () {
    loginFactory.login($scope.loginUser, function (data){
        $location.url('/dashboard');
    });
}

  $scope.register = function () {
    loginFactory.register($scope.newUser, function (data){
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
      loginFactory.logout(function (data) {
        $location.path('/login');
      })
  }


});



//deleteme after we create dashboard
futgame_app.controller('dashboardController', function ($scope, loginFactory, dashboardFactory) {


  dashboardFactory.index(function(data){
    $scope.personList = data;
  });

  $scope.addPerson = function () {
    namesFactory.create($scope.newPerson, function (data) {
      $scope.personList = data;
      $scope.newPerson = {};
    });
  };

  $scope.removePerson =  function (person) {
    namesFactory.delete(person, function (data) {
      $scope.personList = data;
    });
  };



});
