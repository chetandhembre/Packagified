/**
 * Created by ichetandhembre on 4/3/14.
 */

var sf = require('sf');
var GITHUB_API = require('../../api').GITHUB;
var CallGitHubAPI = require('./callGithubApi')
var encodeDecode = require('../../util/encodeDecode');


var fetchPackageJson = function(requestData, callback) {
    if(typeof requestData !== 'object') {
        if(callback) {
            callback('1st argument should be an object');
            return;
        }
    }
    if(!requestData.owner) {
        callback('owner should not null');
        return;
    }

    if(!requestData.repo) {
        callback('repo should be not be null');
        return;
    }

    var url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_REPO_PACKAGE_JSON_URL, {owner : requestData.owner, repo : requestData.repo});

    CallGitHubAPI.callApiGET({
        url: url
    }, function(err, response) {
        if(err) {
            callback(err);
            return;
        } else {

            if(response.message) {
                callback(response);
                return;
            } else {
                callback(null, response);
                return;
            }
        }
    });
};


var testIt = function(){
    fetchPackageJson({
       owner : 'isaacs',
       repo : 'st'
    }, function(err, data) {
        console.log(err);
        if(data.content) {
            try {
                console.log(encodeDecode.decodeBase64(data.content));
            } catch (e) {
                console.log(e);
            }

        }
    });
}


var testItFail = function() {
    fetchPackageJson({
        owner : 'isaacs',
        repo : 'goosp'
    }, function(err, data) {
        console.log(err);
        console.log(data);
    });
};

testIt();
testItFail();

/*
* {
 "message": "Not Found",
 "documentation_url": "http://developer.github.com/v3"
 }
*
* */
var fetchPackageJson = fetchPackageJson;