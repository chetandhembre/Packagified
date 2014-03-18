/**
 * Created by ichetandhembre on 17/3/14.
 */

var querymanager = require('./queryManager');
var sf = require('sf');
var _ = require('underscore');

var saveEntity = function(requestData, callback) {
    if(!Array.isArray(requestData)) {
        requestData = [requestData];
    }
    var names = [];
    for(var i = 0; i < requestData.length; i++) {
        names.push('("' + requestData[i] + '")');
    }
    names = names.join(',');
    var query = 'insert into nodepackages (name) values {names}';
    query = sf(query, {names:names});
    querymanager.fireQuery(query, callback);

};

var getEntity = function(requestData, callback) {

};

var getEntitiesFromIds = function(requestData, callback) {
    if(!Array.isArray(requestData)) {
        if(callback) {
            callback('1st arguement should be array');
        }
        return;
    }

    var query = 'select * from nodepackages where name in ({names})';

    var names = [];
    for(var i = 0; i < requestData.length; i++) {
        names.push('"' + requestData[i] + '"');
    }

    names = names.join(',');

    query = sf(query,{names:names});
    querymanager.fireQuery(query, callback);
}


exports.saveEntity = saveEntity;
exports.getEntity = getEntity;
exports.getEntitiesFromIds = getEntitiesFromIds;


var testIt = function() {
    getEntitiesFromIds(["demo1", "demo2"], function(err, response) {
        if(err) {
            console.log(err);
        }

        console.log(response);
    });
}

var testItSaveEntity = function() {
    saveEntity(["demo22","dem223"], function(err, response) {
        console.log(err);
        console.log(response);
    });
}

//testIt();
//testItSaveEntity();