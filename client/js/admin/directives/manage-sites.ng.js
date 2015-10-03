angular.module('meteor-running-admin')
  .directive('manageSites',
    function () {
      return {
        restrict: 'A',
        scope: {
          site: '=manageSites',
        },
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/directives/manage-sites.ng.html',
      };
  });
