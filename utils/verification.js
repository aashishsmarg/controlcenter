const config = require("../config/config.js")
const con = require("../config/database");

exports.verifyToken = function (auth_token, callback) {
    con.query('SELECT * from  user where auth_token=?', [auth_token], function (err, result) {
        if (err) {
            return (err, null);
        }
        else {
            if (result.length == 1) {

                callback(null, result[0].id)
            }
            else {
                callback(null, false);
            }
        }
    });

}


exports.verifyPassword = function (username, password, callback) {
    con.query('select password from user where username=?', [username], function (error, result) {
        if (error) {
            callback(error, null)
        }
        else {
            if (result.length > 0) {
                if (password == result[0].password) {
                    callback(null, true)
                }
                else {
                    callback(null, false)
                }
            } else {
                callback(null, false)
            }
        }
    });
}

exports.verifyRole = function (username, password, role, callback) {
    con.query('select role from user where username=? and password=?', [username, password], function (error, result) {
        if (error) {
            callback(error, null)
        }
        else {
            if (role == result[0].role) {

                callback(null, true)
            }
            else {
                callback(null, false)
            }
        }
    });
}
