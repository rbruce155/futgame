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
        var imgArray = ["donald.jpg", "obama.jpg", "hilary.jpg", "face1.jpg", "face2.jpg"];
        var randomNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        $scope.newUser.img = imgArray[randomNum];

        usersFactory.register($scope.newUser, function(response) {
            // console.log('usersController - register - ', response);
            if (!response.success) {
                $scope.errors = response.msg;
            } else {
              console.log(response);
                $scope.newUser = {};
                $scope.loginUser.email = response.user_email;
                $scope.loginUser.password = response.user_password;
                console.log(loginUser);
                $scope.login($scope.loginUser);
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


futgame_app.controller('dashboardController', function($scope, $cookies, $location, usersFactory, poolsFactory, poolServiceFactory, matchsFactory, $interval) {

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
        $location.url('/pool');
    }

    $scope.watchPool = function(pool){
        poolServiceFactory.setPool(pool);
        $location.url('poolon');
    }

    $scope.now = new Date().toISOString();
    console.log($scope.now);

    // setInterval(dashTimer, 1000);

    // $scope.time = {now: 'hi'};
    // function dashTimer() {
    //
    //   matchsFactory.dashTime(function (data) {
    //     $scope.time.now = data;
    //     console.log($scope.time.now);
    //   });
    //
    // };









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

//============================ poolPredictionController ======================================


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

//============================ poolonController ======================================

futgame_app.controller('poolonController', function($scope, $cookies, poolServiceFactory, socketFactory){

    $scope.pool = poolServiceFactory.getPool();
    console.log($scope.pool);

    $scope.players = $scope.pool._poolUsers;
    $scope.predictions = $scope.pool.poolPredictions;
    $scope.fullPlayers = [];

    for(var i = 0; i < $scope.players.length; i++)
    {
        $scope.fullPlayers.push({
            username: $scope.players[i].username,
            img: $scope.players[i].img,
            points: $scope.predictions[i].points,
            prediction: $scope.predictions[i].predictions
        });

    }
    console.log($scope.predictions[0].predictions);

    var now = new Date().toISOString();
    $scope.matches = [];
    $scope.matchesDone = [];
    for(var i = 0 ; i < $scope.pool._poolMatches.length; i++)
    {
        if($scope.pool._poolMatches[i].matchDate >= now)
        {
            $scope.matches.push($scope.pool._poolMatches[i]);
        }
        else if ($scope.pool._poolMatches[i].matchDate <= now){
            $scope.matchesDone.push($scope.pool._poolMatches[i]);
        }
    }

    socketFactory.activeSocket($scope.matches, function(response){
        $scope.matches = response.matches;
        console.log($scope.matches);
    })


    $scope.showPredictions = function (player) {
      $scope.playerPredictionsModal = player;

      var predArr = [];

      console.log(player.prediction[0].homeTeamScorePrediction);

      // for(var i=0; i < player.prediction.length; i++){
      //   predArr.push({player.prediction})
      // }

      $scope.predArr = predArr;
    }


});
