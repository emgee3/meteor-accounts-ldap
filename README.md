Accounts-LDAP for Meteor
===============

This is a proof of concept LDAP add-on to Meteor Accounts.

That said, when one logs in with a username and password, it does check said username and password against an LDAP server.

This code has been updated for Meteor 0.8.1.1 but is completely untested as I'm not near a network that has an LDAP server currently.

Installation
============

* Copy to `/packages` in your project.

```
// if using Accounts UI, you could add something lik
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Accounts.config({
  forbidClientAccountCreation: true
});
```
* Update lines 10-23 in `ldap-client.js` with your server's data
* Lines 14-15 in `ldap-handler.js` determine whether or not nonexistent Meteor accounts are created when a person's LDAP credentials check out.


Usage
=====

    Accounts.callLoginMethod({
      methodArguments: [{ username : 'username', password : 'password' }],
      userCallback: function (error, result) {
        if (error) {
          console.log(error || "Unknown error");
        }
      }
    });

Notes
=====

* The LDAP search strings are Active Directory-specific
* ***The typed-in username and password is sent to the Meteor server unencrypted***
* There's no code to check if the LDAP connection failed. 

