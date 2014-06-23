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

//create mysql timestamp format data
var jps_makeTimestamp = function(){
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var ss = date.getSeconds();
    var mysqlDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
    return mysqlDateTime;
}

exports.mysqlTimeStampData = jps_makeTimestamp;

exports.fireQuery = fireQuery;