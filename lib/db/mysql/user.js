/**
 * Created by ichetandhembre on 20/2/14.
 */
var queryManager = require('./queryManager');
var userData = require('../../../Api-Response/github/fetchUser.json');
var orgData = require('../../../Api-Response/github/fetchOrg.json');
var sf = require('sf');

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


var fetchUserByOrganization = function(requestData, callback) {
    /*
     SELECT login  FROM RelaventPackage.User where isprocess = 0 and type !='Organization' order by updateTime, createdTime Limit 0, 10;
     *
     * */

    var limit = 10;
    if(requestData.limit) {
        limit = parseInt(requestData.limit) || limit ;
    }

    var query = "SELECT login FROM RelaventPackage.User where isorgprocess = 0 and type !='Organization' order by updateTime, createdTime Limit 0, "  + limit

    queryManager.fireQuery(query, callback);
 }

var fetchUserByRepo = function(requestData, callback) {
    /*
    * SELECT login, repos, repoprocess   FROM RelaventPackage.User where isrepoprocess = 0 and repoprocess = 0 order by updateTime, createdTime Limit 0, 10;
    * */

    var limit = 10;
    if(requestData.limit) {
        limit = parseInt(requestData.limit) || limit ;
    }

    var query = 'SELECT login FROM RelaventPackage.User where isrepoprocess = 0 and repoprocess = 0 order by updateTime, createdTime Limit 0, ' + limit;

    queryManager.fireQuery(query, callback);

 }

var fetchUserByRepoOld = function(requestData, callback) {
    /*
    * SELECT login, repos, repoprocess   FROM RelaventPackage.User where isrepoprocess = 0 and repoprocess != 0 order by updateTime, createdTime Limit 0, 10;
    * */

    var limit = 10;
    if(requestData.limit) {
        limit = parseInt(requestData.limit) || limit ;
    }

    var query = 'SELECT login, repos, repoprocess   FROM RelaventPackage.User where isrepoprocess = 0 and repoprocess != 0 order by updateTime, createdTime Limit 0, ' + limit;

    queryManager.fireQuery(query, callback);

 }

/**
 * use to update  user repo for seting organization process for true
 * @param requestData
 * @param callback
 */
var updateUserOrgInfo = function(requestData, callback) {
    /*
    * update RelaventPackage.User SET isorgprocess = 1 where login in ('chetandhembre', 'isaacs');
    * */


    if(!requestData.login) {
        callback('login should be present');
        return;
    }

    if(!Array.isArray(requestData.login)) {
        requestData.login = [requestData.login];
    }

    var query = 'update RelaventPackage.User SET isorgprocess = 1 , updateTime = "{updateTime}" where login in ({login})'

    var updateTime = queryManager.mysqlTimeStampData();

    var login = [];
    for(var i = 0; i < requestData.login.length; i++) {
        login.push('"'+requestData.login[i]+'"')
    }

    login = login.join(',');
    query = sf(query, {updateTime : updateTime, login: login});
    queryManager.fireQuery(query, callback);
};

exports.saveGitHubUser = saveGitHubUser;
exports.fetchUserByOrgranization = fetchUserByOrganization;
exports.fetchUserByRepo = fetchUserByRepo;
exports.fetchUserByRepoOld = fetchUserByRepoOld;
exports.updateUserOrgInfo = updateUserOrgInfo;


var testSaveGitHubUser = function() {
    require('../counchdb/Userdb').saveGitHubUserProfile(orgData, function(err, response) {
        if(err) {
            console.log(err);
            return;
        } else {
            console.log(response);
            orgData.userId = response.id;
            orgData.userrev = response.rev;
            saveGitHubUser(require('../dataFormator/mysql-user').formateGithubUser(orgData), function(err, response) {
                console.log(err);
                console.log(response);
                return;
            });
        }
    });

};




/**
 * return in following format
 * [ { login: 'chetandhembre' } ]
 */
var testFetchUserByOrganization = function() {
    fetchUserByOrganization({
        limit : 10
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })
};

/**
 * return type
 * [ { login: 'chetandhembre' },
 { login: 'isaacs', repos: 301, repoprocess: 0 } ]
 */
var testFetchUserByRepo = function() {
    fetchUserByRepo({
        limit : 10
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })
};

/**
 * return type
 * [ { login: 'isaacs', repos: 301, repoprocess: 1 } ]
 */
var testFetchUserByRepoOld = function() {
    fetchUserByRepoOld({
        limit : 10
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })
};

/**
 * return type
 * [ { login: 'isaacs', repos: 301, repoprocess: 1 } ]
 */
var testUpdateUserOrgInfo = function() {

    updateUserOrgInfo({
        login : [
            "chetandhembre", "isaacs"
        ]
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })
};




//testSaveGitHubUser();
//testFetchUserByOrganization();
//testFetchUserByRepo();
//testFetchUserByRepoOld();
testUpdateUserOrgInfo();