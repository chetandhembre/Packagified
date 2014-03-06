/**
 * Created by ichetandhembre on 6/3/14.
 */
var Constansts = require('../../Constants');
var nano = require('nano')(Constansts.COUCHDB_CONNECTION_URL);
var packagedb = nano.db.use('package');

var savePackage = function(packageMetaData, callback) {

    if(typeof  packageMetaData != 'object') {
        if(callback && typeof callback === 'function') {
            callback('1st arguement should be an object');
        }
        return;
    }

    if(!packageMetaData._id) {
        callback('_id of package is not present');
        return;
    }

    var id = packageMetaData._id;

    //we are setting id for every package entry in couchdb manually
    packagedb.insert(packageMetaData, id,function(err, body, header) {
        if (err) {
            callback(err.message);
            return;
        }

        callback(null, body);
        return;
    });

}


var testIt = function() {
    savePackage(require('../../../Api-Response/npm/packageMetaData.json'), function(err, response) {
        console.log(err);
        console.log(response);
    })
}

//testIt();
exports.savePackage = savePackage;

