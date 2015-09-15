Package.describe({
  name: 'yp2:confirm-modal-bs3',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple Bootstrap 3 confirm modal',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['templating', 'spacebars', 'ui'], 'client');
  api.versionsFrom('1.1.0.3');
  api.addFiles('confirmModal.html', 'client');
  api.addFiles('confirmModal.js', 'client');

});
