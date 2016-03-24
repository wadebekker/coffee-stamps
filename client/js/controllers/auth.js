angular
  .module('app')

  // LOGIN
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
  function($scope, AuthService, $state) {
    $scope.user = {
      // email: 'Email address', // Create Placeholder
      // password: 'Password' // Create Placeholder
    };

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
      .then(function() {
        console.log('logged in successfully')
      });
    }; 
  }])

  // LOGOUT
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
  function($scope, AuthService, $state) {
    AuthService.logout()
    .then(function() {
      
    });
  }])

  // SIGN UP/REGISTER
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
  function($scope, AuthService, $state) {  
    $scope.user = {
      // email: 'Email Address', // Create Placeholder
      // password: 'Create a Password' // Create Placeholder
    };

    $scope.register = function() {
      AuthService.register($scope.user.email, $scope.user.password)
      .then(function() {     
        
      });
    };
  }]);





