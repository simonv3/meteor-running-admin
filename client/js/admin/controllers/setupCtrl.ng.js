
angular.module('meteor-running-admin').controller('SetupCtrl',
  function ($scope, $meteor, $state, $rootScope) {
    var vm = this;
    vm.newAdmin = {};

    vm.createAdmin = function() {
      vm.newAdmin.is_admin = true;
      $meteor.createUser(vm.newAdmin).then(
        function () {
          $rootScope.currentUser.is_admin = true;
          $scope.user = $meteor.object(Meteor.users, $rootScope.currentUser._id, false).subscribe('users');
          $scope.user.is_admin = true;
          $scope.user.save();
          $state.go('admin');
        },
        function (err) {
          vm.error = err;
        }
      );
    };
});
