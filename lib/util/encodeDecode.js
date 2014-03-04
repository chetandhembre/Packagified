/**
 * Created by ichetandhembre on 4/3/14.
 */


var decodeBase64 = function(base64Data) {
    return new Buffer(base64Data, 'base64').toString('ascii')
};

var isValidBase64 = function(base64Data) {
    console.log(base64Data);
    return /^[A-Za-z0-9=+\/]+$/.test(base64Data);
}

exports.decodeBase64 = decodeBase64;
