angular.module('meteor-running-admin')
  .directive('manageUsers',
    function () {
      return {
        restrict: 'A',
        scope: {
          users: '=manageUsers',
        },
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/directives/manage-users.ng.html',
      };
  });
