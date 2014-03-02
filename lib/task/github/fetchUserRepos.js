/**
 * Created by ichetandhembre on 26/2/14.
 */

var GITHUB_API = require('../../api').GITHUB;
var sf = require('sf');
var CallGitHubAPI = require('./callGithubApi');
var conflate = require('conflate');
var queryString = require('querystring');

var defaultOptions = {
    type : 'owner',
    sort : 'full_name',
    direction : 'asc'
}

var fetchUserRepos = function(requestData, callback) {
    if(!requestData || typeof  requestData !== 'object') {
        if(callback) {
            callback('1st argument should be object');
        }
        return;
    }

    if(!requestData.username) {
        callback('username can not be undefined');
        return;
    }

    var options = defaultOptions;
    if(requestData.options) {
        options = conflate(options, requestData.options);
    }

    options = queryString.stringify(options);
    var api_url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_REPO_URL, {user:requestData.username, queryString: options});

//    console.log(api_url);
    CallGitHubAPI.callApiGET( {
        url : api_url
    }, callback);
};


fetchUserRepos({
    username:'isaacs',
    options : {
        type : 'owner',
        sort : 'created',
        direction : 'asc'
    }
}, function(err, response) {
    console.log(err);
    console.log(response);
});
exports.fetchUserRepos = fetchUserRepos;