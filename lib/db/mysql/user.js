/**
 * Created by ichetandhembre on 20/2/14.
 */
var queryManager = require('./queryManager');
var userData = require('../../../Api-Response/github/fetchUser.json');
var orgData = require('../../../Api-Response/github/fetchOrg.json');

var saveGitHubUser = function(data, callback) {
    //building query to insert mysql
    var query = 'insert into User(login, id, repos, createdTime, type, userId, userrev) values ("'+
                data.login.toString() +'",' +
                data.id + ',' +
                data.repo + ',"' +
                data.createdTime + '","' +
                data.type + '","' +
                data.userId + '","' +
                data.userrev+'");'

    //fire query
    queryManager.fireQuery(query, callback);
};


var testSaveGitHubUser = function() {
    require('../counchdb/Userdb').saveGitHubUserProfile(orgData, function(err, response) {
       if(err) {
           console.log(err);
           return;
       } else {
           console.log(response);
           orgData.userId = response.id;
           orgData.userrev = response.rev;
           saveGitHubUser(require('../dataFormator/mysql-user').formateDataSave(orgData), function(err, response) {
               console.log(err);
               console.log(response);
               return;
           });
       }
    });

};

testSaveGitHubUser();
exports.saveGitHubUser = saveGitHubUser;