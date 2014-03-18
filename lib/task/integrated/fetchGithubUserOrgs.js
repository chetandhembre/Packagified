/**
 * Created by ichetandhembre on 11/3/14.
 */
var async = require('async');
var GITHUB_TASK = require('../unit').GITHUB;
var DB = require('../unit').DB;


var fetchGuthubUserOrgs = function(username, callback) {
    if(!username) {
        if(callback && typeof callback == 'function') {
            callback('username should be prrovided');
        }
        return;
    }

    async.waterfall([
        function(callback) {
            GITHUB_TASK.FETCH_ORGS.getGithubUserOrgs({
                user: username
            }, callback)
        },
        function(requestData, callback) {
            DB.saveGitHibUserOrgs(requestData, callback);
        }
    ],callback);
}



var testIt = function() {
    fetchGuthubUserOrgs('isaacs', function(err, response) {
        console.log(err);
        console.log(response);
    });
};

//testIt();

exports.fetchGibhubUserOrgsTask = fetchGuthubUserOrgs;