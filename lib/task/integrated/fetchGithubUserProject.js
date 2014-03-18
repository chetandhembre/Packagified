/**
 * Created by ichetandhembre on 13/3/14.
 */

var async = require('async');
var GITHUB_TASK = require('../unit').GITHUB;
var DB = require('../unit').DB;

var fetchGithubUserProject = function(requestData, callback) {
    async.waterfall([
        function(callback) {
            GITHUB_TASK.FETCH_REPO.fetchUserRepos(requestData, callback);
        }, function(result, callback) {
            if(!result) {
                callback('error while fetch user repo');
            }

            for(var i = 0; i < result.length; i++) {
                if(GITHUB_TASK.SELECT_JS_REPO.selectJSRepo(result[i])) {
                    DB.saveGithHbRepo(result[i], function(err, response) {
                        if(err) {
                            callback(err);
                            return;
                        }
                        console.log(response);
                    });
                }
            }
        }

    ], callback);
}


var testIt = function() {
      fetchGithubUserProject({
            username : 'npm'
      }, function(err, response) {
          console.log(err);
          console.log(response);
      })
};


//testIt();

exports.fetchGithubUserProject = fetchGithubUserProject;
