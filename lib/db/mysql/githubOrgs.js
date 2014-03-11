/**
 * Created by ichetandhembre on 10/3/14.
 */

var querymanager = require('../mysql/queryManager');
var orgs = require('../../../Api-Response/github/fetchUserOrgs.json');
var queryFormator = require('../dataFormator/mysql-user');

var saveGitHibOrgs = function(requestData, callback) {
    var query = 'insert into Githuborgs (login) values ';
    var values = [];
    for(var i = 0; i < requestData.login.length; i++) {
        values.push('("' + requestData.login[i]+'")');
    }

    values = values.join(',');

    query += values;

    querymanager.fireQuery(query, callback);
}


var testIt = function() {
    saveGitHibOrgs(queryFormator.formatGithubOrgs(orgs), function(err, response) {
        console.log(err);
        console.log(response);
    })
}

exports.saveGitHibOrgs = saveGitHibOrgs;
//testIt();