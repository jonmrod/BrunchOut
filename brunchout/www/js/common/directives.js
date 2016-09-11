angular.module('app.directives', [])

.directive('brunchList', function(){
  return {
    restrict: 'AE',
    replace: true,
    abstract: true,
    templateUrl: 'templates/tabs/brunches/brunchList.html'
  }
})
.directive('teamList', function(){
  return {
    restrict: 'AE',
    replace: true,
    abstract: true,
    templateUrl: 'templates/tabs/brunches/teamList.html'
  }
})

.directive('brunchComments', function(){
  return {
    restrict: 'AE',
    replace: true,
    abstract: true,
    templateUrl: 'templates/tabs/brunches/brunchComments.html'
  }
})
.directive('locationSuggestion', function($ionicModal, LocationService){
  return {
    restrict: 'A',
    link: function($scope, element){
      $scope.search = {};
      $scope.search.suggestions = [];
      $scope.search.query = "";
      $ionicModal.fromTemplateUrl('templates/tabs/brunches/locationModal.html', {
        scope: $scope,
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });
      element[0].addEventListener('focus', function(event) {
        $scope.open();
      });
      $scope.$watch('search.query', function(newValue) {
        if (newValue) {
          LocationService.searchAddress(newValue).then(function(result) {
            $scope.search.error = null;
            $scope.search.suggestions = result;
          }, function(status){
            $scope.search.error = "There was an error :( " + status;
          });
        };
        $scope.open = function() {
          $scope.modal.show();
        };
        $scope.close = function() {
          $scope.modal.hide();
        };
        $scope.choosePlace = function(place) {
          LocationService.getDetails(place.place_id).then(function(location) {
            $scope.newBrunch.location = location;
            $scope.close();
          });
        };
      });
    }
  }
})


