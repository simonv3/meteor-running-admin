
angular.module('meteor-running-admin').controller('AdminCtrl',
  function ($scope, $q, $meteor, $state, $rootScope) {

  $scope.$state = $state;

  $q.all([
    $scope.$meteorSubscribe('users'),
    $scope.$meteorSubscribe('sites'),
    $scope.$meteorSubscribe('groups'),
    ]).then(function(data){
      $scope.users = $meteor.collection(Meteor.users);
      $scope.site = $meteor.collection(Sites)[0];
      $scope.groups = $meteor.collection(Groups);
    }, function(error) {
      console.log("errored", error);
    });

  $scope.exportData = function() {
    var self = this;
    Meteor.call("exportAllResponses", function(error, data) {

      if ( error ) {
        alert(error);
        return false;
      }

      var csv = Papa.unparse(data);
      self._downloadCSV(csv);
    });
  };

  $scope._downloadCSV = function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = "data.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  };

  $scope.sendTestEmail = function() {
    Meteor.call('sendEmail',
            $scope.currentUser.emails[0].address,
            $scope.currentUser.emails[0].address,
            'Hello from Meteor!',
            'This is a test of Email.send.');
  };

  $scope.clearResults = function() {
    var success = confirm("This will remove all results so far, are you sure?");
    if (success) {
      $scope.responses.remove();
    }
  };

  $scope.resetUsers = function() {
    var success = confirm("This will set all users to not completed the survey");
    if (success) {
      $scope.$meteorSubscribe('users').then(function() {
        $scope.users = $meteor.collection(Meteor.users);

        $scope.users.forEach(function(user) {
          var fetchedUser = $meteor.object(Meteor.users, user._id, false);
          fetchedUser = fetchedUser.subscribe('users');
          // Do thing to reset
          fetchedUser.save();
        });
      });
    }
  };
});
