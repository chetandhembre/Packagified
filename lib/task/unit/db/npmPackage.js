/**
 * Created by ichetandhembre on 14/3/14.
 */


var COUCH_DB = require('../../../db/counchdb');
var async = require('async');
var _ = require('underscore');

var saveNpmPackageDetails = function(requestData, callback) {
    COUCH_DB.savePackage(requestData, callback);
};

var addToSearchMap = function(requestdata, callback) {
    if(typeof  requestdata != 'object') {
        if(callback) {
            callback('1st argument should be object');
        }
        return;
    }

    console.log(requestdata.keywords);
    if(!requestdata.keywords) {
        callback('keyword should be provided');
        return;
    }

    if(!requestdata.packagename) {
        callback('package should be provided');
        return;
    }

    if(!Array.isArray(requestdata.keywords)) {
        requestdata.keywords = [requestdata.keywords];
    }

    async.waterfall([
        function(callback) {
            COUCH_DB.fetchFromKeywords(requestdata.keywords, callback);
        }, function(result, callback) {

            var docs = newkeywords(result.rows, requestdata.keywords, requestdata.packagename);
            COUCH_DB.saveKeywords({
                docs : docs
            }, callback);
        }
    ], callback);

}

var newkeywords = function(rows, keywords, packageName) {
    var row = [];
    var present = [];
    for(var i = 0; i < rows.length; i++) {
        if(rows[i].key){
            if(keywords.indexOf(rows[i].key) != -1) {
                if(!Array.isArray(rows[i].doc.packages)) {
                    rows[i].doc.packages = [rows[i].doc.packages];
                }
                var oldArray = rows[i].doc.packages;

                if(oldArray.indexOf(packageName) == -1) {
                    oldArray.push(packageName);
                }
                present.push(rows[i].doc.packages);
                row.push({
                     _id : rows[i].key,
                     _rev : rows[i].doc._rev,
                     packages: oldArray
                });
            }
        }
    }

    var absent = _.difference(keywords, present);

    for(var i = 0; i < absent.length; i++) {
        row.push({
            _id : absent[i],
            packages: [packageName]
        });
    }

    return row;
};

var testIt = function() {
    addToSearchMap({
        keywords : ["1","2", "3", "4"],
        packagename : 'lru3'
    }, function(err, response) {
//        console.log(err);
        console.log(response);
    });
};
exports.saveNpmPackageDetails = saveNpmPackageDetails;
exports.addToSearchMap = addToSearchMap;

//testIt();