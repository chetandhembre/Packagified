/**
 * Created by ichetandhembre on 24/2/14.
 */

var Constansts = require('../../Constants');
var nano = require('nano')(Constansts.COUCHDB_CONNECTION_URL);
var userdb = nano.db.use('user');
var user = require('../../../Api-Response/github/fetchUser.json');

var saveGitHubUserProfile = function(bio, callback) {
    if(!bio || typeof bio !== 'object') {
       callback('bio should not be undefined and type of object');
       return;
    }

    userdb.insert(bio, function(err, body, header) {
        if (err) {
            callback(err.message);
            return;
        }

        callback(null, body);
        return;
    });
};

var getGitHubUserProfile = function(req, callback) {
    if(!req.id || !req.rev) {
        callback('id and rev tag can not be null');
    }

    userdb.get('9da5c1155ee78abba9e87d2bc900165a', function(err, body, header) {
       console.log(err);
       console.log(body);
       console.log(header);
    });
}

//saveGitHubUserProfile(user);
/*getGitHubUserProfile({
    id : '12',
    rev : '12'
});*/


exports.saveGitHubUserProfile = saveGitHubUserProfile;