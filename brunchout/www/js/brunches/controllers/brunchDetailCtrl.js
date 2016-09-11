controllers
.controller('brunchDetailCtrl',
  ['$scope', '$rootScope', '$stateParams', 'Brunch', '$ionicLoading', '$compile',
  function($scope, $rootScope, $stateParams, Brunch, $ionicLoading, $compile) {

    //pull to refresh brunch
    $scope.detailRefresh = function() {
      $scope.feedbackId = $stateParams.brunchId;
      //get feedback from server
      Brunch.getBrunchById($scope.feedbackId)
      .then(DisplayFeedback, DisplayFeedbackFailed)
      //after success/failure
      .finally(function() {
        //stop ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
    }

    $scope.generateTextAreaSize = function(id) {
      var text = document.getElementById(id)
      if(text){
        text.style.height = '24px';
        text.style.height = text.scrollHeight + 12 + 'px';
        return {
          height: text.style.height  
        }        
      }
    }  

    function DisplayFeedbackFailed(res) {
      $scope.item.message = res.data.message;
    }
    function DisplayFeedback(res) {
      $scope.item = {}
      if (res.data) {
        $scope.item =  res.data;
        startMap($scope.item.location);
      }
      //if API call wasn't successful
      if (!res.data.success) {
        $scope.item.message = res.data.message;
      }
    }

    function startMap (coordinates) {
      var lat = coordinates.geometry.location.lat;
      var lng = coordinates.geometry.location.lng;
      var nameOfPlace = coordinates.name;
      var address = coordinates.formatted_address;
      var latLng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });      
      var infoWindow = new google.maps.InfoWindow({
        content: nameOfPlace + '<br>' + address 
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
    });
    }

    $scope.detailRefresh();
  }]);



  
 