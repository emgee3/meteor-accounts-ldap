Accounts.registerLoginHandler(function(loginRequest) {

  if (! loginRequest.hasOwnProperty('loginType')) return undefined;
  if (loginRequest.loginType !== "LDAP") return undefined;

  if (LDAP.checkAccount(loginRequest)) {

    var userId;
    var user = Meteor.users.findOne({ username : loginRequest.username });
    if (user) {
      userId = user._id;
    } else {

      // pass on to next loginHandler
      return undefined;

      // or create new account
      // userId = Meteor.users.insert({ username : loginRequest.username });
    }

    var stampedToken = Accounts._generateStampedLoginToken();
    Meteor.users.update(userId,
      {$push: {'services.resume.loginTokens': stampedToken}}
    );

    return {
      id: userId,
      token: stampedToken.token
    };
  }

});

