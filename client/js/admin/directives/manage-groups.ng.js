angular.module('meteor-running-admin')
  .directive('manageGroups',
    function () {
      return {
        restrict: 'A',
        scope: {
          groups: '=manageGroups',
        },
        link: function($scope) {
          $scope.deleteGroup = function (index) {
            var success = confirm("Are you sure you want to delete this group?")
            if (success) {
              $scope.groups.splice(index, 1);
            }
          };
        },
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/directives/manage-groups.html',
      };
  });
