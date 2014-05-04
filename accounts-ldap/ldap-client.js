var Future  = Npm.require('fibers/future');
var ldap    = Npm.require('ldapjs');
ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

LDAP = {};

LDAP.ldap = ldap;

// Settings
LDAP.serverIP = '172.16.0.1';
LDAP.serverPort = 389;
LDAP.searchQuery = function (username) {
  // This is Active Directory Specific!!!!
  return {
    filter: '(&(objectCategory=person)' +  // search for people
      '(sAMAccountName=' + username + ')' +  // where the username = options.username
      '(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))',  // and the account isn't disabled
    scope: 'sub'
  };
};
LDAP.searchOu = 'OU=User Accounts,OU=Staff,DC=ad,DC=example,DC=com';
LDAP.searchDn = 'CN=SearchAcct,CN=Users,DC=ad,DC=example,DC=com';
LDAP.searchPassword = 'password123';


//Create Connections
LDAP.client = ldap.createClient({
  url: 'ldap://' + LDAP.serverIP + ':' + LDAP.serverPort
});


LDAP.client.bind(LDAP.searchDn, LDAP.searchPassword, function (err) {
  if (err) throw new Meteor.Error(500, 'LDAP server error');
});


LDAP.checkAccount = function(options) {
  options = options || {};

  if (options.hasOwnProperty('username') && options.hasOwnProperty('password')) {

    var future = new Future;

    var dn = [];

    LDAP.client.search(LDAP.searchOu, LDAP.searchQuery(options.username), function (err, search) {

      search.on('searchEntry', function (entry) {
        dn.push(entry.object.distinguishedName);
      });

      search.on('error', function (err) {
        throw new Meteor.Error(500, "LDAP server error");
      });

      search.on('end', function () {
        if (dn.length === 0) {
          future['return'](false);
          return false;
        }

        var testBind = LDAP.ldap.createClient({
          url: 'ldap://' + LDAP.serverIP + ':' + LDAP.serverPort
        });

        testBind.bind(dn[0], options.password, function (err) {
          future['return'](!err);
        });
      });

    });

    return future.wait();

  } else {
    throw new Meteor.Error(400, "Missing Parameter");
  }
};
