/**
 * Created by ichetandhembre on 10/3/14.
 */

var async = require('async');
var GITHUB_TASK = require('../unit').GITHUB;
var DB = require('../unit').DB;
var fetchGibhubUserTask = function(username, callback) {
     async.waterfall([
        function(callback) {
            GITHUB_TASK.FETCH_USER.fetchUserInfo({
                username : username
            }, function(err, response) {
               if(err) {
                   callback(err);
               } else {
                   callback(null, response);
               }
            });
        },
        function(requestData, callback) {
            DB.saveGitHubUser(requestData, function(err, response) {
                if(err) {
                    callback(err);
                } else {
                    callback(null, response);
                }
            });
        }
     ], callback);
};

var testIt = function() {
    fetchGibhubUserTask('isaacs', function(err, response) {
       console.log(err);
       console.log(response);
    });
};

//testIt();
exports.fetchGibhubUserTask = fetchGibhubUserTask;
