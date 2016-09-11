controllers
  .controller('HeroDetailCtrl',
    ['$scope', '$rootScope', '$stateParams', 'Hero',
    function($scope, $rootScope, $stateParams, Hero) {

    $scope.heroDetails = {};

    //pull to refresh hero
    $scope.detailRefresh = function() {
      $scope.heroId = $stateParams.heroId;
      Hero.getHeroById($scope.heroId)
      .then(DisplayHero, DisplayHeroFailed)
      //after success/failure
      .finally(function() {
        //stop ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    function DisplayHeroFailed(res) {
      $scope.item.message = res.data.message;
    }
    function DisplayHero(res) {
      $scope.item = res.data.success ? res.data.hero : {};
      //if API call wasn't successful
      if (!res.data.success) {
        $scope.item.message = res.data.message;
      }
    }

    $scope.detailRefresh();

  }]);
