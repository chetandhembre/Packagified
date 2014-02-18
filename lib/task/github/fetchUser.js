/**
 * Created by ichetandhembre on 17/2/14.
 */

var request = require('request');
var Constants = require('../../Constants');
var GITHUB_API = require('../../api').GITHUB;

var fetchUserInfo = function(userObject, callback) {

    if(arguments.length < 2) {
        if(arguments[0] && typeof arguments[0] == 'function') {
            arguments[0]('function require userObject to proceed');
        }
        return;
    }

    if(typeof userObject != 'object') {
        callback('first arguement has to object');
        return;
    }

    if(typeof  userObject.username !== 'string') {
        callback('username should be string');
        return;
    }

    var username = userObject.username;

    fetchGithubUser(username, callback);

};


var fetchGithubUser = function(username, callback) {
    request({
        method : 'GET',
        uri: GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_URL+username,
        headers : {
            'User-Agent': 'request'
        }
    }, function(err, res, body) {
        if(!err) {
            var response;
            try {
                response = JSON.parse(body);
            } catch (e) {
                callback('internal error', e.message);
                return;
            }

            if(res.statusCode == Constants.FORBIDDEN_CODE) {
                console.log('rate limit');
                console.log(response);
            } else if(res.statusCode == Constants.OK) {
                callback(null, response);
                return;
            }
        }
        callback('error while fetching github user');
        return;
    });
}

/*
fetchUserInfo({
    username : 'chetandhembre'
}, function(err, res){
    console.log(err);
    console.log(res);
});
*/

exports.fetchUserInfo = fetchUserInfo;
