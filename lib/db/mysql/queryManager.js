/**
 * Created by ichetandhembre on 20/2/14.
 */
var pool = require('./connectionPool').pool;

var fireQuery = function(query, callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            console(err);
            throw err;
        }
//        console.log(connection);
        selectDb('RelaventPackage', connection);
        console.log(query);
        connection.query( query,  function(err, rows){
            if(err)	{
                console.log(err);
            }
            console.log(rows);

        });

        connection.release(function() {
            console.log('released!!');
        });
        callback(null, true);
        return;
    });
};

var selectDb = function(db, connection) {
    connection.query('use '+db);
};

exports.fireQuery = fireQuery;