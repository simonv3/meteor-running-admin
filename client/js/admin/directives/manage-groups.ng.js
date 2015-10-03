angular.module('meteor-running-admin')
  .directive('manageGroups',
    function () {
      return {
        restrict: 'A',
        scope: {
          groups: '=manageGroups',
        },
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/directives/manage-groups.ng.html',
      };
  });
