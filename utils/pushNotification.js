
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
const config = require("../config/config.js")
const con = require("../config/database");
var FCM = require('fcm-node');
const { json } = require('body-parser');
var serverKey = config.serverKey; // put your server key here
var fcm = new FCM(serverKey);
var device_token = [];
var sendMessage = function (info, camera_group_id) {
    logger.info('in push notification sendMessage function')
    con.query("SELECT `user`.`device_token` as token from `user` ,`user_site_mapping`,`camera_group` where `user_site_mapping`.`site_id`=`camera_group`.`site_id` and `user`.`id`=`user_site_mapping`.`user_id` and `camera_group`.`id`=1 and `user`.`is_deleted`=0 and `user_site_mapping`.`is_deleted`=0", [camera_group_id], function (error1, result1) {
        //con.query("select camera_group_id from camera where id=?",[camera_id],function(error1,result1){
        if (error1) {
            console.log(error1)
        }
        else {
            for (j = 0; j < result1.length; j++) {
                logger.info('device_token:' + result1[j].token)
                demoMessage(info, result1[j].token)
            }
        }
    })
};
module.exports = sendMessage;
function demoMessage(info, to_token) {
    var message = {
        "data": {
            "title": "Smarg Notification",
            "body": info["site_name"] + " " + info["rule_category_name"] + " " + info["rule_name"],
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "fcm_push_icon",
            "foreground": "true"
        },
        "to": to_token,
        "priority": "high",
        "restricted_package_name": ""
    }
    fcm.send(message, function (err, response) {
        if (err) {
            logger.error('' + JSON.stringify(err))
        } else {
            logger.info('' + JSON.stringify(response))
        }
    });
}