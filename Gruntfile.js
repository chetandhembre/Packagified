/**
 * Created by ichetandhembre on 23/6/14.
 */
'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: [
					'test/unit/**/**/fetchGithubUser_test.js'
				] //order is matter .. so first unit test happen and then integrated test
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-mocha-test');

	// Default task.
	grunt.registerTask('default', ['mochaTest']);

};
