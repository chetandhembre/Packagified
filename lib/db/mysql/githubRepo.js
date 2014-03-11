/**
 * Created by ichetandhembre on 28/2/14.
 */

var queryManager = require('./queryManager');
var repoData = require('../../../Api-Response/github/fetchRepo.json');
var queryFormator = require('../dataFormator/mysql-user');
var selectJSRepo = require('.././selectJSRepo');
var saveGitHubRepo = function(data, callback) {
    var query = 'insert into GithubRepo(id, owner, createdtime, isprocessed, language, url, name) values ("'+
        data.id.toString() +'","' +
        data.owner + '","' +
        data.createdtime + '",' +
        data.isprocessed + ',"' +
        data.language + '","' +
        data.url + '","' +
        data.name+'");'

    //fire query
    queryManager.fireQuery(query, callback);
};


var testIt = function() {
    var f = true;
    for(var i = 0; i < repoData.length && f; i++) {
        if(selectJSRepo.selectJSRepo(repoData[i])) {
            saveGitHubRepo(queryFormator.formatGithubRepo(repoData[i]), function(err, response) {
                console.log(err);
                console.log(response);
            });
        }
    }
}

//testIt();

exports.saveGithHbRepo = saveGitHubRepo;