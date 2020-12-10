const db = require("../models");

const config = require("../config/config.js")

const con = require("../config/database");

const validation = require("../validation/validation");

var cameraGroupModelObj = require("../models/camera_group.model.js");

const toc = require("../utils/verification");

var moment = require('moment'),

	    timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

const winston = require('winston');

var request = require('request');



const logger = winston.createLogger({

	    level: 'info',

	    format: winston.format.json(),

	    defaultMeta: { timestamp: timestamp },

	    transports: [

		            new winston.transports.File({ filename: 'Surveillance.log' }),

		        ],

});



exports.findAll = (req, res) => {

	    var from = req.query.from;

	    var to = req.query.to;

	    var siteid = req.query.site_id;

	    var start = req.query.start
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

											                if (from == '' || from == undefined)

												                {

															                    console.log("from is undefined")



															                    if (data)

																                    {

																			                            logger.info('auth token is verified')



																			               

																			                            console.log("from ====", from, "to ===", to, "start====", start);





																			                            var requestBody = {


																							                                "query": {


																												                                "bool": {

																																	                                    "must": [

																																						                                        ],

																																	                                    "filter": [

																																						                                            { "term": { "site_id": siteid } },



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

																			                            var requestBodylimoffset = {


																							                                "from": start,
																							                                "size": 10,

																							                                "query": {


																												                                "bool": {

																																	                                    "must": [

																																						                                        ],

																																	                                    "filter": [

																																						                                            { "term": { "site_id": siteid } },



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

																			                            request('http://smargtech.in:9201/filebeat-*/_search/?size=10000', {



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

																																							                                            var arraydata = [];

																																							                                            res.status(200).send({

																																													                                                responsedata: config.not_data_found,

																																													                                                result: arraydata

																																													                                            });

																																							                                        }

																																	                                    if (body.hits)

																																		                                    {

																																							                                            if (body.hits.hits.length > 0)

																																								                                            {
																																														                                                var jsondatalength = JSON.parse(JSON.stringify(body.hits.hits.length));



																																														                                                console.log(jsondatalength);

																																														                                                request('http://smargtech.in:9201/filebeat-*/_search/', {



																																																					                                                    method: 'GET',

																																																					                                                    headers: {

																																																												                                                            Accept: 'text/json',

																																																												                                                            "content-type": "application/json"

																																																												                                                        },

																																																					                                                    json: true,

																																																					                                                    body: requestBodylimoffset

																																																					                                                },

																																																					                                                function(err, res1, bodydata) {
																																																												                                                    console.log("bodydata", bodydata);

																																																												                                                    var jsondata = JSON.parse(JSON.stringify(bodydata.hits.hits));

																																																												                                                    console.log("body", jsondata.length);
																																																												                                                    var arraydata = [];

																																																												                                                    for (let i = 0; i < jsondata.length; i++) {

																																																																			                                                            console.log(JSON.parse(jsondata[i]._source.message));

																																																																			                                                            var a = JSON.parse(jsondata[i]._source.message);

																																																																			                                                            var myDate = new Date(a.dateTime).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');
																																																																			                                                            var chunks = myDate.split('/');
																																																																			                                                            var formattedDate = [chunks[1], chunks[0], chunks[2]].join("-");
																																																																			                                                            a['date_time'] = formattedDate;

																																																																			                                                            console.log("datetime", a);

																																																																			                                                            arraydata.push(a);
																																																																			                                                        }
																																																												                                                    console.log("jsondatalengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", jsondatalength);
																																																												                                                    res.status(200).send({

																																																																			                                                            responsedata: config.success,
																																																																			                                                            jsonlength: jsondatalength,
																																																																			                                                            result: arraydata,

																																																																			                                                        })
																																																												                                                })








																																														                                                var jsondata = JSON.parse(JSON.stringify(body.hits.hits));

																																														                                                console.log("body", jsondata.length);


																																														                                            } else {

																																																				                                                var arraydata = [];

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





																						                            var requestBody = {

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

																						                            request('http://smargtech.in:9201/filebeat-*/_search/?size=10000', {



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

																																										                                            var arraydata = [];

																																										                                            res.status(200).send({

																																																                                                responsedata: config.not_data_found,

																																																                                                result: arraydata

																																																                                            });

																																										                                        }

																																				                                    if (body.hits)

																																					                                    {

																																										                                            if (body.hits.hits.length > 0)

																																											                                            {

																																																	                                                var jsondata = JSON.parse(JSON.stringify(body.hits.hits));

																																																	                                                console.log("body", jsondata.length);



																																																	                                                var arraydata = [];





																																																	                                                for (let i = 0; i < jsondata.length; i++) {

																																																								                                                console.log(JSON.parse(jsondata[i]._source.message));

																																																								                                                var a = JSON.parse(jsondata[i]._source.message);



																																																								                                                var myDate = new Date(a.dateTime).toLocaleString(undefined, { hour12: false, format: "DD-MM-YYYY HH:mm:ss", timeZone: 'Asia/Kolkata' }).replace(',', '');

																																																								                                                var chunks = myDate.split('/');
																																																								                                                var formattedDate = [chunks[1], chunks[0], chunks[2]].join("-");
																																																								                                                a['date_time'] = formattedDate;

																																																								                                                console.log("datetime", a);

																																																								                                                arraydata.push(a);
																																																								                                            }

																																																	                                                res.status(200).send({

																																																								                                                responsedata: config.success,

																																																								                                                result: arraydata,



																																																								                                            });

																																																	                                            } else {

																																																							                                                var arraydata = [];

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
