Package.describe({
  summary: "LDAP logon account"
});

Npm.depends({'ldapjs' : '0.6.3'});

Package.on_use(function (api) {
  api.use(['accounts-urls', 'accounts-base', 'underscore', 'templating', 'bootstrap'], 'client');

  api.add_files([
    'accounts_ui.js',

    'login_buttons_images.css',
    'login_buttons.html',
    'login_buttons_dropdown.html',
    'login_buttons_dialogs.html',

    'login_buttons_session.js',

    'login_buttons.js',
    'login_buttons_dropdown.js',
    'login_buttons_dialogs.js'], 'client');

  api.add_files(["ldap.js","ldap-handler.js"], "server");

  api.export('LDAP', 'server');
});
