import {  router , logger , authMiddleware , exec  } from '../utils/imports.js'
import { commonModel } from '../model/model.imports.js'

router.get('/addashboard' , authMiddleware , async(req , res) => {   
    let result , v_siteid
    try{
        const {userId : user_id , username , role : userrole} = req.session
    
    
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        
        v_siteid = result[0]?.site_id
        res.render('advertising_analytics/ad_analytics', { title: "Advertising Analytics", data: result, username: username, userrole: userrole, v_siteid: v_siteid });
    } catch(er){
        logger.error(`Error in addashboard controller , GET method - advertisment.dashboard.controller.js : ${er}`)
    }

})


router.get('/addashboard/reportdata/(:id)/(:fromdate)/(:todate)' , async(req , res) => {
    let sitedata , sitetime , sitename , sitestart , siteend , starttime , endti , $todat , result , data
    try{

        const {id : siteid , fromdate , todate} = req.params
        // do here reporting changes
        sitedata = await commonModel.getSiteById(siteid)        
        sitename = sitedata[0]?.display_name;
        sitetime = await commonModel.getSiteTimeBySiteId(siteid)

         sitestart = sitetime[0]?.start_time;
         siteend = sitetime[0]?.end_time;
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
        data = JSON.stringify(result);
        console.log("python3 ./reportingscripts/generate_footfall_screentrends.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'")
        exec("python3 ./reportingscripts/generate_footfall_screentrends.py  \'{\"site_id\":\"" + siteid + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'", function (error, stdOut, stdErr) {
            if (error) {
                res.json({ text: 'error' });
            } else if (stdOut) {
                res.send({ text: 'success', sitename: sitename });
            } else if (stdErr) {
                res.json({ text: 'error' });
            }
        });

    }catch(er){
        logger.error(`Error in advertisment.dashboard.controller.js - generate report : ${er}`)
    }

})


export default router;







