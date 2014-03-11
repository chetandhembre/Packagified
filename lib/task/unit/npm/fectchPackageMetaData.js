/**
 * Created by ichetandhembre on 6/3/14.
 */
var NPM_API = require('../../../api').NPM;
var sf = require('sf');
var requestClient = require('../../../util/requestClient');


var fetchPackageMetaData = function(requestData, callback) {
    if(typeof requestData != 'object') {
        if(callback && typeof callback == 'function') {
            callback('1st argument should be object');
        }
        return;
    }

    if(!requestData.packagename) {
        if(callback && typeof callback == 'function') {
            callback('package value should be provided');
        }
        return;
    }

    var packagename = requestData.packagename;

    var url = sf(NPM_API.NO_AUTHENTICATION.FETCH_PACKEGE_INFO, {'packagename': packagename})

    requestClient.callApiGET({
        url : url
    }, callback);
};

var testIt = function() {
    fetchPackeMetaData({
        packagename: 'canvg'
    }, function(err, res) {
        console.log(err);
        console.log(res);
    })
}

//testIt();

exports.fetchPackageMetaData = fetchPackageMetaData;