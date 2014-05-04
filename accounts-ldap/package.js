Package.describe({
  summary: "LDAP logon account"
});

Npm.depends({'ldapjs' : '0.7.1'});

Package.on_use(function (api) {
  api.use(['templating'], 'client');
  api.use(['accounts-base', 'accounts-password'], 'server');
  
  api.add_files(["ldap-client.js","login-handler.js"], "server");

  api.export('LDAP', 'server');
});

