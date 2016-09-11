controllers
  .controller('TeamCtrl', 
    ['$scope', 'Brunch', '$ionicNavBarDelegate',
    function($scope, Brunch, $ionicNavBarDelegate) {

    $scope.data = {};

    //show nav bar whenever entering view
    $scope.$on('$ionicView.enter', function(e) {
      $ionicNavBarDelegate.showBar(true);
    });

    $scope.doRefresh = function() {
      Brunch.getTeamMates()
      .then(DisplayTeam, SetFailMessage)
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }
    
    function DisplayTeam(res) {
      console.log(res);
      $scope.data.team = res.data ? res.data : [];
      console.log($scope.data.team);
    }

    function SetFailMessage(res) {
      $scope.data.message = res.data.message;
    }
    $scope.doRefresh();

  }])



  
 