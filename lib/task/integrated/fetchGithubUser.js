/**
 * Created by ichetandhembre on 10/3/14.
 */

var async        =  require('async')
	, _            =  require('lodash')
	, GITHUB_TASK  =  require('../unit').GITHUB
	, DB           =  require('../unit').DB

/**
 * fetch user info from github
 * @param username   {String}  //require
 * @param callback
 * @returns {*}
 */
var fetchGibhubUserTask = function(username, callback) {
  var argLength  =  arguments.length
	  , username

	if (argLength <  1)
		return callback(new Error('username should be string'))

	callback  =  callback  ||  function (err, res) {}

	username  = arguments[0]
  if (_.isUndefined(username) || !_.isString(username))
    return callback(new Error('username should be string'))


	async.waterfall([
      function(callback) {
        GITHUB_TASK.FETCH_USER.fetchUserInfo({
          username : username
        }, function(err, response) {
          if(err) {
            callback(err);
          } else {
            callback(null, response);
          }
        });
      }
		,
      function(requestData, callback) {
        DB.saveGitHubUser(requestData, function(err, response) {
          if(err) {
            callback(err);
          } else {
            callback(null, response);
          }
        });
      }
  ], callback);
};

exports.fetchGibhubUserTask = fetchGibhubUserTask;
