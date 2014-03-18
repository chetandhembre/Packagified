/**
 * Created by ichetandhembre on 14/3/14.
 */

var NPM =  require('../unit').NPM;
var async = require('async');
var DB = require('../unit').DB;

var fetchNpmPackage = function(requestData, callback) {
    async.waterfall([
        function(callback) {
            NPM.fetchPackageMetaData(requestData, callback);
        }, function(result, callback) {
            if(!result) {
                callback('unable to fetch packageinfo from npm');
                return;
            }

            var keywords = NPM.getNpmPackageKeyword(result);
            DB.addToSearchMap({
                keywords : keywords,
                packagename : requestData.packagename
            }, callback);
        }
    ], callback);
}

var testIt = function() {
    fetchNpmPackage({
        packagename : 'request'
    }, function(err, response) {
       console.log(err);
       console.log(response);
    });
}

//testIt();