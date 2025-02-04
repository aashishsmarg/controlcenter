import { router , logger , authMiddleware , exec } from '../utils/imports.js'
import { commonModel } from '../model/model.imports.js'


router.get('/offeranalytics' , authMiddleware , async(req , res) => {
    let result , v_siteid
    try{
        
        const {userId : user_id , username , role : userrole } = req.session
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        v_siteid = result[0]?.site_id
        res.render('advertising_analytics/offer_trends', { title: "Offer Trends", data: result, username: username, userrole: userrole, v_siteid: v_siteid });
    }catch(er){
        logger.error(`Error in offer.trends.controller - GET method : ${er}`)
    }
})

router.get('/offeranalytics/reportdata/(:id)/(:fromdate)/(:todate)' , async(req , res) => {
    let sitedata , sitetime , sitename , sitestart , siteend , starttime , endti , $todat , result , data
    try{
        req = await devSession.adminSession(req)
    
        const {userId : user_id , username , role : userrole } = req.session
        const {id : siteid , fromdate , todate} = req.params
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
        logger.error(`Error in report generation - offer trends : ${er}`)
    }

})
export default router









