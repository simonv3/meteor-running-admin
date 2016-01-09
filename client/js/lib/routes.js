angular.module('meteor-running-admin').config([
  '$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/views/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor){
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      })
      .state('collectionDetail', {
        url: '/admin/:collection',
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/views/collection-detail.html',
        controller: 'CollectionDetailCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor) {
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      })
      .state('setup', {
        url: '/setup',
        templateUrl: '/packages/simonv3:meteor-running-admin/client/js/admin/views/setup.html',
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
                  var site = $meteor.collection(Sites, false)[0];
                  var numOfAdmin = $meteor.object(Counts ,'numberOfAdmin', false);

                  if (numOfAdmin.count !== 0 && site.has_been_set_up === true) {
                    reject('SET_UP_COMPLETE');
                  } else if (numOfAdmin.count !== 0) {
                    reject('UNAUTHORIZED');
                  } else {
                    console.log('Going to setup...')
                    resolve();
                  }
                });
              });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }])
  .run(function($rootScope, $q, $state) {
    console.log('Seeing if the site needs to be set up...')

    var users = Meteor.users.find({is_admin: true}).fetch()
    if (users.length === 0) {
      // There isn't an admin user.
      $state.go('setup')
    } else {
      var sites = Sites.find({has_been_set_up: true}).fetch()

      if (sites.length > 0) {
        var site = sites[0];
        if (site.has_been_set_up === undefined &&
          !$rootScope.currentUser &&
          !$rootScope.loggingIn) {
          $state.go('setup');
        }
      }
    }
  });
