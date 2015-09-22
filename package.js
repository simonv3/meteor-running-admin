Package.describe({
  name: 'simonv3:meteor-running-admin',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'The admin package for Meteor Running',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/simonv3/meteor-running-admin.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles('meteor-running-admin.js');

  var clientFiles = [
    'client/js/admin/controllers/adminCtrl.ng.js',
    'client/js/admin/controllers/setupCtrl.ng.js',
    'client/js/admin/views/admin.ng.html',
    'client/js/admin/views/setup.ng.html',
    'client/js/lib/routes.js',
  ];
  api.addFiles(clientFiles, 'client');

});

Package.onTest(function(api) {
  // api.use('tinytest');
  // api.use('simonv3:meteor-running-admin');
  // api.addFiles('meteor-running-admin-tests.js');
});
