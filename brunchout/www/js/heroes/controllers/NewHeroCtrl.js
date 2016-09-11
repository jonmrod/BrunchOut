controllers
  .controller('NewHeroCtrl', 
    ['$scope', 'Account', 'Hero', 'Team', '$ionicModal', '$ionicPopover',
    function($scope, Account, Hero, Team, $ionicModal, $ionicPopover) {

    var popoverUrl = 'templates/tabs/feedback/selectTeamPopover.html';
    var addHeroModalUrl = 'templates/tabs/heroes/addHero.html';

    $scope.resizeTextArea = function() {
      var text = document.querySelector('textarea');
      text.style.height = '24px';
      text.style.height = text.scrollHeight + 12 + 'px';
    }
    
    $scope.searchHeroes = function(keyword) {
      if (keyword && (keyword).length > 0) {
        Team.searchMembers($scope.newHero.teamId, keyword).then(function (res) {
          if (res.data.teamMembers && res.data.teamMembers.length > 0) {
            $scope.newHero.heroResults = res.data.teamMembers;
          }
          else {
            $scope.newHero.heroResults = $scope.newHero.allHeroes;
          }
        });
      }
    }

    $scope.tagHero = function(hero) {
      $scope.newHero.selectedHero = hero;
      $scope.closeAddHero();
    }

    //show modal view
    $scope.addHero = function() {
    //modal for new feedback items
    $ionicModal.fromTemplateUrl(addHeroModalUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {      
      Team.getMembers($scope.newHero.teamId).then(function(res) {
        $scope.newHero.allHeroes = res.data.teamMembers;
        $scope.newHero.heroResults = $scope.newHero.allHeroes;
      });
      $scope.newHero.searchHero = '';
      $scope.addHeroModal = modal;
      $scope.addHeroModal.show();
    })
      
    }
    //hide modal view
    $scope.closeAddHero = function() {
      $scope.addHeroModal.hide();
    }

    $scope.submit = function() {
      Hero.submitNewHero(
        $scope.newHero.teamId,
        $scope.newHero.selectedHero.accountId, 
        $scope.newHero.content,
        $scope.newHero.isPublic
        ).then(SubmitSuccess, SubmitFailed)
    }


    $ionicPopover.fromTemplateUrl(popoverUrl, {
      scope: $scope
    }).then(function(popover){
      $scope.selectTeamPopover = popover;
    });


    $scope.openTeamPopover = function($event) {
      $scope.teamName = Account.getCurrentAccount().teamName;
      $scope.orgName = Account.getCurrentAccount().organizationName;
      $scope.selectTeamPopover.show($event);
    }; 


    $scope.closeTeamPopover = function($event) {
      $scope.selectTeamPopover.hide($event);
    };

    $scope.checkUserInTeam = function () {
      if ($scope.newHero.selectedHero) {
        Team.searchMembers($scope.newHero.teamId, $scope.newHero.selectedHero.fullName).then(function (res) {
          if (res.data.teamMembers && res.data.teamMembers.length === 0) {
            $scope.newHero.selectedHero = '';
          }
        });
      }
    }
    
    $scope.selectTeam = function (ID) {
      if (ID == 'teamId') {
        $scope.newHero.teamId = Account.getCurrentAccount().teamId;
        $scope.newHero.selectedTeamName = $scope.teamName;
        $scope.checkUserInTeam();
      }
      else if (ID == 'organizationId') {
        $scope.newHero.teamId = Account.getCurrentAccount().organizationId;
        $scope.newHero.selectedTeamName = $scope.orgName;
      }
      $scope.closeTeamPopover();
    }

    function initializeNewHero() {
      $scope.newHero = $scope.heroResults = {};
      //set anonymous to false by default
      $scope.newHero.isPublic = true; 
      $scope.data = {};     
    };

    function SubmitSuccess(res) {
      if(res.status === 200){
        //hide modal view
        $scope.newHeroModal.hide();
        //clear scope
        $scope.newHero = {};
        $scope.doRefresh();
      }
      initializeNewHero();
    }

    function SubmitFailed(res) {
      //if API call failed
      $scope.data.message = res.data.message;
    }

    initializeNewHero();

  }])