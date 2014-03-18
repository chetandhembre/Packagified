/**
 * Created by ichetandhembre on 20/2/14.
 */
var pool = require('./connectionPool').pool;

var fireQuery = function(query, callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            callback(err);
            return;
        }
        selectDb('RelaventPackage', connection);
        connection.query( query,  function(err, rows){
            connection.release();
            callback(err, rows);
            return;
        });

    });
};

var selectDb = function(db, connection) {
    connection.query('use '+db);
};

exports.fireQuery = fireQuery;