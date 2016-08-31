futgame_app.controller('usersController', function($scope, $cookies, $location, usersFactory) {

    $scope.login = function() {
        // console.log('usersController - login');
        usersFactory.login($scope.loginUser, function(response) {
            // console.log('usersController - login', response);
            $cookies.put('id', response.id);
            $cookies.put('username', response.username);
            // console.log('cookies all', $cookies.getAll());
            $scope.currentUser = {
                id: $cookies.get('id'),
                username: $cookies.get('username'),
            };
            // console.log('currentUser', $scope.currentUser);
            $location.url('/dashboard');
        });
    };

    $scope.register = function() {
        usersFactory.register($scope.newUser, function(response) {
            // console.log('usersController - register - ', response);
            if (!response.success) {
                $scope.errors = response.msg;
            } else {
                $scope.loginUser.email = $scope.newUser.email;
                $scope.loginUser.password = $scope.newUser.password;
                $scope.login();
                // usersFactory.login($scope.loginUser, function(response) {
                //     $location.url('/dashboard');
                // });
            }
        });
    };

    $scope.logout = function() {
        console.log('hi cont');
        usersFactory.logout(function(data) {
            $cookies.remove('id');
            $cookies.remove('username');
            // console.log('cookies cleared on logout - ', $cookies.getAll());
            $location.path('/login');
        });
    };


});



//deleteme after we create dashboard
futgame_app.controller('poolsController', function($scope, $cookies, $location, usersFactory, poolsFactory) {
    $scope.currentUser = {
        id: $cookies.get('id'),
        username: $cookies.get('username'),
    };
    console.log('poolsController - currentUser', $scope.currentUser);



    poolsFactory.index(function(response) {
        console.log('poolsController - index', response);
        if(response.success){
            // $location.url('/dashboard');
            $scope.poolsList = response;
        }else{
            console.log('poolsController - index - not logged in');
            $location.url('/');
        }

    });

    $scope.logout = function() {
        console.log('hi cont');
        usersFactory.logout(function(data) {
            $cookies.remove('id');
            $cookies.remove('username');
            // console.log('cookies cleared on logout - ', $cookies.getAll());
            $location.path('/login');
        });
    };



});
