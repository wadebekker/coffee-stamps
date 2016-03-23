angular
  .module('app')
  .factory('AuthService', ['User', 'StickerSheet', '$q', '$rootScope', '$state', function(User, StickerSheet, $q,
      $rootScope, $state) {

    // FIRST TIME LOGIN
    /*
    function firstLogin(email, password) {
      return User
      .login({email: email, password: password})
      .$promise
      .then(function(response) {
        $rootScope.currentUser = {
          id: response.user.id,
          tokenId: response.id,
          email: email,
          hasAccess: response.user.hasAccess
        };
      })
      .then(function(){
        // console.log($rootScope.currentUser);

        var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

        return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email,
            hasAccess: response.user.hasAccess
          };
        })
        .then(function(){
          console.log($rootScope.currentUser);
          var user = $rootScope.currentUser;
          // CREATE STICKER SHEET FOR USER AND SET COUNT TO ZERO
          return StickerSheet
          .create({
            date: Date.now() - (DAY_IN_MILLISECONDS * 2),
            count: 0,
            publisherId: user.id,
            placeId: 1
          })
          .$promise
          .then(function(data) {
            if($rootScope.currentUser.hasAccess !== true) {
              $rootScope.isAdmin = false;
              $rootScope.isGuest = true;
              console.log('Not adminnnn');
              $state.go('my-sticker-sheets'); // User is a Guest
            }
            else {
              $rootScope.isAdmin = true;
              $rootScope.isGuest = false;
              console.log('You are an admin!');
              $state.go('all-sticker-sheets'); // User is an Admin
            }
          });
        });
      // ---- TO HERE
      });
    }
    */

    // LOGIN
    function login(email, password) {
      return User
      .login({email: email, password: password})
      .$promise
      .then(function(response) {
        console.log(response);
        $rootScope.currentUser = {
          id: response.user.id,
          tokenId: response.id,
          email: email,
          hasAccess: response.user.hasAccess
        };
      })
      .then(function(){
        // console.log($rootScope.currentUser);

        if($rootScope.currentUser.hasAccess !== true) {
          $rootScope.isAdmin = false;
          $rootScope.isGuest = true;
          console.log('Not admin');
          console.log('Searching for Sticker Sheets...');
          $rootScope.stickerSheets = StickerSheet.find({
            filter: {
              where: {
                publisherId: $rootScope.currentUser.id
              },
              include: [
                'place',
                'user'
              ]
            }
          })
          .$promise
          .then(function(data) {
            console.log(data);
            if(data[0] === undefined){
              console.log('No sticker sheet yet dude');
              var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
              console.log($rootScope.currentUser);
              var user = $rootScope.currentUser;
              // CREATE STICKER SHEET FOR USER AND SET COUNT TO ZERO
              console.log('creating sticker sheet...');
              return StickerSheet
              .create({
                date: Date.now() - (DAY_IN_MILLISECONDS * 2),
                count: 0,
                publisherId: user.id,
                placeId: 1
              })
              .$promise
              .then(function(data) {
               console.log(data);
               console.log('sticker sheet created');
               $state.go('my-sticker-sheets'); // User is a Guest
              });
            }
            else {
              console.log('There is a sticker sheet');
              console.log(data[0].count);
              $state.go('my-sticker-sheets'); // User is a Guest
            }
          });
        } else {
          $rootScope.isAdmin = true;
          $rootScope.isGuest = false;
          console.log('You are an admin!');
          $state.go('all-sticker-sheets'); // User is an Admin
        }
      });
    }

    // LOGOUT
    function logout() {
      return User
      .logout()
      .$promise
      .then(function() {
        $rootScope.currentUser = null;
        $rootScope.isAdmin = null;
        $rootScope.isGuest = null;
        $state.go('login'); // Log user out and take them to login page
      });
    }

    // REGISTER/SIGN UP
    function register(email, password) {
      return User
      .create({
        email: email,
        password: password
      })
      .$promise
      .then(function() {
        $state.go('please-verify');
      });

      /* COMMENTED OUT BECAUSE OF EMAIL VERIFCATION IN PLACE
      .then(function(user) {
        
        var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

        return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email,
            hasAccess: response.user.hasAccess
          };
        })
        .then(function(){
          // CREATE STICKER SHEET FOR USER AND SET COUNT TO ZERO
          return StickerSheet
          .create({
            date: Date.now() - (DAY_IN_MILLISECONDS * 2),
            count: 0,
            publisherId: user.id,
            placeId: 1
          })
          .$promise
          .then(function(data) {
            if($rootScope.currentUser.hasAccess !== true) {
              $rootScope.isAdmin = false;
              $rootScope.isGuest = true;
              console.log('Not admin');
              $state.go('my-sticker-sheets'); // User is a Guest
            }
            else {
              $rootScope.isAdmin = true;
              $rootScope.isGuest = false;
              console.log('You are an admin!');
              $state.go('all-sticker-sheets'); // User is an Admin
            }
          });
        });
      // ---- TO HERE
      });
      */
    }

    return {
      // firstLogin: firstLogin,
      login: login,
      logout: logout,
      register: register
    };
  }]);
