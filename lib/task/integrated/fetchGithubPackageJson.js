/**
 * Created by ichetandhembre on 14/3/14.
 */


var async = require('async');
var GITHUB_TASK = require('../unit').GITHUB;
var encodeDecode = require('../../util/encodeDecode');
var DB = require('../unit').DB;


var fetchGithubPackageJson = function(requestData, callback) {
    async.waterfall([
        function(callback) {
            GITHUB_TASK.FETCH_PACKEGE_INFO.fetchPackageJson(requestData, callback);
        }, function(result, callback) {
            if(result.content) {
                try {
                    var packageJSON = JSON.parse(encodeDecode.decodeBase64(result.content));
                    callback(null, GITHUB_TASK.PACKAGE_PARSE.getDependencies(packageJSON));
                } catch (e) {
                    callback(e);
                }
            } else {
                callback('unable to fetch package.json file');
            }
        }, function(result, callback) {
            DB.saveNodePackages(result, callback);
        }
    ], callback);
};
exports.fetchGithubPackageJson = fetchGithubPackageJson;

var testIt = function() {
    fetchGithubPackageJson({
        owner : 'isaacs',
        repo : 'st'
    }, function(err, response){
        console.log(err);
        console.log(response);
    });
};

//testIt();