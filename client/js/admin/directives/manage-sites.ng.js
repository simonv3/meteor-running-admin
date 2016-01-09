angular.module('meteor-running-admin')
  .directive('manageSites',
    function () {
      return {
        restrict: 'A',
        scope: {
          site: '=manageSites',
        },
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/directives/manage-sites.html',
      };
  });
