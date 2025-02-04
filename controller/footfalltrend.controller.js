import { router , logger, authMiddleware , exec } from '../utils/imports.js'
import { user_siteModal , commonModel , retailAnalytics } from '../model/model.imports.js'


router.get('/footfalltrend' , authMiddleware , async(req , res) => {
    let result
    try{
    
    const {userId : user_id , username , role : userrole} = req.session
        
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('retail_analytics/footfalltrend', { title: "Footfall Trends", data: result, username: username, userrole: userrole });
    }catch(er){
        logger.error(`error in footfalltrend.controller - get API : ${er}`)
    }    
})
router.get('/footfalltrend/data/(:id)/(:fromdate)/(:todate)' , async(req , res) => {
    let siteData , sitename , siteTime , sitestart,siteend,starttime,endti , result , data , $todat
    const {id : siteid , fromdate , todate} = req.params
    try{
        siteData = await commonModel.getSiteById(siteid)
        sitename = siteData[0]?.display_name
        siteTime = await commonModel.getSiteTimeBySiteId(siteid)
        sitestart = siteTime[0]?.start_time
        siteend = siteTime[0]?.end_time
        starttime = sitestart.slice(0, 2);
        endti = siteend.slice(0, 2);
        if (starttime - endti < 0) {
            $todat = todate
        }
        else {
            $todat = new Date(todate)
            $todat = $todat.setDate($todat.getDate() + 1)
            $todat = new Date($todat)
            $todat = $todat.toISOString().split('T')[0]
        }
        result = await retailAnalytics.CameraOnGateway(siteid)
        

        data = JSON.stringify(result)
        console.log("/usr/bin/python3 ./reportingscripts/generate_footfall_reports.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'")
        exec("/usr/bin/python3 ./reportingscripts/generate_footfall_reports.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'" , (error, stdOut, stdErr) => {
            if(error){
                console.log("error")
                console.log(error)
                res.json({text : "error"})
            }else if(stdOut){
                console.log("stdOut")
                res.send({text : "success" , sitename : sitename})
            }else if(stdErr){
                console.log("stdErr")
                res.json({text : "error"})
            }
        })
    }catch(er){
        console.log(`Error in generating footfall trend report : ${er}`)
        logger.error(`Error in report generation - footfall trend : ${er}`)
    }
})

export default router






