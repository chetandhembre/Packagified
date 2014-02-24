/**
 * Created by ichetandhembre on 20/2/14.
 */
var mysql = require('mysql');
exports.pool = mysql.createPool({
                        host : 'localhost',
                        user : 'root',
                        password: 'chetan1234'
               });