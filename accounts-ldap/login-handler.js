Accounts.registerLoginHandler("ldap", function(loginRequest) {
  if (LDAP.checkAccount(loginRequest)) {

    var userId;
    var user = Meteor.users.findOne({ username : loginRequest.username });
    if (user) {
      userId = user._id;
    } else {

      // If no Meteor Account is found for a valid LDAP logon, 
      // you can either prevent logon by passing 'undefined' or
      // you can automatically create the new account.

      // return undefined;
      userId = Meteor.users.insert({ username : loginRequest.username }); 

    }

    return {
      userId: userId
    };
  }

  return undefined;

});
