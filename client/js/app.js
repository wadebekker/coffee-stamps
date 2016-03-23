angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('add-sticker-sheet', {
        url: '/add-sticker-sheet',
        templateUrl: 'views/sticker-sheet-form.html',
        controller: 'AddStickerSheetController',
        authenticate: true
      })
      .state('all-sticker-sheets', {
        url: '/all-sticker-sheets',
        templateUrl: 'views/all-sticker-sheets.html',
        controller: 'AllStickerSheetsController',
        authenticate: true
      })
      .state('edit-sticker-sheet', {
        url: '/edit-sticker-sheet/:id',
        templateUrl: 'views/sticker-sheet-form.html',
        controller: 'EditStickerSheetController',
        authenticate: true
      })
      .state('delete-sticker-sheet', {
        url: '/delete-sticker-sheet/:id',
        controller: 'DeleteStickerSheetController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-sticker-sheets', {
        url: '/my-sticker-sheets',
        templateUrl: 'views/my-sticker-sheets.html',
        controller: 'MyStickerSheetsController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('please-verify', {
        url: '/please-verify',
        templateUrl: 'views/please-verify.html'
      })

      /*
      .state('first-time-login', {
        url: '/first-time-login',
        templateUrl: 'views/login-first-time.html',
        controller: 'AuthFirstLoginController',
      })
      */
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
