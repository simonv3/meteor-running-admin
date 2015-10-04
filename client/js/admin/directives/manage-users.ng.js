angular.module('meteor-running-admin')
  .directive('manageUsers',
    function () {
      return {
        restrict: 'A',
        scope: {
          users: '=manageUsers',
        },
        link: function($scope) {
          $scope.deleteUser = function (index) {
            var success = confirm("Are you sure you want to delete this user?")
            if (success) {
              $scope.users.splice(index, 1);
            }
          };
        },
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/directives/manage-users.ng.html',
      };
  });
