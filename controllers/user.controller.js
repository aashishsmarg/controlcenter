const config = require("../config/config.js")
const con = require("../config/database");
const user = require('../models/user.model');
const validation = require("../validation/validation");
const toc = require("../utils/verification")
const l = require("../utils/logger")
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


// var logger=l.getLogger

/////////////////////////LOGIN USER////////////
exports.login = (req, res) => {
    logger.info('in log in function')
    keyArray = ['username', 'password', 'role', 'device_token'];
    if ((validationdata = validation.checkKeyValue(req.body, keyArray)) != true) {
        // logger.info('wrong username or password'+req.body.username+''+req.body.password)
        res.status(206).send({
            message: validationdata
        });
    }
    else {
        // logger.info('')
        logger.info('logged in with username=' + req.body.username + ' and  password=' + req.body.password)
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        var device_token = req.body.device_token;
        toc.verifyPassword(username, password, function (error, result) {
            if (error) {
                res.status(500).send(
                    {
                        responsedata: config.internal_server_error,
                    });
            }
            else {
                if (result == false) {
                    res.status(203).send(
                        {
                            responsedata: config.wrong_username_password
                        });
                }
                else {
                    logger.info('logged in with role=' + req.body.role)
                    toc.verifyRole(username, password, role, function (error, result) {
                        if (error) {
                            res.status(500).send(
                                {
                                    responsedata: config.internal_server_error,
                                });
                        }
                        else {
                            // logger.info('invalid role='+req.body.role)
                            if (result == false) {
                                res.status(203).send(
                                    {
                                        responsedata: config.invalid_role,
                                    });
                            }
                            else {
                                if (req.body.auth_token != null) {
                                    logger.info('logged in with auth_token=' + req.body.auth_token)
                                    user.update_auth_token(req.body.username, req.body.password, req.body.role, req.body.auth_token, function (err, results) {
                                        if (err) {
                                            // error handling code goes here
                                            res.status(500).send(
                                                {
                                                    responsedata: config.internal_server_error,
                                                });
                                        } else {
                                            // code to execute on data retrieval
                                            if (results == null) {
                                                res.status(404).send(
                                                    {
                                                        responsedata: config.no_data_found,
                                                    });
                                            }
                                            else {
                                                res.status(200).send(
                                                    {
                                                        responsedata: config.success,
                                                        result: results
                                                    });
                                                res.end(results);
                                            }
                                        }
                                    });
                                }
                                else {
                                    // logger.info('logged in with auth_token='+req.body.auth_token)
                                    logger.info('logged in with username=' + req.body.username + ' and  password=' + req.body.password)
                                    user.userLogin(req.body.username, req.body.password, req.body.role, req.body.device_token, function (err, results) {
                                        if (err) {
                                            // error handling code goes here
                                            res.status(500).send(
                                                {
                                                    responsedata: config.internal_server_error,
                                                });
                                        } else {
                                            // code to execute on data retrieval
                                            if (results == null) {
                                                res.status(404).send(
                                                    {
                                                        responsedata: config.no_data_found,
                                                    });
                                            }
                                            else {
                                                res.status(200).send(
                                                    {
                                                        responsedata: config.success,
                                                        result: results
                                                    });
                                                res.end(results);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
};
/////////////////////////LOGout USER////////////
exports.logout = (req, res) => {
    auth_token = req.header('auth_token')
    if (auth_token == null || auth_token == undefined || auth_token == '') {
        res.status(200).send({
            responsedata: config.auth_token_required,
        });

    }
    else {
        toc.verifyToken(auth_token, function (err, data) {
            if (err) {
                res.status.send({
                    responsedata: config.internal_server_error,

                });
            } else {
                if (data) {
                    keyArray = ['auth_token'];
                    if ((validationdata = validation.checkKeyValue(req.body, keyArray)) != true) {
                        res.status(206).send({
                            message: validationdata
                        });
                    } else{ 
                        if (req.body.auth_token != null) {
                            user.logout(req.body.auth_token, function (err, results) {
                                if (err) {
                                    // error handling code goes here
                                    res.status(500).send(
                                        {
                                            responsedata: config.internal_server_error,
                                        });
                                } else {
                                    // code to execute on data retrieval
                                    if (results == null) {
                                        res.status(404).send(
                                            {
                                                responsedata: config.no_data_found,
                                            });
                                    }
                                    else {
                                        res.status(200).send(
                                            {
                                                responsedata: config.logout_success,
                                            });
                                        res.end(results);
                                    }
                                }
                            });
                        }    
                    }
                } else {
                    res.status(200).send({
                        responsedata: config.session_expierd,
                    });
                }
            }
        });
    }
}
///////////////////////////////Retreiving All User//////////////////////
exports.findAll = (req, res) => {
    logger.info('in find all')
    const id = req.params.id;
    if (id != null) {
        user.getUserById(id, function (err, results_data) {
            if (err) {
                // error handling code goes here
                res.status(500).send({
                    responsedata: config.internal_server_error,
                });
            } else {
                // code to execute on data retrieval
                if (results_data == null) {
                    res.status(404).send(
                        {
                            responsedata: config.no_data_found,
                        });
                }
                else {
                    res.status(200).send(
                        {
                            responsedata: config.success,
                            result: results_data
                        });
                    res.end(results_data);
                }
            }
        });
    }
    else {
        user.getAllUser(function (err, data_results) {
            if (err) {
                // error handling code goes here
                logger.error(err)
                res.status(500).send({
                    responsedata: config.internal_server_error,
                });
            } else {
                // code to execute on data retrieval
                if (data_results == null) {
                    res.status(404).send(
                        {
                            responsedata: config.no_data_found,
                        });
                }
                else {
                    res.status(200).send(
                        {
                            responsedata: config.success,
                            result: data_results
                        });
                    res.end(data_results);
                }
            }
        });
    }
}

