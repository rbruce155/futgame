//============================ usersController ======================================

futgame_app.controller('usersController', function($scope, $cookies, $location, usersFactory) {

    $scope.login = function() {
        usersFactory.login($scope.loginUser, function(response) {
            console.log('usersController - login');
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


//============================ dashboardController ======================================


futgame_app.controller('dashboardController', function($scope, $cookies, $location, usersFactory, poolsFactory, poolServiceFactory) {

    $scope.currentUser = {
        id: $cookies.get('id'),
        username: $cookies.get('username'),
    };
   // console.log('poolsController - currentUser', $scope.currentUser);

    poolsFactory.index(function(response) {
        //console.log('poolsController - index', response);
        if(response.success){
            $scope.poolsList = response;
        }else{
            console.log('poolsController - index' + response);
            //$location.url('/');
        }
    });

    //get users credit upon hitting dashboard page
    usersFactory.getCredit($scope.currentUser, function(data){
      $scope.userCredit = data;
    });


    $scope.logoutButton = function() {
        //console.log('hi cont');
        usersFactory.logout(function(data) {
            $cookies.remove('id');
            $cookies.remove('username');
            // console.log('cookies cleared on logout - ', $cookies.getAll());
            $location.path('/login');
        });
    };

    $scope.createPoolButton = function(){
        $location.url('/createpool');
    }

    // initialize credit scope object
    $scope.creditBuy = {};

    //add credit
    $scope.updateCredit = function(){
        var purchaseInfo = {purchase_amt: $scope.creditBuy, id: $cookies.get('id'), action: "add"};
        usersFactory.updateCredit(purchaseInfo, function (data) {
          $scope.userCredit = data.userInfo.credit;
        })
    }

    $scope.joinPool = function(pool){
        poolServiceFactory.setPool(pool);
        $location.url('/pool')
    }
});

//============================ createpoolsController ======================================

futgame_app.controller('createPoolsController', function($scope, $location, $cookies, matchsFactory, poolsFactory){

    var matchList = [];
    $scope.chooseMatches = [];

    matchsFactory.index(function(response){
        if(response.success){
            $scope.matchsList = response.matches;
            matchList = response.matches;
        }
        else
        {
            console.log('createPoolsController - index' + response);
        }
    })

    $scope.addMatchTable = function(){
        if($scope.chooseMatches.indexOf($scope.pool_match.poolMatches))
        {
            $scope.chooseMatches.push($scope.pool_match.poolMatches);
            $scope.pool_match.poolMatches = {};
        }
        else
        {
            console.log("Choose other team!");
        }
    }

    $scope.removeMatch = function(match){
        var index = $scope.chooseMatches.indexOf(match);
        $scope.chooseMatches.splice(index, 1);
    }

    $scope.createpool = function(){
        var IDmatchs = [];

        if(!$scope.pool_match.poolName)
        {
            console.log("Add a name to the pool");
        }
        else
        {
            for(var i = 0; i < matchList.length; i++)
            {
                for(var j = 0; j < $scope.chooseMatches.length; j++)
                {
                    if(matchList[i].homeTeamName == $scope.chooseMatches[j].substring(0, $scope.chooseMatches[j].indexOf(' ')))
                    {
                        IDmatchs.push(matchList[i]._id);
                    }
                }
            }
        }
        $scope.pool_match.userId = $cookies.get('id');
        $scope.pool_match.poolMatches = IDmatchs;
        console.log($scope.pool_match);

        poolsFactory.create($scope.pool_match, function(response){
            if (!response.success) {
                console.log(response.msg);
            } else {
                console.log(response.msg);
                $location.url('/dashboard');
            }
        })

    }
})

futgame_app.controller('poolPredictionController', function($scope, $location, $cookies, poolServiceFactory, predictionsFactory, usersFactory){

    $scope.currentUser = {
            id: $cookies.get('id'),
            username: $cookies.get('username'),
        };

    $scope.teamPrediction = {};


    $scope.pool = poolServiceFactory.getPool();
    console.log($scope.pool);
    $scope.matches = $scope.pool._poolMatches;
    $scope.users = $scope.pool._poolUsers;

    usersFactory.getCredit($scope.currentUser, function(data){
      $scope.userCredit = data;
    });

    $scope.createPrediction = function()
    {
        var size = 0, key;
        for(key in $scope.teamPrediction)
        {
            if($scope.teamPrediction.hasOwnProperty(key)) size++;
        }

        //this step is to check if the user puts all the predictions for each team
        if(size != $scope.matches.length*2)
        {
            console.log("Get all your predictions!");
        }
        else
        {
            var fullPlayerPrediction = {};
            var predictionsArray= [];

            for(var i = 0; i < $scope.matches.length; i++)
            {
                var homeTeam = $scope.matches[i].homeTeamName;
                var awayTeam = $scope.matches[i].awayTeamName;
                var matchID = $scope.matches[i]._id;
                predictionsArray.push({_match: matchID, homeTeamScorePrediction: $scope.teamPrediction[homeTeam], awayTeamScorePrediction: $scope.teamPrediction[awayTeam]});
            }

            fullPlayerPrediction.poolId = $scope.pool._id;
            fullPlayerPrediction.userId = $cookies.get('id');
            fullPlayerPrediction.predictions = predictionsArray;
            fullPlayerPrediction.playAmount = $scope.pool.poolPlayAmount;

            //console.log(fullPlayerPrediction);
            predictionsFactory.create(fullPlayerPrediction, function(response){
                if (!response.success) {
                    console.log(response.msg);
                } else {
                    console.log(response.msg);
                    $location.url('/dashboard');
                }
            });

            $scope.teamPrediction = {};
        }
    }
})
