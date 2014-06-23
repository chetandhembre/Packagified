/**
 * Created by ichetandhembre on 10/3/14.
 */


var async = require('async');
var COUCH_DB = require('../../../db/counchdb');
var MYSQL_DB = require('../../../db/mysql');
var QUERY_FORMATOR = require('../../../db/dataFormator');

var saveGitHubUser = function(requestData, callback) {
    async.waterfall([
        function(callback) {
            COUCH_DB.saveGitHubUserProfile(requestData, function(err, response) {
               if(err) {
                   callback(err);
               } else {
                   requestData.userId = response.id;
                   requestData.userrev = response.rev;
                   callback(null, requestData);
               }
            });
        }, function(requestData, callback) {
            MYSQL_DB.saveGitHubUser(QUERY_FORMATOR.formateGithubUser(requestData), function(err, response) {
                callback(err, response);
            });
        }
    ], callback);
}


var testIt = function() {
    saveGitHubUser(require('../../../../Api-Response/github/fetchUser.json'), function(err, response) {
        console.log(err);
        console.log(response);
    })
};

/*

* */
//testIt();

exports.saveGitHubUser = saveGitHubUser;
