controllers
  .controller('upvoteBrunchCtrl',
    ['$scope', 'Brunch',
    function($scope, Brunch) {

    $scope.upvoteBrunch = function(brunchId) {
      Brunch.upvoteBrunch(brunchId).then(displayBrunch);
    }
    function displayBrunch (res) {
      $scope.detailRefresh();
    }
  }]);