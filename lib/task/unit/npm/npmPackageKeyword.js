/**
 * Created by ichetandhembre on 17/3/14.
 */


var npmPackage = require('../../../../Api-Response/npm/packageMetaData.json');
var _ = require('underscore');

var getKeyWord = function(requestData) {

    if(typeof  requestData != 'object') {
        return [];
    }

    var latest;
    var versions = requestData.versions;
    if(requestData["dist-tags"]) {
        latest = requestData["dist-tags"].latest;
    }


    if(versions) {
        if(latest && versions[latest]) {
            return getKeywords(versions[latest]);
        } else {
            var versionList = _(versions).keys();
            latest = _.last(versionList);
            return getKeywords(versions[latest]);
        }
    }

    return [];
};


/**
 * some package may contain keyword in different key
 * like keywords, tags
 * @param latestVersion
 * @returns {Array}
 */
var getKeywords = function(latestVersion) {
    var keyword = [];
    if(latestVersion["keywords"]) {
        keyword = keyword.concat(latestVersion["keywords"]);
    }

    if(latestVersion["tags"]) {
        keyword = keyword.concat(latestVersion["tags"]);
    }

    //send unique keyword
    return _.uniq(keyword);
}



var testIt = function() {
    console.log(getKeyWord(npmPackage));
}

//testIt();




exports.getNpmPackageKeyWord = getKeyWord;