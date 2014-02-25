/**
 * Created by ichetandhembre on 24/2/14.
 */

var sf = require('sf');
var GITHUB_API = require('../../api').GITHUB;
var CallGitHubAPI = require('./callGithubApi');


var getGithubUserOrgs = function(request, callback) {
    if(typeof request !== 'object') {
        if(callback) {
            callback('request should be object');
        }
        return;
    }

    if(!request.user) {
        callback('request should contain user attribute');
        return;
    }

    var api_url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_ORGS_URL, {user : request.user});
    CallGitHubAPI.callApiGET({
        url : api_url
    }, callback);
}


getGithubUserOrgs({
    user:'isaacs'
}, function(err, response) {
    console.log(err);
    console.log(response);
});

exports.getGithubUserOrgs = getGithubUserOrgs;
