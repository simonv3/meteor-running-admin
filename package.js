Package.describe({
  name: 'simonv3:meteor-running-admin',
  version: '0.4.3',
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

  api.use('angular@1.3.1', 'client');
  api.use('angular-meteor-auth@0.0.2', 'client');

  api.use('simonv3:meteor-running-models@0.0.2', ['client', 'server']);

  api.addFiles('meteor-running-admin.js', ['client']);

  var clientFiles = [
    'client/js/admin/directives/add-group.ng.js',
    'client/js/admin/directives/add-group.html',
    'client/js/admin/directives/manage-users.ng.js',
    'client/js/admin/directives/manage-users.html',
    'client/js/admin/directives/manage-sites.ng.js',
    'client/js/admin/directives/manage-sites.html',
    'client/js/admin/directives/manage-groups.ng.js',
    'client/js/admin/directives/manage-groups.html',
    'client/js/admin/controllers/adminCtrl.js',
    'client/js/admin/controllers/setupCtrl.js',
    'client/js/admin/controllers/collectionDetailCtrl.js',
    'client/js/admin/views/admin.html',
    'client/js/admin/views/setup.html',
    'client/js/admin/views/collection-detail.html',
    'client/js/lib/routes.js',
  ];

  api.addFiles(clientFiles, 'client');

});

Package.onTest(function(api) {
  // api.use('tinytest');
  // api.use('simonv3:meteor-running-admin');
  // api.addFiles('meteor-running-admin-tests.js');
});
