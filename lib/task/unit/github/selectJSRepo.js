/**
 * Created by ichetandhembre on 28/2/14.
 */

var repoData = require('../../../../Api-Response/github/fetchRepo.json');
var language = ['JavaScript', 'CoffeeScript'];


var selectJSRepo = function(repoDetails) {
    if(typeof repoDetails === 'object') {
        return JSRepoSelectionAlgo(repoDetails);
    }

    throw new Error('repo details should be object');
};


/*
*   following algorithm we are using to find given repo is javascript repo or not
*
*   1) language should be of 'JavaScript' or 'CoffeeScript'
* */
var JSRepoSelectionAlgo = function(repoDetails) {
    if(repoDetails.language && language.indexOf(repoDetails.language) != -1) {
        return true;
    }

    return false;
};

var testIt = function() {
    for(var i = 0; i < repoData.length; i++) {
        if(selectJSRepo(repoData[i])) {
            console.log(repoData[i].language);
        }
    }
}

//testIt();

exports.selectJSRepo = selectJSRepo;

