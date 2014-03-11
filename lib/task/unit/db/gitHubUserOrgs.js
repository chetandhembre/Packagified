/**
 * Created by ichetandhembre on 11/3/14.
 */


var MYSQL = require('../../../db/mysql');
var QUERY_FORMATOR = require('../../../db/dataFormator');

var saveGitHubUserOrgs = function(requestData, callback) {
    if(!requestData) {
        return;
    }

    if(!Array.isArray(requestData)) {
        callback('1st arguement should be array of orgs info');
        return;
    }

    MYSQL.saveGitHibOrgs(QUERY_FORMATOR.formatGithubOrgs(requestData), callback);

};

var testIt = function() {
    saveGitHubUserOrgs(require('../../../../Api-Response/github/fetchUserOrgs.json'), function(err, response) {
        console.log(err);
        console.log(response);
    })
};

//testIt();


exports.saveGitHibUserOrgs = saveGitHubUserOrgs;


