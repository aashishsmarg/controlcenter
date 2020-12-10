const config = require("../config/config.js")
const con = require("../config/database");
const crypto = require('crypto');
var randtoken = require('rand-token');
var resdata;
var moment = require('moment'),
    timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { timestamp: timestamp },
    transports: [
        new winston.transports.File({ filename: 'Surveillance.log' }),
    ],
});
//////////////////// GET All Sites Data ///////////////
exports.getUserById = function (id, callback) {
    con.query('SELECT * from user where id=?', [id], function (err, result) {
        if (err)
            callback(err, null);
        else
            callback(null, result);
    });
};
exports.getAllUser = function (callback) {
    con.query('SELECT * from user', function (err, result) {
        if (err)
            callback(err, null);
        else
            callback(null, result);
    });
};
exports.userLogin = function (username, password, role, device_token, callback) {
    setDeviceToken(device_token, username, password, function (err, data) {
        if (err)
            console.log(err)
        else
            console.log(data)
    })
    if (role == "gateway") {
        logger.info('in in user.model login function role gateway')
        let obj1 = {}
        var token = randtoken.generate(64);
        //select gateway.id as gateway_ID,controller_details.ip as controller_ip,controller_details.port as controller_port from gateway,user,controller_details where gateway.user_id =user.id and controller_details.gateway_id=gateway.id and  user.username='gateway1' and user.password='gateway_123' and user.role='gateway'
        con.query('select gateway.id as gateway_ID,controller_details.ip as controller_ip,controller_details.port as controller_port from gateway,user,controller_details where gateway.user_id =user.id and controller_details.gateway_id=gateway.id and  user.username=? and user.password=? and user.role=?', [username, password, role], function (err, result) {
            if (err) { callback(err, null); }
            else {
                obj1["gateway_id"] = result[0].gateway_ID
                obj1["controller_ip"] = result[0].controller_ip
                obj1["controller_port"] = result[0].controller_port
                obj1["auth_token"] = token
                // update_auth_token(username, password, role,token)
                con.query('UPDATE user SET auth_token=? WHERE username=? and password=? and role=?', [token, username, password, role], function (err, result) {
                    if (err) {
                        logger.error('' + err)
                        callback(err, null);
                    }
                    else {
                        // logger.info('response='+obj1)
                        callback(null, obj1);
                    }
                });
                // callback(null, obj1);
            }
        });
    }
    else {
        let dataToSend = {}
        let final_data = []
        let token_data = {}
        if (role == 'manager') {
            logger.info('in user.model login function role manager')
            var token = randtoken.generate(64);
            //select `site`.`id`,`site`.`site_name` from `user_site_mapping`,`site` where `site`.`id`=`user_site_mapping`.`site_id` and `site`.`is_deleted`=0 and `user_site_mapping`.`user_id`=(SELECT `id` from user where `username`='ali' and `password`='ali' and `role`='manager' and `is_deleted`=0)
            //con.query('select site_id from user_site_mapping where is_deleted=0 and user_id=(SELECT id from user where username=? and password=? and role=? and is_deleted=0)', [username, password, role], function (err1, result) {
            con.query('select `site`.`id`,`site`.`site_name` from `user_site_mapping`,`site` where `site`.`id`=`user_site_mapping`.`site_id` and `site`.`is_deleted`=0 and `user_site_mapping`.`user_id`=(SELECT id from user where username=? and password=? and role=? and is_deleted=0)', [username, password, role], function (err1, result) {
                if (err1) {
                    // logger.error(''+err1)
                    callback(err, null);
                }
                else {
                    for (i = 0; i < result.length; i++) {
                        console.log(result[i])
                        final_data.push(result[i])
                    }

                    dataToSend["site_ids"] = final_data

                    con.query('UPDATE user SET auth_token=? WHERE username=? and password=? and role=? and is_deleted =0', [token, username, password, role], function (err3, result) {
                        if (err3) {
                            callback(err, null);
                        }
                        else {
                            dataToSend["auth_token"] = token
                            logger.info('updated auth_token' + token)
                            callback(null, dataToSend);
                        }
                    });
                }
            });
        }
        else {
            let data = {}
            logger.info('in user.model login function role=' + role)
            con.query('select * from user where username=? and  password=? and role=? and is_deleted=0', [username, password, role], function (error, result) {
                if (error) {
                    // logger.error(JSON.stringify(error))
                    callback(error, null)
                }
                else {
                    data['id'] = result.id;
                    data['username'] = result.username;
                    data['password'] = result.password;
                    data['email'] = result.email;
                    data['mobile_no'] = result.mobile_no;
                    data['device_token'] = result.device_token;
                    con.query('UPDATE user SET auth_token=? WHERE username=? and password=? and role=?', [token, username, password, role], function (err, result) {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            data['auth_token'] = result.auth_token;
                            logger.info(JSON.stringify(data))
                            callback(null, data);
                        }
                    });
                }
            });
        }
    }
};

exports.update_auth_token = function (username, password, role, auth_token, callback) {
    con.query('UPDATE user SET auth_token=? WHERE username=? and password=? and role=?', [auth_token, username, password, role], function (err, result) {
        if (err)
            callback(err, null);
        else
            callback(null, result);
    });

};

function setDeviceToken(device_token, username, password, callback) {
    // logger.info('in setDeviceToken device_token='+device_token)

    if (device_token != "") {

        con.query("update user set device_token=? where username=? and password=? ", [device_token, username, password], function (error, result) {
            if (error) {
                logger.error('' + error)
                callback(error, null)
            }
            else {
                logger.info('device token is updated')
                callback(null, result)
            }
        })
    }
    callback(null, null)
};
exports.logout = function (auth_token,callback) {
    con.query("update user set device_token='' ,auth_token='' where auth_token=? ", [auth_token], function (error, result) {
            if (error) {
                console.log('device token is not updated')
                callback(error, null)
            }
            else {
                console.log('device token is updated')
                callback(null, result)
            }
        })
};