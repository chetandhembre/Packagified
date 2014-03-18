/**
 * Created by ichetandhembre on 17/3/14.
 */

var Constansts = require('../../Constants');
var nano = require('nano')(Constansts.COUCHDB_CONNECTION_URL);
var searchmap = nano.db.use('searchmap');

var saveKeywords = function(requestdata, callback) {
    if(typeof requestdata != 'object') {
        if(callback){
            callback('1st argument should be object');
        }
        return;
    }

    if(!requestdata.docs) {
        callback('docs can not be null');
        return;
    }

    searchmap.bulk(requestdata, function(err, body, header) {
        if(err) {
            callback(err);
            return;
        } else {
            callback(null, body);
            return;
        }
    });
};


var fetchFromKeywords = function(requestdata, callback) {
    if(!Array.isArray(requestdata)) {
        requestdata = [requestdata];
    }

    searchmap.fetch({
        key : requestdata
    }, function(err, body, header) {
        if(err) {
            callback(err);
            return;
        } else {
            callback(null, body);
        }
    });

};

exports.fetchFromKeywords = fetchFromKeywords;
exports.saveKeywords = saveKeywords;

var testIt = function() {
    fetchFromKeywords([
        "demo",
        "demo1"
    ], function(err, response) {
        console.log(err);
        console.log(response.rows[0].doc);
    })
};

//testIt();

var testMultipleUpdate = function() {
    saveKeywords({
        "docs" : [
            {
                _id : "demo1",
                packages: ["node"]
            },{
                _id : "demo3",
                packages: ["node"]
            }
        ]
    }, function(err, response) {
        console.log(err);
        console.log(response);
    })
}
//testMultipleUpdate();