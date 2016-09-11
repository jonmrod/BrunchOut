controllers
  .controller('CommentCtrl',
    ['$scope', 'Brunch', 'Account',
    function($scope, Brunch, Account) {

    $scope.newComment = {};

    $scope.submitComment = function () {
      var brunchId = $scope.item._id;
      var commentContent = $scope.newComment.content;
      var user = Account.getCurrentAccount().firstName;
      var img = Account.getCurrentAccount().img;
      Brunch.addNewComment(brunchId, commentContent, user, img)
        .then(DisplayBrunch, DisplayBrunchFail)
    }

    function DisplayBrunchFail(res) {
      $scope.item.message = res.data.message;
    }
    function DisplayBrunch(res) {
      $scope.newComment = {};
      $scope.detailRefresh();
    }
  }]);