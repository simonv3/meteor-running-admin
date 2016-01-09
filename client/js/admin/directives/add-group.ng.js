angular.module('meteor-running-admin')
  .directive('addGroup',
    function () {
      return {
        restrict: 'A',
        scope: {
          groups: '=groups',
        },
        controller: function ($scope) {
          $scope.showAddGroupForm = false;
          $scope.toggleAddGroup = function() {
            $scope.showAddGroupForm = !$scope.showAddGroupForm;
          };
          $scope.addGroup = function(group) {
            $scope.groups.push(group);
            $scope.toggleAddGroup();
          };
        },
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/directives/add-group.html',
      };
  });
