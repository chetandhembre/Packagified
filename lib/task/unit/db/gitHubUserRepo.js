/**
 * Created by ichetandhembre on 14/3/14.
 */

var MYSQL_DB = require('../../../db/mysql');
var QUERY_FORMATOR = require('../../../db/dataFormator');

var saveGitHubRepo = function(requestData, callback){
    MYSQL_DB.saveGithHbRepo(QUERY_FORMATOR.formatGithubRepo(requestData), callback);
};

exports.saveGithHbRepo = saveGitHubRepo;