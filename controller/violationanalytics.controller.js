import { router , authMiddleware, exec , logger} from '../utils/imports.js'
import { commonModel, user_siteModal , violation } from '../model/model.imports.js'


router.get('/violationtrend' , authMiddleware , async(req , res) => {
    try{
        
        const {userId : user_id , username , role : userrole} = req.session

        const result = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('violation_analytics/violation_analytics', { title: " Violation Trends", data: result, username: username, userrole: userrole });
    }catch(er){
        logger.error(`Error in violation_analytics.js .get method : ${er}`)
    }
})

router.get('/violationtrend/data/(:id)/(:fromdate)/(:todate)' , async(req , res) => {
    let siteData , siteName , siteTime , sitestart , siteend , starttime , $todat , result , data , endti
    try{
        const {id : siteid , fromdate , todate} = req.params
        siteData = await commonModel.getSiteById(siteid)
        siteName = siteData[0]?.display_name
        siteTime = await commonModel.getSiteTimeBySiteId(siteid)
        sitestart = siteTime[0]?.start_time
        siteend = siteTime[0]?.end_time
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


        result = await violation.rulesOnCamera(siteid)
        data = JSON.stringify(result)
        console.log("/usr/bin/python3 ./reportingscripts/generate_violation_analytics_reports.py \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + siteName + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + "}\'")
        exec("/usr/bin/python3 ./reportingscripts/generate_violation_analytics_reports.py \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + siteName + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + "}\'" , (error , stdOut , stdErr) => {
            if(error){
                logger.error(`Error in generating violation anaylytics report : ${error}`)
                console.log(`error in API calling generting report violation anaylytics : ${error}`)                
                res.json({text : 'error'})
            }else if(stdOut){                
                return res.send({ text: 'success', sitename: siteName });
            }else{
                logger.error(`Error in generating violation anaylytics report : ${stdErr}`)
                res.json({text : 'error'})
            }
        })
    }catch(er){
        logger.error(`Error in footfalldistribution.controller.js - generate report : ${er}`)
    }    
})
export default router