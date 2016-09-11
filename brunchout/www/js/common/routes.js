angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  /* Authentication & Signup Routes */

  .state('start', {
    url: '/start',
    templateUrl: 'templates/authentication/start.html',
    controller: 'SignInCtrl'
  })
    
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/authentication/signin.html',
    controller: 'SignInCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/authentication/signup.html',
    controller: 'SignUpCtrl'
  }) 

  /********** App (Side Menu)  /**********/

  .state('app', {
    url: '/app',
    templateUrl: 'templates/sidemenu/sideMenu.html',
    abstract:true,
    controller: 'SideMenuCtrl'
  })

  /********** Tabs **********/

  .state('app.tabs', {
    url: '/tab',
    templateUrl: 'templates/tabs/tabs.html',
    abstract:true,
  })

  /** Brunches **/

  .state('app.tabs.brunches', {
    url: '/brunch',
    views: {
      'brunches-tab': {
        templateUrl: 'templates/tabs/brunches/brunches.html',
        controller: 'BrunchCtrl'
      }           
    }
  })

  .state('app.tabs.brunchDetails', {
    url: '/brunch/:brunchId',
    views: {
      'brunches-tab': {
        templateUrl: 'templates/tabs/brunches/brunchDetail.html',
        controller: 'brunchDetailCtrl'
      }            
    }
  })

  /** Team **/ 

  .state('app.tabs.team', {
    url: '/team',
    views: {
      'team-tab': {
        templateUrl: 'templates/tabs/brunches/team.html',
        controller: 'TeamCtrl'
      }
    }
  })

  /********** User **********/

  .state('app.profile', {
    url: '/profile',
    templateUrl: 'templates/user/profile.html',
    controller: 'pulse2Ctrl'
  })  



  /** SideMenu.Settings.Profile **/

  .state('app.sideMenu.userProfile', {
    url: '/userProfile',
    views: {
      'side-menu': {
        templateUrl: 'templates/user/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })


  /** SideMenu.Settings **/ 

  .state('app.sideMenu.settings', {
    url: '/settings',
    views: {
      'side-menu': {
        templateUrl: 'templates/sidemenu/settings/settings.html',
        controller: 'SignOutCtrl'
      }
    }
  })    

  /** SideMenu.Settings.EditProfile **/              

  .state('app.sideMenu.editProfile', {
    url: '/editProfile',
    views: {
      'side-menu': {
        templateUrl: 'templates/sidemenu/settings/profile/editProfile.html',
        controller: 'ProfileCtrl'
      }
    }
  })


  $urlRouterProvider.otherwise('/start')

});

