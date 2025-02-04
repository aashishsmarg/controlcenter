import { logger , router , config, axios , exec , authMiddleware } from '../utils/imports.js'
import { parkedVehiclesModel , commonModel } from '../model/model.imports.js'

// have to implement mailer
const debug = config.debug
const apicallingurl = `${config.API_URL}/vehicle_list_anpr`
let totalRec = 0 , pageSize = 10 , pageCount = 0 , start = 0 , currentPage = 1;
router.get('/vehiclelistanpr' , authMiddleware , async(req , res) => {

    let result , siteid , body , productsCount , pageCount , elasticdata
    try{
        const { userId : user_id , username , role : userrole , auth : sccauth_token } = req.session
        result = await parkedVehiclesModel.siteWithReporting(req.session)
        if(result.length > 0){
            siteid = result[0]?.site_id
            body = await axios.get(`${apicallingurl}?site_id=${siteid}&start=${start}` , { // note - currently API pointing towards smargtech.in ES
                headers : {
                    Accept : 'text/json', 
                    "Content-Type" : "application/json",
                    "auth_token" : sccauth_token
                    }, 
                    json : true
            })
            console.log(body)
            totalRec = body.data.jsonlength;
            pageCount = (Math.ceil(totalRec / pageSize)) - 1
            if(typeof req.query.page !== 'undefined' ){
                currentPage = req.query.page
            }else{
                currentPage = 1
            }
            if(currentPage > 1){
                start = (currentPage - 1) * pageSize
            }
            elasticdata = body.data.data
            if('errno' in elasticdata){
                elasticdata = []
            }

            res.render('parked_vehicle_list/parked_vehicle_list', { title: "Parked Vehicles", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, data: elasticdata, datas: result, sccauth_token: sccauth_token, v_siteid: siteid, username: username, userrole: userrole, debug: debug });
        }else{
            res.render('parked_vehicle_list/parked_vehicle_list', { title: "Parked Vehicles", data: [], datas: [], sccauth_token: sccauth_token, v_siteid: "", username: username, userrole: userrole, debug: debug, searchdata: '*' });
        }

    }catch(er){
        console.log(`Error in parked.vehicle.list.controller in 1st GET method : ${er}`)
        logger.error(`Error in parked.vehicle.list.controller in 1st GET method : ${er}`)
    }



})


router.get('/vehiclelistanpr/data/(:id)' , authMiddleware , async(req , res) => {
    let searchdata , sortingdata , ordertype , result , body , searchquery , elasticdata
    try{
        const { userId : user_id , username , role : userrole , auth : sccauth_token } = req.session
        const {id : siteid } = req.params 
        searchdata =  (!req.query.searchanpr) ?   "" : req.query.searchanpr
        sortingdata = (!req.query.sortdataanpr) ? "DateTime" : req.query.sortdataanpr
        ordertype =   (!req.query.ordertypeanr) ? "des" :  req.query.ordertypeanr
        result = await parkedVehiclesModel.siteWithReporting(req.session)
        currentPage = (typeof req.query.page !== "undefined") ? req.query.page : currentPage
        start = (currentPage > 1) ? ((currentPage - 1) * pageSize) : start
        searchquery = `${apicallingurl}?site_id=${siteid}&start=${start}&searchdt=${searchdata}&sortingfield=DateTime&ordertype=des`
        body = await axios.get(searchquery , {
            headers : {
                Accept : 'text/json',
                "Content-Type" : "application/json",
                "auth_token" : sccauth_token
            },
            json : true
        })
        totalRec = body.data.jsonlength
        pageCount = Math.ceil(totalRec / pageSize)
        elasticdata = body.data.data
        if('errno' in elasticdata){
            elasticdata = []
        }
        res.render('parked_vehicle_list/parked_vehicle_list', { title: "Parked Vehicles", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, data: elasticdata, datas: result, sccauth_token: sccauth_token, v_siteid: siteid, username: username, userrole: userrole, searchanpr: searchdata, sortdataanpr: sortingdata, ordertypeanpr: ordertype, debug: debug });
    }catch(er){
        logger.error(`Error in parked.vehicle.list.contoller in 2nd GET method : ${er}`)
        console.log(`Error in parked.vehicle.list.contoller in 2nd GET method : ${er}`)
    }
})


