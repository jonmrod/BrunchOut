controllers
  .controller('BrunchCtrl', 
    ['$scope', '$window', '$ionicPopover', 'Brunch', 'Account', '$ionicNavBarDelegate', '$ionicModal', '$rootScope', '$state',
    function($scope, $window, $ionicPopover, Brunch, Account, $ionicNavBarDelegate, $ionicModal, $rootScope, $state) {
    var acct = Account.getCurrentAccount();
    $scope.sideMenu.teamName = acct.teamName;
    $scope.sideMenu.firstName = acct.firstName;
    $scope.sideMenu.lastName = acct.lastName;
    $scope.sideMenu.title = acct.role;
    $scope.sideMenu.img = acct.img;
    $scope.data = {};
    $scope.currentView = 0;
    $scope.currentViewName = "Brunches";
    $scope.popoverSelection = 'sort';
    var newBrunchModal = 'templates/tabs/brunches/newBrunch.html';
    var filterPopoverUrl = 'templates/tabs/brunches/filterPopover.html';

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
    $scope.setDefaultTeam = function(){
      $scope.currentViewName = "Brunches";   
    }

    $scope.setSlideHeight = function () {
      windowHeight = $window.innerHeight;
      //18% of window
      percent = windowHeight*18/100;
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

    //pull to refresh brunches
    $scope.doRefresh = function() {
      //get brunches from server
      Brunch.getBrunches()
      .then(DisplayBrunches, GetBrunchFailed)
      //after success/failure
      .finally(function() {
        //stop ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    function DisplayBrunches(res) {
      $scope.data.brunches = res.data ? res.data : [];
    }

    function GetBrunchFailed(res) {
      $scope.data.message = res.data.message;
    }

    //show modal view
    $scope.newBrunch = function() {
    //modal for new feedback items
    $ionicModal.fromTemplateUrl(newBrunchModal, {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {
      $scope.newTaskModal = modal;
      $scope.newTaskModal.show();
    })
      
    }
    //hide modal view
    $scope.closeBrunch = function() {
      $scope.newTaskModal.hide();
    }

    $scope.doRefresh();

  }])



  
 