/**
 * Created by ichetandhembre on 20/2/14.
 */

var repoData = require('../../../Api-Response/github/fetchRepo.json');
var selectJSRepo = require('../../task/unit/github/selectJSRepo');

//format data so that it should save in mysql
var formateGithubUser = function(data) {
    var saveUser = {};

    if(!data.id) {
        throw new Error("id of user should be present");
    }

    saveUser.id = data.id;

    if(!data.login) {
        throw new Error('login value should present');
    }

    saveUser.login = data.login.toString();

    if(!data.public_repos) {
        throw new Error('public repo should be present');
    }

    saveUser.repo = data.public_repos;

    saveUser.createdTime = jps_makeTimestamp();
    if(!data.type) {
        throw new Error('type of user should specified');
    }

    saveUser.type = data.type.toString();

    saveUser.userId = data.userId.toString();
    saveUser.userrev = data.userrev.toString();

    return saveUser;
};


var formatGithubRepo = function(data) {
    var githubRepo = {};
    if(!data.id) {
        throw new Error("id of user should be present");
    }

    githubRepo.id = data.id;

    if(!data.owner && !data.owner.login) {
        throw new Error("owner of github should be present");
    }

    githubRepo.owner = data.owner.login;

    if(!data.language) {
        throw new Error("language of github should be present");
    }

    githubRepo.language = data.language;

    if(!data.html_url) {
        throw new Error("url of github should be present");
    }
    githubRepo.url = data.html_url;


    if(!data.name) {
        throw new Error("name of github should be present");
    }

    githubRepo.name = data.name;

    githubRepo.createdtime = jps_makeTimestamp();

    githubRepo.isprocessed = false;

    return githubRepo;

};


var formatGithubOrgs = function(data) {
    var responseData = {
        login : []
    };

    for(var i = 0; i < data.length; i++) {
        if(data[i].login) {
            responseData.login.push(data[i].login);
        }
    }

    return responseData;

}

//create mysql timestamp format data
var jps_makeTimestamp = function(){
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var ss = date.getSeconds();
    var mysqlDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
    return mysqlDateTime;
}


var testIt = function() {
    var gitHubrepo = [];

    for(var i = 0; i < repoData.length; i++) {
        if(selectJSRepo.selectJSRepo(repoData[i])) {
            gitHubrepo.push(formatGithubRepo(repoData[i]));
        }
    }
    console.log(gitHubrepo);
}


var testformatGithubOrgs = function() {
    console.log(formatGithubOrgs(require('../../../Api-Response/github/fetchUserOrgs.json')));
}

//testformatGithubOrgs();
exports.formateGithubUser = formateGithubUser;
exports.formatGithubRepo = formatGithubRepo;
exports.formatGithubOrgs = formatGithubOrgs;
exports.mysqlTimeStampData = jps_makeTimestamp;