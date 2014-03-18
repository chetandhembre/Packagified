/**
 * Created by ichetandhembre on 17/3/14.
 */

var MYSQL_DB = require('../../../db/mysql');
var _ = require('underscore');
var async = require('async');


//task to save nodepackages use for particular node.js modules

var saveNodePackages = function(requestData, callback) {
    if(!Array.isArray(requestData)) {
        requestData = [requestData];
    }

    //only unique elements are fetch from datastore
    requestData = _.uniq(requestData);
    async.waterfall([
        function(callback) {

            //fetch all enrtry for requestData keys
            MYSQL_DB.getNodePackagesFromIds(requestData, callback);
        }, function(result, callback) {

            //parse result and get only value of 'name' attributes
            var presentIds = getColumnValue(result, 'name');


            //get all entry who are not present mysql
            var idsToStore = _.difference(requestData, presentIds);
            //save all entry which are not present in datastore
            if(idsToStore && idsToStore.length > 0) {
                MYSQL_DB.saveNodePackage(idsToStore, callback);
            } else {
                callback(null, 'nothing to save!!');
            }
        }
    ], callback);


};


/**
 * return array for column value from table
 * @param requestData
 * @param columnname
 * @returns {Array}
 */
var getColumnValue = function(requestData, columnname) {
    if(!Array.isArray(requestData)) {
        requestData = [requestData];
    }

    var result = [];

    for(var i = 0 ; i < requestData.length; i++) {
        var data = requestData[i];
        if(data && data[columnname]) {
            result.push(data[columnname]);
        }
    }

    return result;

}

exports.saveNodePackages = saveNodePackages;


var testIt = function() {
    saveNodePackages(["demo", "1", "2"], function(err, response) {
       console.log(err);
       console.log(response);
    });
};

//testIt();