/**
 * Created by ichetandhembre on 23/6/14.
 */

var should = require('should')
  , fetchGUser = require('../../../../../lib/task/unit/github/fetchUser')

describe('test:fetchUserInfo', function () {
	it('username is not string', function (done) {
		fetchGUser.fetchUserInfo(12, function (err, response) {
			should.exists(err)
			should.not.exists(response)
			err.should.be.instanceOf(Error)
			err.message.should.be.equal('username should be string')
			done()
		})
	})
})


/*
 fetchUserInfo({
 username : 'npm'
 }, function(err, res){
 console.log(err);
 console.log(res);
 });
 */