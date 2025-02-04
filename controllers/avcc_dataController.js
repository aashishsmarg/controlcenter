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

    // <BASEURL>/avcc_data?from=<DATE TIME in YYYY-MM-DD hh:mm:ss format>&to=<DATE TIME in YYYY-MM-DD hh:mm:ss format>&site_id=<site id>

    const from = req.query.from
    const to = req.query.to
    const site_id = req.query.site_id;
    const last_sync_time = req.query.last_sync_time;
    // console.log("from , to siteid", from, to, siteid);
    auth_token = req.header('auth_token')
    console.log("auth token",auth_token)


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
            }
            else
            {
                // res.status(200).send({responsedata:"now logic"})
                logger.info('auth token is verified')
                console.log("from = "+from + " " + "to = "+to)

                console.log(site_id)
                console.log("userid whose auth token is passed = "+data)

                if(from == undefined || from == '')
                {
                    console.log("from is undefined")

                    if(data)
                    {
                        console.log("auth token is verified for sync interval") 

                        // code here for the sync time when we don't have from & to 

                        const requestBody = {
                            "aggs": {
                                "types_count": {
                                    "value_count": {
                                        "field": "dateTime"
                                    }
                                }
                            },
                            "query": {
                                "bool": {
                                    "must": [],
                                    "filter": [
                                        { "term": { "site_id": site_id } },
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
                            "from": last_sync_time,
                            "size": 10,
                            "aggs": {
                                "types_count": {
                                    "value_count": {
                                        "field": "dateTime"
                                    }
                                }
                            },
                            "query": {
                                "bool": {
                                    "must": [],
                                    "filter": [
                                        { "term": { "site_id": site_id } },
                                    ]
                                }
                            },
                            "sort": [{
                                "@timestamp": {
                                    "order": "desc"
                                }
                            }]
                        }

                        request(elasticur + '?size=10',{
                            method: 'GET',
                                headers: {
                                    Accept: 'text/json',
                                    "content-type": "application/json",
                                    'Authorization':'Basic ZWxhc3RpYzpzbWFyZzEyM3NtYXJnIw=='
                                },
                                json: true,
                                body: requestBody
                        },
                        function(err,res,body)
                        {
                            if(err)
                            {
                                console.log("errrrrrr", err);
                                    res.status(200).send({
                                        responsedata: config.success,
                                        result: "errordata"
                                    });
                            }
                            if(body)
                            {
                                if (body.status == 400) {
                                    const arraydata = [];
                                    res.status(200).send({
                                        responsedata: config.not_data_found,
                                        result: arraydata
                                    });
                                }

                                if (body.hits) 
                                {
                                    console.log("body hits")
                                    // console.log(body.hits)
                                    
                                    const responsetoitterate = body.hits.hits

                                    const resarray=[]
                                    for(let i=0; i<responsetoitterate.length;i++)
                                    {
                                        console.log(JSON.parse(responsetoitterate[i]["_source"]["message"]))
                                        // console.log(responsetoitterate[i]["_source"])
                                    
                                        // resarray.push(JSON.parse(responsetoitterate[i]['_source']["message"]))
                                    }
                                    
                                    res.status(200).send({
                                        responsedata:  config.success,
                                        result:resarray
                                    });
                                    
            






                                }

                            }
                        }
                        )




                    }

                }


                // ***********************|API 2 when "from" and "to" is available |***************
                else         //    when from is defined
                {
                    console.log("from and to is defined")
                    if(data)     // user has auth token
                    {
                        logger.info('auth token is verified');
                        console.log("here we want from and to  from ====", from, "to ===", to);

                        const requestBody = {
                            "query": {
                                "bool": {
                                    "must": [
                                    ],
                                    "filter": [
                                        { "term": { "site_id": site_id } },
                                        // { "range": { "@timestamp": { "gte": from, "lte": to } } }
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
                        
                        request(elasticur+'?size=1000',{
                            method: 'GET',
                            headers: {
                                Accept: 'text/json',
                                "content-type": "application/json",
                                'Authorization':'Basic ZWxhc3RpYzpzbWFyZzEyM3NtYXJnIw=='
                            },
                            json: true,
                            body: requestBody
                        },

                        function(err, res1, body){
                            if(err)
                            {
                                console.log("errrrrrr", err);
                                    res.status(200).send({
                                        responsedata: config.success,
                                        result: "errordata"
                                    });
                            }

                            if(body)
                            {
                                console.log("body of from and to is passed")
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
                                       final_result= {
                                            "site_id": site_id,
                                            "site_name": "",
                                            "from_date_time": from,
                                            "to_date_time": to,
                                            "junctions": [
                                              {
                                                "junction_id": "",
                                                "junction_name": "",
                                                "cameras":[
                                                  {
                                                    "camera_name": "",
                                                    "lanes": [
                                                      {
                                                        "lane_name": "lane1",
                                                        "total_TW_count":"",
                                                        "total_LMV_count": "",
                                                        "total_HMV_count": "",
                                                        "total_vehicle_count": ""
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                        }
                                          response_data=JSON.parse(JSON.stringify(body.hits.hits))
                                          if (response_data.length>0){

                                            for (let i=0 ;i<response_data.length;i++ ){
                                            
                                                // final_result["site_name"]=response["site_name"]
                                            console.log(response_data[i]['_source']['message'])
                                            res.status(200).send({
                                                responsedata:  config.success,
                                                // result: final_result
                                                result:JSON.parse(response_data[i]['_source']["message"])
                                            });
                                            break
                                        }
                                        }
                                        else{
                                            res.status(200).send({
                                                responsedata: config.not_data_found,
                                                result: []
                                            });
                                        }
                                        }

                            }

                        }

                        )

                    }
                }
                


            }
        })
    }

}