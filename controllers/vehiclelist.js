const db = require("../models");
const config = require("../config/config.js")
const con = require("../config/database");
const validation = require("../validation/validation");
const cameraGroupModelObj = require("../models/camera_group.model.js");
const toc = require("../utils/verification");
const moment = require('moment'),
    timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
const winston = require('winston');
const request = require('request');
const elasticur = 'http://smargtech.in:9201/filebeat-*/_search/';
var myDate;
var chunks;
var formattedDate;
var my_start_time;
var start_chunks;
var formatted_start_Date;
var my_end_time;
var end_chunks;
var formatted_end_Date;
var my_previous_end_time;
var previous_end_chunks;
var formatted_previous_end_Date;
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { timestamp: timestamp },
    transports: [
        new winston.transports.File({ filename: 'Surveillance.log' }),
    ],
});
exports.findAll = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const siteid = req.query.site_id;
    const start = req.query.start
    console.log("from , to siteid", from, to, siteid);
    auth_token = req.header('auth_token')
    if (auth_token == null || auth_token == undefined || auth_token == '') {
        res.status(200).send({
            responsedata: config.auth_token_required,
        });
    } else {
        toc.verifyToken(auth_token, function(error2, data) {
            if (error2) {
                res.status.send({
                    responsedata: config.internal_server_error,
                });
            } else {
                if (from == '' || from == undefined) {
                    console.log("from is undefined")
                    if (data) {
                        logger.info('auth token is verified')
                        console.log("from ====", from, "to ===", to, "start====", start);
                        const requestBody = {
                            "query": {
                                "bool": {
                                    "must": [],
                                    "filter": [
                                        { "term": { "site_id": siteid } },
                                    ]
                                }
                            },
                            "sort": [{
                                "@timestamp": {
                                    "order": "desc"
                                }
                            }]
                        }
                        const requestBodylimoffset = {
                            "from": start,
                            "size": 10,
                            "query": {
                                "bool": {
                                    "must": [],
                                    "filter": [
                                        { "term": { "site_id": siteid } },
                                    ]
                                }
                            },
                            "sort": [{
                                "@timestamp": {
                                    "order": "desc"
                                }
                            }]
                        }
                        // console.log("requestBody id ", requestBody);
                        request(elasticur + '?size=10000', {
                                method: 'GET',
                                headers: {
                                    Accept: 'text/json',
                                    "content-type": "application/json"
                                },
                                json: true,
                                body: requestBody
                            },
                            function(err, res1, body) {
                                if (err) {
                                    console.log("errrrrrr", err);
                                    res.status(200).send({
                                        responsedata: config.success,
                                        result: "errordata"
                                    });
                                }
                                if (body) {
                                    if (body.status == 400) {
                                        const arraydata = [];
                                        res.status(200).send({
                                            responsedata: config.not_data_found,
                                            result: arraydata
                                        });
                                    }
                                    if (body.hits) {
                                        if (body.hits.hits.length > 0) {
                                            console.log(body.hits.total.value);
                                            // const jsondatalength = JSON.parse(JSON.stringify(body.hits.hits.length));
                                            const jsondatalength = body.hits.total.value;
                                            console.log(jsondatalength);
                                            request(elasticur, {
                                                    method: 'GET',
                                                    headers: {
                                                        Accept: 'text/json',
                                                        "content-type": "application/json"
                                                    },
                                                    json: true,
                                                    body: requestBodylimoffset
                                                },
                                                function(err, res1, bodydata) {
                                                    // console.log("bodydata", bodydata);
                                                    const jsondata = JSON.parse(JSON.stringify(bodydata.hits.hits));
                                                    console.log("body", jsondata.length);
                                                    const arraydata = [];
                                                    for (let i = 0; i < jsondata.length; i++) {
                                                        // console.log(JSON.parse(jsondata[i]._source.message));
                                                        const a = JSON.parse(jsondata[i]._source.message);
                                                        console.log("a.datetime", a.dateTime, "a.start_time", a.start_time);
                                                        if (a.dateTime === undefined || a.dateTime === "") {
                                                            formattedDate = '';
                                                        } else {
                                                            myDate = new Date(a.dateTime).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                            chunks = myDate.split('/');
                                                            formattedDate = [chunks[1], chunks[0], chunks[2]].join("-");
                                                        }
                                                        if (a.start_time === undefined || a.start_time === "") {
                                                            formatted_start_Date = '';
                                                        } else {
                                                            my_start_time = new Date(a.start_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                            start_chunks = my_start_time.split('/');
                                                            formatted_start_Date = [start_chunks[1], start_chunks[0], start_chunks[2]].join("-");
                                                        }
                                                        if (a.end_time === undefined || a.end_time === "") {
                                                            formatted_end_Date = '';
                                                        } else {
                                                            my_end_time = new Date(a.end_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                            end_chunks = my_end_time.split('/');
                                                            formatted_end_Date = [end_chunks[1], end_chunks[0], end_chunks[2]].join("-");
                                                        }
                                                        if (a.previous_end_time === undefined || a.previous_end_time === "") {
                                                            formatted_previous_end_Date = '';
                                                        } else {
                                                            my_previous_end_time = new Date(a.previous_end_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                            previous_end_chunks = my_previous_end_time.split('/');
                                                            formatted_previous_end_Date = [previous_end_chunks[1], previous_end_chunks[0], previous_end_chunks[2]].join("-");
                                                        }
                                                        a['date_time'] = formattedDate;
                                                        a['starttime'] = formatted_start_Date;
                                                        a['endtime'] = formatted_end_Date;
                                                        a['previousendtime'] = formatted_previous_end_Date;
                                                        // console.log("datetime", a);
                                                        arraydata.push(a);
                                                    }
                                                    // console.log("jsondatalengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", jsondatalength);
                                                    res.status(200).send({
                                                        responsedata: config.success,
                                                        jsonlength: jsondatalength,
                                                        result: arraydata,
                                                    })
                                                })
                                            const jsondata = JSON.parse(JSON.stringify(body.hits.hits));
                                            console.log("body", jsondata.length);
                                        } else {
                                            const arraydata = [];
                                            res.status(200).send({
                                                responsedata: config.not_data_found,
                                                result: arraydata
                                            });
                                        }
                                    }
                                }
                            })
                    } else {
                        res.status(200).send({
                            responsedata: config.session_expierd,
                        });
                    }
                } else {
                    console.log("from is not undefined")
                    if (data)
                    {
                        logger.info('auth token is verified')
                        console.log("from ====", from, "to ===", to);
                        const requestBody = {
                            "query": {
                                "bool": {
                                    "must": [
                                    ],
                                    "filter": [
                                        { "term": { "site_id": siteid } },
                                        { "range": { "@timestamp": { "gte": from, "lte": to } } }
                                    ]
                                }
                            },
                            "sort": [{
                                    "@timestamp": {
                                        "order": "desc"
                                    }
                                }
                            ]
                        }
                        console.log("requestBody id ", requestBody);
                        request(elasticur + '?size=10000', {
                                method: 'GET',
                                headers: {
                                    Accept: 'text/json',
                                    "content-type": "application/json"
                                },
                                json: true,
                                body: requestBody
                            },
                            function(err, res1, body) {
                                if (err) {
                                    console.log("errrrrrr", err);
                                    res.status(200).send({
                                        responsedata: config.success,
                                        result: "errordata"
                                    });
                                }
                                if (body) {
                                    console.log("bodyy", body);
                                    if (body.status == 400)
                                    {
                                        const arraydata = [];
                                        res.status(200).send({
                                            responsedata: config.not_data_found,
                                            result: arraydata
                                        });
                                    }
                                    if (body.hits)
                                    {
                                        if (body.hits.hits.length > 0)
                                        {
                                            const jsondata = JSON.parse(JSON.stringify(body.hits.hits));
                                            console.log("body", jsondata.length);
                                            const arraydata = [];
                                            for (let i = 0; i < jsondata.length; i++) {
                                                console.log(JSON.parse(jsondata[i]._source.message));
                                                // const a = JSON.parse(jsondata[i]._source.message);
                                                // const myDate = new Date(a.dateTime).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                // const chunks = myDate.split('/');
                                                // const formattedDate = [chunks[1], chunks[0], chunks[2]].join("-");
                                                // a['date_time'] = formattedDate;
                                                const a = JSON.parse(jsondata[i]._source.message);
                                                console.log("a.datetime", a.dateTime, "a.start_time", a.start_time);
                                                if (a.dateTime === undefined || a.dateTime === "") {
                                                    formattedDate = '';
                                                } else {
                                                    myDate = new Date(a.dateTime).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                    chunks = myDate.split('/');
                                                    formattedDate = [chunks[1], chunks[0], chunks[2]].join("-");
                                                }
                                                if (a.start_time === undefined || a.start_time === "") {
                                                    formatted_start_Date = '';
                                                } else {
                                                    my_start_time = new Date(a.start_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                    start_chunks = my_start_time.split('/');
                                                    formatted_start_Date = [start_chunks[1], start_chunks[0], start_chunks[2]].join("-");
                                                }
                                                if (a.end_time === undefined || a.end_time === "") {
                                                    formatted_end_Date = '';
                                                } else {
                                                    my_end_time = new Date(a.end_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                    end_chunks = my_end_time.split('/');
                                                    formatted_end_Date = [end_chunks[1], end_chunks[0], end_chunks[2]].join("-");
                                                }
                                                if (a.previous_end_time === undefined || a.previous_end_time === "") {
                                                    formatted_previous_end_Date = '';
                                                } else {
                                                    my_previous_end_time = new Date(a.previous_end_time).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
                                                    previous_end_chunks = my_previous_end_time.split('/');
                                                    formatted_previous_end_Date = [previous_end_chunks[1], previous_end_chunks[0], previous_end_chunks[2]].join("-");
                                                }
                                                a['date_time'] = formattedDate;
                                                a['starttime'] = formatted_start_Date;
                                                a['endtime'] = formatted_end_Date;
                                                a['previousendtime'] = formatted_previous_end_Date;
                                                // console.log("datetime", a);
                                                arraydata.push(a);
                                            }
                                            res.status(200).send({
                                                responsedata: config.success,
                                                result: arraydata,
                                            });
                                        } else {
                                            const arraydata = [];
                                            res.status(200).send({
                                                responsedata: config.not_data_found,
                                                result: arraydata
                                            });
                                        }
                                    }
                                }
                            })
                    } else {
                        res.status(200).send({
                            responsedata: config.session_expierd,
                        });
                    }
                }
            }
        })
    }
}
