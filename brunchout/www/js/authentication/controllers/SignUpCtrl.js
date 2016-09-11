controllers
  .controller('SignUpCtrl',
    ['$scope', '$ionicViewSwitcher', 'SignUp', '$state',
      function ($scope, $ionicViewSwitcher, SignUp, $state) {

        $scope.data = {};
        $scope.signup = function () {
          SignUp.createUser($scope.data.fName, $scope.data.lName, $scope.data.email, $scope.data.password)
          .then(createSuccess, createFailure)
        }

        function createSuccess (res) {
          if (res.data.user) {
            SignUp.saveUser(res.data.user);
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('app.tabs.brunches');
          }
        }

        function createFailure (res) {
          $scope.register.message = res.data.message
        }

      }
    ]);