Package.describe({
  summary: "LDAP logon account"
});

Npm.depends({'ldapjs' : '0.6.3'});

Package.on_use(function (api) {
  api.use(['accounts-urls', 'accounts-base', 'underscore', 'templating', 'bootstrap'], 'client');

  api.add_files([
  api.add_files(["ldap.js","ldap-handler.js"], "server");

  api.export('LDAP', 'server');
});
