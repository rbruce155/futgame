futgame_app.controller('loginController', function ($scope, $location, loginFactory) {

  $scope.login = function () {
    loginFactory.login($scope.login, function (data){
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




});


futgame_app.controller('namesController', function ($scope, namesFactory) {

  namesFactory.index(function(data){
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
