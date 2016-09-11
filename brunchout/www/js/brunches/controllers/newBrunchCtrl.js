controllers
  .controller('newBrunchCtrl', 
    ['$scope', '$ionicPopover', '$http', '$location', 'Brunch', 'LocationService', 'Account',
    function($scope, $ionicPopover, $http, $location, Brunch, LocationService, Account) {

    $scope.titleLimit = 60;
    var popoverUrl = 'templates/tabs/brunches/selectBrunchPopover.html';

    $scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('Autocomplete').blur();
    });
  }
    function initNewBrunch() {
      $scope.newBrunch = {};
      $scope.data = {};
      //set anonymous to false by default
      $scope.newBrunch.isPublic = true;      
    };

    function SubmitSuccess(res) {
      if(res.status === 200){
        //hide modal view
        $scope.newTaskModal.hide();
        //clear scope
        $scope.newBrunch = {};
        $scope.doRefresh();
      }
      initNewBrunch();
    }

    function SubmitFailed(res) {
      //if API call failed
      $scope.data.message = res.data.message;
    }  

    $scope.resizeTextArea = function() {
      var text = document.querySelector('textarea');
      text.style.height = '24px';
      text.style.height = text.scrollHeight + 12 + 'px';
    }
    
    $scope.submit = function() {
      Brunch.submitBrunch(
        $scope.newBrunch.selectedType,
        $scope.newBrunch.title, 
        $scope.newBrunch.content,
        $scope.newBrunch.location,
        Account.getCurrentAccount().firstName,
        Account.getCurrentAccount().accountId,
        Account.getCurrentAccount().img
        ).then(SubmitSuccess, SubmitFailed)
    }

    //popover for brunch selection
    $ionicPopover.fromTemplateUrl(popoverUrl, {
      scope: $scope
    }).then(function(popover){
      $scope.selectBrunchPopover = popover;
    });
    //open popover
    $scope.openBrunchPopover = function($event) {
      $scope.selectBrunchPopover.show($event);
    }; 
    //hide popover
    $scope.closeBrunchPopover = function($event) {
      $scope.selectBrunchPopover.hide($event);
    };

    $scope.selectBrunchType = function (type) {
      $scope.newBrunch.selectedType = type
      $scope.closeBrunchPopover();
    }

    initNewBrunch();
  }])


  
 