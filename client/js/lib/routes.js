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
          'checkAdmin': ['$meteor', '$state', '$q', '$rootScope', '$auth',

            function($meteor, $state, $q, $rootScope, $auth) {

              return $q(function(resolve, reject) {
                $auth.waitForUser().then(function() {
                  Meteor.call('isSetUp', function(err, isSetUp){
                    console.log('ran is set up', isSetUp)
                    if (isSetUp) reject('SET_UP_COMPLETE')

                    console.log('Continueing to setup...')
                    resolve()
                  })
                })
              });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }])
  .run(['$state', '$auth', function($state, $auth) {
    console.log('Seeing if the site needs to be set up...')

    $auth.waitForUser().then(function() {
      Meteor.call('isSetUp', function(err, resp) {
        if (!resp) $state.go('setup')
      })
    })
  }]);
