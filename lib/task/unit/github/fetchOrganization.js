/**
 * Created by ichetandhembre on 25/2/14.
 */


var GITHUB_API = require('../../../api').GITHUB;
var sf = require('sf');
var requestClient = require('../../../util/requestClient');

var fetchOrganization = function(requestData, callback){
    if(typeof requestData !== 'object') {
        if(callback) {
            callback('1st argument should be object');
        }
        return;
    }

    if(!requestData.org) {
        callback('1st argument should have org property');
        return;
    }

    var api_url = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_ORG_URL, {org : requestData.org});

    requestClient.callApiGET({
        url : api_url
    }, callback);
};

/*fetchOrganization( {
    org : 'npm'
}, function(err, response) {
    console.log(err);
    console.log(response);
});*/



exports.fetchOrganization = fetchOrganization;