router.get("/vehiclelistanpr/data2/(:authToken)/(:id)/(:fromdate)/(:todate)" , async(req,res) => {
    // note - implement nodemailer here for reporting
    let sitedata , sitename , sitetime , sitestart , siteend , starttime , endti , $todat , filepath , fromDate , toDate , mailtype
    try{
        const { authToken : sccauth_token , fromdate : frmdt , id : site_id , todate : tdt } = req.params
        const {emailId : email_id , name : user_name} = req.session
        sitedata = await commonModel.getSiteById(site_id)
        sitename = sitedata[0].display_name
        sitetime = commonModel.getSiteTimeBySiteId(site_id)
        sitestart = sitetime[0]?.start_time
        siteend = sitetime[0]?.end_time
        starttime = sitestart.slice(0,2)
        endti = siteend.slice(0,2)
        if (starttime - endti < 0) {
            $todat = tdt
        }
        else {
            $todat = new Date(tdt)
            $todat = $todat.setDate($todat.getDate() + 1)
            $todat = new Date($todat)
            $todat = $todat.toISOString().split('T')[0]
        }
        exec("python3 ./reportingscripts/generate_parked_vehicle_report.py  \'{\"site_name\":\"" + sitename + "\",\"auth_token\":\"" + sccauth_token + "\",\"site_id\":\"" + site_id + "\",\"from_date\":\"" + frmdt + "T" + sitestart + "\",\"to_date\":\"" + $todat + "T" + siteend + "\",\"fileName\":\"" + tdt + "\"}\'", function (error, stdOut, stdErr) {
            if(error){
                res.json({text : 'error'})
            }else if(stdOut){
                filepath = './report'+stdOut.split('\n')[0]
                fromDate = frmdt+" "+sitestart
                toDate = $todat+" "+siteend
                mailtype = 'Manual'
                // nodeMailerFunction([email_id], fromDate, toDate, filepath, null, null, mailtype, user_name)
                return res.send({text : 'success' , sitename : sitename})
            }else if(stdErr){
                res.json({text : 'error'})
            }
        })
    }catch(er){
        logger.error(`Error in generating report parked.vehicle.list : ${er}`)
    }
})

router.get("vehiclelistanpr/twData/(:authToken)/(:id)/(:fromdate)/(:todate)" , async(req,res) => {   
    let sitedata , sitetime , sitestart , siteend , starttime , endti , $todat
    try{
        const {authToken : sccauth_token , id : site_id , fromdate : frmdt , todate : tdt} = req.params
        sitedata = commonModel.getSiteById(site_id)
        sitename = sitedata[0]?.display_name
        sitetime = commonModel.getSiteTimeBySiteId(site_id)        
        sitestart = sitetime[0]?.start_time
        siteend = sitetime[0]?.end_time
        starttime = sitestart.slice(0,2)
        endti = siteend.slice(0,2)
        if (starttime - endti < 0) {
            $todat = tdt
        }
        else {
            $todat = new Date(tdt)
            $todat = $todat.setDate($todat.getDate() + 1)
            $todat = new Date($todat)
            $todat = $todat.toISOString().split('T')[0]
        }
        exec("python3 ./generate_2W_vehicle_report.py  \'{\"site_name\":\"" + sitename + "\",\"auth_token\":\"" + sccauth_token + "\",\"site_id\":\"" + site_id + "\",\"from_date\":\"" + frmdt + "T" + sitestart + "\",\"to_date\":\"" + $todat + "T" + siteend + "\",\"fileName\":\"" + tdt + "\"}\'", function (error, stdOut, stdErr) {
            if(error){
                res.json({text : 'error'})
            }else if(stdOut){
                filepath = './report/'+stdOut.split('\n')[0]
                fromDate = frmdt + " " + sitestart
                toDate = $todat + " " + siteend
                mailtype = 'Manual'
                const { emailId : email_id , name : user_name } = req.session
                // nodeMailerFunction([email_id], fromDate, toDate, filepath, filepath, mailtype, user_name)
                return res.send({ text : 'success' , sitename : sitename})
            }else if (stdErr){
                res.json({text : 'error'})
            }
        })
        res.send({"result":"result"})
    }catch(er){
        logger.error(`Error in generating Two Wheeler report - parked.vehicle.list : ${er}`)
    }
})
export default router