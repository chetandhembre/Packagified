/**
 * Created by ichetandhembre on 17/2/14.
 */

var GITHUB_API = require('../../../api').GITHUB;
var sf = require('sf');
var requestClient = require('../../../util/requestClient');

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
    var api_url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_URL,{user: username});
    requestClient.callApiGET({
        url : api_url
    }, callback);
};

/*
fetchUserInfo({
    username : 'npm'
}, function(err, res){
    console.log(err);
    console.log(res);
});
*/

exports.fetchUserInfo = fetchUserInfo;
