names_app.controller('namesController', function ($scope, namesFactory) {

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
