const db = require("../models");
//const Camera_group = db.Camera_group;
const config = require("../config/config.js")
const con = require("../config/database");
const validation = require("../validation/validation");
var cameraGroupModelObj = require("../models/camera_group.model.js");
const toc = require("../utils/verification");
var moment = require('moment'),
timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: timestamp },
  transports: [
    new winston.transports.File({ filename: 'Surveillance.log'  }),
  ],
});

exports.findAll = (req, res) => {
    auth_token = req.header('auth_token')
    logger.info('in find all')
   if(auth_token==null || auth_token==undefined || auth_token==''){
        res.status(200).send({
            responsedata: config.auth_token_required,
        });
   }
    else{
   toc.verifyToken(auth_token, function (error2, data) {
        if (error2) {
            res.status.send({
                responsedata: config.internal_server_error,
           });
        }
        else {
            if(data)
            {
                logger.info('auth token is verified')
            if (req.query.gateway_id != null) {
                keyArray = ['gateway_id'];
                if ((validationdata = validation.checkKeyValue(req.query, keyArray)) != true) {
                    res.status(206).send({
                        message: validationdata
                    });
                }
               else {
                    const gateway_id = req.query.gateway_id;
                    logger.info('gateway_id'+req.query.gateway_id)
                    var Data=[]
                    cameraGroupModelObj.getCameraGroupByGatewayId(gateway_id, function (err, cameraGroupsData) {
                        if (err) {
                            // error handling code goes here
                            res.status(500).send({
                                responsedata: config.internal_server_error,
                            });
                        } else {
                            // logger.log()
                            Data=cameraGroupsData;
                            res.status(200).send({
                                responsedata: config.success,
                                result: cameraGroupsData
                            });
                        }
                    });
                }
            } else {
                logger.info('in camera group controller getALLCameraGroup')
                cameraGroupModelObj.getAllCameraGroup(function (err, all_cg_data) {
                    if (err) {
                        logger.info('in cameraGroupController')
                        // error handling code goes here
                        res.status(500).send({
                            responsedata: config.internal_server_error,
                        });
                    } else {
                        if(all_cg_data==null){
                            res.status(404).send(
                                {
                                    responsedata: config.no_data_found,
                                    // result: all_cg_data
                                });
                        }
                        else{
                               res.status(200).send({
                                    responsedata: config.success,
                                    result:all_cg_data
                                });
                       }
                        // code to execute on data retrieval
                   }
                });
            }
        }
        else{
            res.status(200).send({
                responsedata: config.session_expierd,
            });
       }
        }
    });
}
}
