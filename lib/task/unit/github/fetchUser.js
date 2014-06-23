/**
 * Created by ichetandhembre on 17/2/14.
 */

var GITHUB_API     =  require('../../../api').GITHUB
	, sf             =  require('sf')
	, requestClient  =  require('../../../util/requestClient')
	, _              =  require('lodash')

/**
 * call github api to fetch user info
 * @param username    {String}  //require
 * @param callback
 * @returns {*|Function}
 */
var fetchUserInfo = function(username, callback) {

  var argLength = arguments.length
	  , callback
	  , username
	  , apiUrl

	if (argLength <  1) return;

	callback = callback || function (err, res) {}

	username = arguments[0]
	if (_.isUndefined(username) || !_.isString(username)) {
		return callback(new Error('username should be string'))
	}

  apiUrl = sf(GITHUB_API.NO_AUTHENTICATION.PUBLIC_USER_URL, {user: username});
  requestClient.callApiGET({
    url : apiUrl
  }, callback);
};


exports.fetchUserInfo = fetchUserInfo;
