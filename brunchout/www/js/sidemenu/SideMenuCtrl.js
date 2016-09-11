controllers
  .controller('SideMenuCtrl',
    ['$scope', '$rootScope', 'Account',
      function ($scope, $rootScope, Account) {
        $scope.sideMenu = {};

        $scope.getCurrentAccount = function(){
        	var acct = Account.getCurrentAccount();
        	$scope.sideMenu.teamName = acct.teamName,
        	$scope.sideMenu.firstName = acct.firstName,
        	$scope.sideMenu.lastName = acct.lastName,
          $scope.sideMenu.title = acct.role,
          $scope.sideMenu.img = acct.img
        }

        $scope.getCurrentAccount();

      }
    ]);
   