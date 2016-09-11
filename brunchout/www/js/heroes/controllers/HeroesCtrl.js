controllers
  .controller('HeroesCtrl', 
    ['$scope', '$window', 'Hero', '$ionicNavBarDelegate', '$ionicPopover', '$ionicModal', '$rootScope', '$state',
    function($scope, $window, Hero, $ionicNavBarDelegate, $ionicPopover, $ionicModal, $rootScope, $state) {

    $scope.data = {};
    $scope.currentView = 0;
    $scope.selectedSort = '-createdAt';
    $scope.popoverSelection = 'sort';
    var filterPopoverUrl = 'templates/tabs/feedback/filterPopover.html';
    
    $scope.setDefaultTeam = function(){
      Hero.setCurrentHeroTeamId("Organization");
      $scope.currentViewName = "Organization";   
    }

    $scope.setSlideHeight = function () {
      var windowHeight = $window.innerHeight;
      //18% of window
      var percent = windowHeight*18/100;
      //minus that from total height
      windowHeight -= percent;
      return {
        height: windowHeight + 'px'
      }
    }
    //show nav bar whenever entering view
    $scope.$on('$ionicView.enter', function(e) {
      $ionicNavBarDelegate.showBar(true);
    });

    //go to view
    $scope.goToView = function(index, name) {
      $scope.currentViewName = name;
      $scope.currentView = index;
      $scope.$broadcast('slideBox.setSlide', index);
      Hero.setCurrentHeroTeamId(name);
      $scope.doRefresh();
    }
    $scope.hasSlideChanged = function(index) {
      return $scope.currentView === index;
    }
    $scope.slideHasChanged = function(index) {
      if (index == 0) {
        $scope.goToView(index, 'Organization');
      }
      else if (index == 1) {
        $scope.goToView(index, 'Team');
      }
      else if (index == 2) {
        $scope.goToView(index, 'My Activity');
      }
    }

    //show modal view
    $scope.newHero = function() {
    //modal for new feedback items
    $ionicModal.fromTemplateUrl('templates/tabs/heroes/newHero.html', {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {
      $scope.newHeroModal = modal;
      $scope.newHeroModal.show();
    })
      
    }
    //hide modal view
    $scope.closeHero = function() {
      $scope.newHeroModal.hide();
    }

    $scope.doRefresh = function() {
      Hero.getHeroes(Hero.getCurrentHeroTeamId(),$scope.currentViewName)
      .then(DisplayHeroes, SetFailMessage)
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    $ionicPopover.fromTemplateUrl(filterPopoverUrl, {
      scope: $scope
    }).then(function(popover) {
      $scope.filterPopover = popover;
    });

    $scope.openFilterPopover = function($event) {
      $scope.filterPopover.show($event);
    };
    $scope.closeFilterPopover = function() {
      $scope.filterPopover.hide();
    };

    $scope.FilterByDate = function (item) {
      var startDate = moment().subtract($scope.data.dateFilter, 'days');
      var endDate = moment(item.createdAt);
      if ((endDate >= startDate) || $scope.data.dateFilter === '') {
        return true;
      }
    }

    $scope.setSort = function(sort) {
      $scope.selectedSort = sort;
    }

    $scope.setPopoverSelection = function(selection) {
      $scope.popoverSelection = selection;
    }
    
    function DisplayHeroes(res) {
      $scope.data.heroes = res.data && res.data.success ? res.data.heroes : [];
    }

    function SetFailMessage(res) {
      $scope.data.message = res.data.message;
    }

    $rootScope.$on('rootScope:currentAccountChanged', function (event, data) {
      Hero.setCurrentHeroTeamId($scope.currentViewName || "Organization");
      $scope.doRefresh();
    });

    $rootScope.$on('HeroEdited', function(event, data) {
      $scope.doRefresh();
    })
    
    $scope.setDefaultTeam();

    $scope.doRefresh();

  }])



  
 