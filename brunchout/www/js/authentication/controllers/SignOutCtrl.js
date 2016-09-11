controllers
	.controller('SignOutCtrl', function($scope, $location, User, $ionicHistory) {
  
  function LogoutSuccess(){
    $ionicHistory.clearCache();
    $location.path('/start');
  }

  $scope.logout = function() {
    User.logout();
    LogoutSuccess();
  };

})