angular
  .module('app')

  // ALL STICKERSHEETS
  .controller('AllStickerSheetsController', ['$scope', '$rootScope', 'StickerSheet', function($scope, $rootScope,
      StickerSheet) {
    if($rootScope.currentUser.hasAccess !== true) {
      $scope.stickerSheets = StickerSheet.find({
        filter: {
          where: {
            publisherId: $rootScope.currentUser.id
          },
          include: [
            'place',
            'user'
          ]
        }
      });
    } else {
      $scope.stickerSheets = StickerSheet.find({
        filter: {
          include: [
            'place',
            'user'
          ]
        }
      });
    }
  }])

  // DELETE STICKERSHEET
  .controller('DeleteStickerSheetController', ['$scope', 'StickerSheet', '$state',
      '$stateParams', function($scope, StickerSheet, $state, $stateParams) {
    StickerSheet
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('all-sticker-sheets');
      });
  }])

  // EDIT STICKERSHEET
  .controller('EditStickerSheetController', ['$scope', '$q', 'Place', 'StickerSheet',
      '$stateParams', '$state', function($scope, $q, Place, StickerSheet,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.places = [];
    $scope.selectedShop;
    $scope.stickerSheet = {};
    $scope.isDisabled = true;

    $q
      .all([
        Place.find().$promise,
        StickerSheet.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        console.log($stateParams.id);
        var places = $scope.places = data[0];
        $scope.stickerSheet = data[1];
        $scope.selectedShop;

        var selectedShopIndex = places
          .map(function(place) {
            return place.id;
          })
          .indexOf($scope.stickerSheet.placeId);
        $scope.selectedShop = places[selectedShopIndex];
      });

    $scope.submitForm = function() {
      $scope.stickerSheet.placeId = $scope.selectedShop.id;
      $scope.stickerSheet
        .$save()
        .then(function(stickerSheet) {
          $state.go('all-sticker-sheets');
        });
    };
  }])

  // MY STICKERSHEETS
  .controller('MyStickerSheetsController', ['$scope', 'StickerSheet', '$rootScope', '$timeout',
    function($scope, StickerSheet, $rootScope, $timeout) {
      $scope.stickers = ['1','2','3','4','5','6','7','8','9','10'];

      StickerSheet.find({
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
        $scope.stickerSheets = data;
        console.log('StickerSheet count:', $scope.stickerSheets[0].count);
        // Create a function that returns sticker count and applies to ng-class
        $scope.stickerCount = function() {
          return $scope.stickerSheets[0].count - 1;
        };
      });
    }
  ]);

  
  /*
  // ADD STICKERSHEET
  .controller('AddStickerSheetController', ['$scope', 'Place', 'StickerSheet',
      '$state', function($scope, Place, StickerSheet, $state) {
    $scope.action = 'Add';
    $scope.places = [];
    $scope.selectedShop;
    $scope.stickerSheet = {};
    $scope.isDisabled = false;

    Place
      .find()
      .$promise
      .then(function(places) {
        $scope.places = places;
        $scope.selectedShop = $scope.selectedShop || places[0];
      });

    $scope.submitForm = function() {
      StickerSheet
        .create({
          count: $scope.stickerSheet.count,

          // comments: $scope.stickerSheet.comments,
          placeId: $scope.selectedShop.id
        })
        .$promise
        .then(function() {
          $state.go('all-sticker-sheets');
        });
    };
  }])
*/
