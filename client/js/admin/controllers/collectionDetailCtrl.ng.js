
angular.module('meteor-running-admin').controller('CollectionDetailCtrl',
  function ($scope, $q, $meteor, $state, $stateParams, $rootScope) {
    var vm = this;
    $scope.collection = $stateParams.collection;
    $scope.collectionStr = $stateParams.collection.toLowerCase();
    $q.all([
      $scope.$meteorSubscribe($scope.collectionStr)
    ]).then(function(data) {
      $scope.viewingCollection = $meteor.collection(window[$scope.collection]);
      $scope.collectionProperties = [];

      // We need to organize each possible collection.
      // Check that a nested thing has an id. If it does, just reference that.

      // This can be enhanced with a schema?

      for (var property in $scope.viewingCollection[0]) {
        console.log(property);
        if ($scope.viewingCollection[0].hasOwnProperty(property)) {
          $scope.collectionProperties.push(property);
        }
      }
    });
});
