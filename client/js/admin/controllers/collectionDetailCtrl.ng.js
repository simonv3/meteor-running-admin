
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

      for (var property in $scope.viewingCollection[0]) {
        if ($scope.viewingCollection[0].hasOwnProperty(property)) {
          $scope.collectionProperties.push(property);
        }
      }

      $scope.collectionProperties.sort(function(one, two) {
        if (one === '_id') return true;
        if (two === '_id') return true;
        return false;
      });

      // We need to organize each possible collection.
      // Check that a nested thing has an id. If it does, just reference that.

      // This can be enhanced with a schema?

      $scope.transformedCollection = [];

      $scope.viewingCollection.forEach(function(object, idx) {
        tempObj = {};
        $scope.collectionProperties.forEach(function(property) {
          if (object[property]) {
            if (object[property].hasOwnProperty('_id')) {
              tempObj[property] = object[property]._id;
            } else if (Array.isArray(object[property])) {
              tempObj[property] = object[property].length;
            } else {
              tempObj[property] = object[property];
            }
          }
        });
        $scope.transformedCollection.push(tempObj);
      });
    });
});
