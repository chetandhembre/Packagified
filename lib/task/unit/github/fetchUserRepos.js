/**
 * Created by ichetandhembre on 26/2/14.
 */

var GITHUB_API = require('../../../api').GITHUB;
var sf = require('sf');
var requestClient = require('../../../util/requestClient');
var conflate = require('conflate');
var queryString = require('querystring');

var defaultOptions = {
    type : 'owner',
    sort : 'full_name',
    direction : 'asc',
    per_page:100    //we ask to get about 100 repo per request
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

    if(!requestData.page) {
        callback('page value should provided');
        return;
    }

    var options = defaultOptions;
    if(requestData.options) {
        options = conflate(options, requestData.options);
    }

    options = queryString.stringify(options);
    var api_url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_REPO_URL, {user:requestData.username, page : requestData.page, queryString: options});

    requestClient.callApiGET( {
        url : api_url
    }, callback);
};


fetchUserRepos({
    username:'isaacs',
    page : 1,
    options : {
        type : 'owner',
        sort : 'created',
        direction : 'asc'
    }
}, function(err, response) {
    console.log(err);
    console.log(response.length);
});

exports.fetchUserRepos = fetchUserRepos;