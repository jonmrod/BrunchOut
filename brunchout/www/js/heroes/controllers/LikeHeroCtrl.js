controllers
  .controller('LikeHeroCtrl',
    ['$scope', 'Hero', '$rootScope',
    function($scope, Hero, $rootScope) {

    $scope.toggleLike = function (heroId, canLike, isLiking) {
      if (canLike && !isLiking) {
        Hero.likeHero(heroId).then(function(res) {
          var heartElement = angular.element(document.querySelector('.heart'));
          heartElement.addClass('is_animating');
          toggleSuccess(res);
        }, toggleFailure);
      }
      if (!canLike && isLiking) {
        Hero.unlikeHero(heroId).then(toggleSuccess, toggleFailure);
      }      
    }

    function toggleSuccess (res) {
      $scope.item = res.data.success ? res.data.hero : {};
      $scope.detailRefresh();
      $rootScope.$emit('HeroEdited',{}); 
      //if API call wasn't successful
      if (!res.data.success) {
        $scope.item.message = res.data.message;
      }
    }

    function toggleFailure (res) {
      $scope.item.message = res.data.message;
    }

  }]);