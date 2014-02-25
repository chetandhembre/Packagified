/**
 * Created by ichetandhembre on 20/2/14.
 */



//format data so that it should save in mysql
var formateDataSave = function(data) {
    var saveUser = {};

    if(!data.id) {
        throw new Error("id of user should be present");
    }

    saveUser.id = data.id;

    if(!data.login) {
        throw new Error('login value should present');
    }

    saveUser.login = data.login.toString();

    if(!data.public_repos) {
        throw new Error('public repo should be present');
    }

    saveUser.repo = data.public_repos;

    saveUser.createdTime = jps_makeTimestamp();
    if(!data.type) {
        throw new Error('type of user should specified');
    }

    saveUser.type = data.type.toString();

    saveUser.userId = data.userId.toString();
    saveUser.userrev = data.userrev.toString();

    return saveUser;
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

exports.formateDataSave = formateDataSave;