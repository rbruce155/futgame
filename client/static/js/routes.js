//  use the config method to set up routing:
futgame_app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html'
        })
        .when('/createpool', {
            templateUrl: 'partials/createpool.html'
        })

    .otherwise({
        redirectTo: '/'
    });
});
