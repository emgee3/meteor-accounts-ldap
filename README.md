Accounts-LDAP for Meteor
===============

This is a ugly, ugly hacked together LDAP authenticating mechanism for Meteor. It's not generalized, contains a bunch of extraneous code, is disorganized, etc. It's probably completely insecure.

***It should be viewed as a proof of concept, and nothing more.***

That said, when one logs in with a username and password, it does check said username and password against an LDAP server and does let you in when used in Meteor 0.6.4. 

Installation
============

* Copy to `/packages` in your project.
* Disable the extra Accounts feature:

```
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Accounts.config({
  forbidClientAccountCreation: true
});
```
* Update lines 10-21 in `ldap.js` with your server's data
* Lines 14-18 in `ldap-handler.js` determine whether or not nonexistent Meteor accounts are created when a person's LDAP credentials check out.


Notes
=====

* Bootstrap is a hard-coded requirement
* Because I ripped off https://github.com/erobit/meteor-accounts-ui-bootstrap-dropdown for the UI
  * `logon_buttons_*` are from this package
  * Lines 392-411 in `login_buttons_dropdown.js` is the code that triggers the LDAP login 
  * Almost all of the other code in these files is unused
* You shouldn't have the `accounts-ui` package installed in your app. The parts that are needed are already in this package.
* The LDAP search strings are Active Directory-specific
* ***The typed-in username and password is sent to the Meteor server unencrypted***
* There's no code to check if the LDAP connection failed. 
* There's no client-side notification if anything goes wrong.
* Make sure you don't actually use this code.

