import { router , logger , exec , authMiddleware } from '../utils/imports.js'
import { user_siteModal , commonModel , retailAnalytics } from '../model/model.imports.js'

router.get('/footfalldistribution' , authMiddleware , async(req,res) => {
    let result
    const {userId : user_id , username , role : userrole} = req.session




    try{
        
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('footfalldistribution/footfalldistribution', { title: "footfall distribution", data: result, username: username, userrole: userrole });
    }catch(er){
        logger.error(`Error in footfall.distribution.controller - get.Footfalldistribution : ${er}`)
    }    
})
export default router

router.get('/footfalldistribution/data/(:id)/(:fromdate)/(:todate)' , async(req , res) => {
    let siteData , siteName , siteTime ,sitestart ,siteend ,starttime ,endti , result , data , $todat
    const {id : siteid , fromdate , todate} = req.params
    try{
        siteData = await commonModel.getSiteById(siteid)
        siteName = siteData[0]?.display_name
        siteTime = await commonModel.getSiteTimeBySiteId(siteid)
        sitestart = siteTime[0].start_time
        siteend = siteTime[0].end_time
        starttime = sitestart.slice(0,2)
        endti = siteend.slice(0,2)
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
        console.log("/usr/bin/python3 ./reportingscripts/footfall_distribution_report.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + siteName + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'")
        exec("/usr/bin/python3 ./reportingscripts/footfall_distribution_report.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + siteName + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'" , (error, stdOut, stdErr) => {
            if(error){
                res.json({text : 'error'})
                console.log("error")
                console.log(error)
            }
            else if(stdOut){
                res.send({text : 'success' , sitename : siteName})
            }
            else if(stdErr){
                console.log("stdErr")
                console.log(stdErr)
                res.json({text : 'error'})
            }
        })
    }catch(er){
        console.log(`Error in generating footfall distribution report : ${er}`)
        logger.error(`Error in footfalldistribution.controller.js - generate report : ${er}`)
    }
})