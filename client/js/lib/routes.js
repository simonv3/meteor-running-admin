angular.module('meteor-running-admin').config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/views/admin.ng.html',
        controller: 'AdminCtrl',
        resolve: {
          'currentUser': ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      })
      .state('setup', {
        url: '/setup',
        templateUrl: 'simonv3_meteor-running-admin_client/js/admin/views/setup.ng.html',
        controller: 'SetupCtrl',
        controllerAs: 'sc',
        resolve: {
          'checkAdmin': ['$meteor', '$state', '$q', '$rootScope',
            function($meteor, $state, $q, $rootScope) {
              return $q(function(resolve, reject) {
                $q.all([
                  $meteor.subscribe('sites'),
                  $meteor.subscribe('users')
                ])
                .then(function() {
                  var site = $meteor.collection(Sites, false)[0]
                  var numOfAdmin = $meteor.object(Counts ,'numberOfAdmin', false);

                  if (numOfAdmin.count !== 0 && site.has_been_set_up === true) {
                    reject('SET_UP_COMPLETE');
                  } else if (numOfAdmin.count !== 0) {
                    reject('UNAUTHORIZED');
                  } else {
                    resolve();
                  }
                });
              });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }]);
