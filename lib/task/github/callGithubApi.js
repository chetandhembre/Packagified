/**
 * Created by ichetandhembre on 25/2/14.
 */
var request = require('request');
var Constants = require('../../Constants');

var callApiGET = function(requestData, callback) {
      if(typeof requestData !== 'object') {
          if(callback) {
              callback('request should be an object');
              return;
          }
      }

      if(!requestData.url) {
          callback('request should contain url to call');
          return;
      }

      getApiCall(requestData, callback);

};

var getApiCall = function(requestData, callback) {
    request({
        method : 'GET',
        uri: requestData.url,
        headers : {
            'User-Agent': 'request'
        }
    }, function(err, res, body) {
        if(err) {
            callback('Error:'+err);
            return;
        } else {
            var response;
            try {
                response = JSON.parse(body);
            } catch (e) {
                callback(e);
                return;
            }

            if(res.statusCode == Constants.FORBIDDEN_CODE) {
                callback('rate limit')
                return;
            } else {
                callback(null, response);
                return;
            }
        }
    });
}


exports.callApiGET = callApiGET;