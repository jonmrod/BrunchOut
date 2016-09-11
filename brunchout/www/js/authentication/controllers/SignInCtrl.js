controllers
.controller('SignInCtrl',
  ['$scope', '$ionicViewSwitcher', 'User', '$location', '$state', '$ionicPopup', 
  function($scope, $ionicViewSwitcher, User, $location, $state, $ionicPopup) {

  $scope.data = {};

  $scope.login = function() {
    User.login($scope.data.email, $scope.data.password)
    .then(LoginSuccess)
  }

  function redirectToFeedback(){
    $scope.data = {};
    $state.go('app.tabs.brunches');
  }


  function LoginSuccess(res) {
    if (res.data) {
      User.saveUser(res.data);
      redirectToFeedback();
    }
  }
}]);



 