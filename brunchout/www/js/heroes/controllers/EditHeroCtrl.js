controllers
  .controller('EditHeroCtrl', 
    ['$scope', '$rootScope', '$state', '$ionicModal', '$ionicPopup', '$ionicPopover', 'Hero', 'Team', 'Account',
    function($scope, $rootScope, $state, $ionicModal, $ionicPopup, $ionicPopover, Hero, Team, Account) {

    var popoverUrl = 'templates/tabs/heroes/heroEditPopover.html';
    var editModalUrl = 'templates/tabs/heroes/editHero.html';
    var selectTeamPopoverUrl = 'templates/tabs/feedback/selectTeamPopover.html';
    var addHeroModalUrl = 'templates/tabs/heroes/addHero.html';
    
    $scope.editHero = {};

    //popover menu
    $ionicPopover.fromTemplateUrl(popoverUrl, {
      scope: $scope
    }).then(function(popover){
      $scope.popover = popover;
    });

    //popover for team selection
    $ionicPopover.fromTemplateUrl(selectTeamPopoverUrl, {
      scope: $scope
    }).then(function(popover){
      $scope.selectTeamPopover = popover;
    });

    //modal to edit feedback items
    $ionicModal.fromTemplateUrl(editModalUrl, {
      scope: $scope, 
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.editModal = modal;
    });

    //open popover
    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    }; 
    //hide popover
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //popup for delete option
    $scope.deleteHero = function() {
      //hide popup after click
      $scope.popover.hide();
      $ionicPopup.confirm({
        title: 'Are you sure?',
        template: '<center>Are you sure you want to delete this hero?</center>',
        cancelText: 'No',
        okText: 'Yes'
      }).then(function(res) {
        //if yes
        if(res) {
          Hero.deleteHero($scope.item._id)
          .then(DeleteSuccess, DeleteFailed)
        } 
        //if no
        else {
          $scope.popover.hide();
        }
      });
    }

    //show modal view
    $scope.openEditHero = function(hero) {
      //hide popup after click
      $scope.popover.hide();
      //slide in modal view
      $scope.editModal.show();
      //assign hero to different object to avoid changes outside of modal
      $scope.editHero = hero;
      //select current team
      $scope.selectTeam($scope.editHero.teamId);
      //tag hero
      $scope.tagHero($scope.editHero.hero);
    }

    //hide modal view
    $scope.closeHero = function() {
      $scope.editHero = {};
      $scope.editModal.hide();
    }
    //submit editted feedback
    $scope.submitEdit = function() {
      console.log($scope.editHero);
      Hero.editHero(
        $scope.editHero.teamId,
        $scope.editHero._id,
        $scope.editHero.selectedHero.accountId,
        $scope.editHero.content,
        true)
      .then(SubmitSuccess, SubmitFailed)
      console.log('submit edit');
    } 

    $scope.searchHeroes = function(keyword) {
      Team.searchMembers(Hero.getCurrentHeroTeamId(), keyword).then(function (res) {
        $scope.heroResults = res.data.teamMembers;
      });
      return $scope.heroResults;
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

    //open popover
    $scope.openTeamPopover = function($event) {
      $scope.selectTeamPopover.show($event);
    }; 
    //hide popover
    $scope.closeTeamPopover = function($event) {
      $scope.selectTeamPopover.hide($event);
    };
    //show modal view
    $scope.addHero = function() {
    //modal for new feedback items
    $ionicModal.fromTemplateUrl(addHeroModalUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {      
      Team.getMembers($scope.editHero.teamId).then(function(res) {
        $scope.editHero.allHeroes = res.data.teamMembers;
        $scope.heroResults = $scope.editHero.allHeroes;
      });
      $scope.editHero.searchHero = '';
      $scope.addHeroModal = modal;
      $scope.addHeroModal.show();
    })
      
    }
    //hide modal view
    $scope.closeAddHero = function() {
      if ($scope.addHeroModal) {
        $scope.addHeroModal.hide();
      }
    }
    //tag hero
    $scope.tagHero = function(hero) {
      $scope.editHero.selectedHero = hero;
      $scope.closeAddHero();
    }

    $scope.checkUserInTeam = function () {
      if ($scope.editHero.selectedHero) {
        Team.searchMembers($scope.editHero.teamId, $scope.editHero.selectedHero.name).then(function (res) {
          if (res.data.teamMembers && res.data.teamMembers.length === 0) {
            $scope.editHero.selectedHero = '';
          }
        });
      }
    }
    //select team name and id
    $scope.selectTeam = function (ID) {
      //set initial names for teams
      $scope.teamName = Account.getCurrentAccount().teamName;
      $scope.orgName = Account.getCurrentAccount().organizationName;
      //check if id is team or organization
      if (ID == Account.getCurrentAccount().teamId || ID == 'teamId') {
        $scope.editHero.teamId = Account.getCurrentAccount().teamId;
        $scope.editHero.selectedTeamName = $scope.teamName;
        $scope.checkUserInTeam();
      }
      else if (ID == Account.getCurrentAccount().organizationId || ID == 'organizationId') {
        $scope.editHero.teamId = Account.getCurrentAccount().organizationId;
        $scope.editHero.selectedTeamName = $scope.orgName;
      }
      $scope.closeTeamPopover();
    }

    function DeleteSuccess(res) {
      //if API call was successful
      if (res.data.success) {
        $rootScope.$emit('HeroEdited',{});
        $state.go('app.tabs.heroes');
      }
    }

    function DeleteFailed(res) {
      //if API call failed
      console.log("Delete failed ", res);
    }
   
    function SubmitSuccess(res) {
      if(res.status === 200){
        console.log('success');
        //hide modal view
        $scope.editModal.hide();
        //clear scope
        $scope.editHero = {};
        $scope.detailRefresh();
        $rootScope.$emit('HeroEdited',{});       
      }
      else {
        $scope.editHero.message = res.data.message;
      }
    }

    function SubmitFailed(res) {
      //if API call failed
      $scope.editHero.message = res.data.message;
    }  
  }]);



  
 