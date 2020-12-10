const config = require("../config/config.js")
const con = require("../config/database");
var cameragroupsByGatewayId = [];
var cameragroupsById = [];
var cameragroupsAll = [];
var areas={}
var final_result = new Array();
var moment = require('moment'),

timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
const winston = require('winston');
const e = require("express");
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: timestamp },
  transports: [
    new winston.transports.File({ filename: 'Surveillance.log'  }),
  ],
});
exports.getCameraGroupByGatewayId = function (gateway_id, callback) {
    logger.info('in camera_group model getCameraGroupByGatewayId')
    var response;
    con.query('select camera_group.id,camera_group.display_name as camera_group_name,camera_group.site_id,site.display_name as site_name from camera_group,gateway_camera_group_mapping,site WHERE camera_group.id= gateway_camera_group_mapping.cg_id and site.id=camera_group.site_id and gateway_camera_group_mapping.is_deleted=0 and gateway_camera_group_mapping.gateway_id=?', [gateway_id], function (error, result, fields) {    
        if (error) {
            callback(err, null);
        }
        else {
            
            logger.info(JSON.stringify(result))
            var cmpgrpgtwid = 0
            for (var i in result) {
                let dataToSend = {};
                dataToSend = result[i];
                dataToSend["cameras"] = [];
                cameraDetail(result[i].id, function (err, detail) {
                    if (err) {
                   } else {
                    
                        dataToSend["cameras"] = detail;
                        cmpgrpgtwid = cmpgrpgtwid + 1;
                   }
                   if (cmpgrpgtwid == result.length) {
                        cameragroupsByGatewayId.push(dataToSend);
                        callback(null, cameragroupsByGatewayId);
                        cameragroupsByGatewayId = [];
                    } else {
                        cameragroupsByGatewayId.push(dataToSend);
                    }
               });
            }
        }
    });
};
exports.getAllCameraGroup = function (callback) {
    logger.info('in camera_group model getAllCameraGroup function')
    con.query('select id,name,latitude,longitude,site_id,created_at from camera_group where is_deleted=0', function (error, result, fields) {
        if (error) {
            callback(error, null);
        }
        else {
            var count=result.length;
           for (var i in result) {
                count--;
                let dataToSend = {};
                dataToSend = result[i];
                dataToSend["cameras"] = [];
                cameraDetail(result[i].id, function (err, detail) {
                    if (err) {
                    } else {
                        dataToSend["cameras"] = detail;
                        cameragroupsAll.push(dataToSend);
                   }
               });
                if(count==0){
                    logger.info(JSON.stringify(cameragroupsAll))
                    callback(null, cameragroupsAll);
                    cameragroupsAll = [];
                }
           }
        }
    });
    
};
function cameraDetail(cg_id, callback) {
    console.log(cg_id)
    logger.info('in camera_group model cameraDetail function')
    con.query('SELECT id,ip_address,url,camera_group_id,display_name as camera_name from camera where camera_group_id=? and is_deleted=0', [cg_id], function (err, camera_result) {
        if (err)
            callback(err, null);
        else {
            if(camera_result.length==0){
                logger.info('no camera is configured for this group')
                callback(null,[])
            }
            else{
            var count1=camera_result.length
            var cdt = 0
            for (var i in camera_result) {
                count1--
                let dataToSend = {};
                dataToSend = camera_result[i];
                dataToSend["areas"] = [];
                areaDetail(camera_result[i].id, function (err, detail) {
                    if (err) {
                    } else {
                        dataToSend["areas"] = detail;
                        cdt = cdt + 1;
                   }
                    if (cdt == camera_result.length) {
                        cameragroupsAll.push(dataToSend);
                        callback(null, camera_result);
                   } else {
                    }
                });
           }
        }
        }
    });
}
function areaDetail(camera_id, callback) {
    logger.info('in areaDetail function')
    con.query('SELECT id,area_type,vertices,point_to_foot,lane_width,lane_count,dis_bet_lane,direction,camera_id,display_name as area_name FROM `camera_covered_area` where camera_id=? and is_deleted=0', [camera_id], function (err, area_result) {
        if (err)
            callback(err, null);
        else {
            callback(null, area_result);
        }
    });
}
