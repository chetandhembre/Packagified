/**
 * Created by ichetandhembre on 23/6/14.
 */

var should      =  require('should')
  , fetchGUser  =  require('../../../../lib/task/integrated/fetchGithubUser')

describe('test fetchGibhubUserTask', function () {
	it('username is not string', function (done) {
	  fetchGUser.fetchGibhubUserTask(12, function (err, response) {
		  should.exists(err)
		  should.not.exists(response)
		  err.should.be.instanceOf(Error)
		  err.message.should.be.equal('username should be string')
		  done()
	  })
	})


/*
	var testIt = function() {
		fetchGibhubUserTask('isaacs', function(err, response) {
			console.log(err);
			console.log(response);
		});
	};
*/

})