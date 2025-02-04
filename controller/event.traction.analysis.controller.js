import { router , authMiddleware , exec } from '../utils/imports.js'
import { commonModel , eventTraction } from '../model/model.imports.js'


const nodata = [{
    "stg_id": 0,
    "tag_value": "No Events Found"


}]

const eventsData = async(req , res , v_siteid) => {
    let events , result
    try{
        const {userId : user_id , username , role : userrole} = req.session
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        events = eventTraction.eventsList(v_siteid)
        events.length > 0 ? null : events = nodata
        res.render('event_analytics/traction_analysis', { title: "Traction Analysis", data: result, v_siteid: v_siteid, event_data: events, username: username, userrole: userrole});
    }catch(er){
        logger.error(`Error in event traction Common method method ${er}`)
    }
    
}


router.get('/tractionanalysis' , authMiddleware ,  async(req,res) => {
    try{
        let result , v_siteid
        
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        v_siteid = result[0]?.site_id
        await eventsData(req , res , v_siteid)    
    }catch(er){
        logger.error(`Error in event traction GET method ${er}`)
    }
})
router.get('/tractionanalysis/data/(:id)' , async(req , res) => {
    let v_siteid 
    try{

        
        v_siteid = req.params.id
        await eventsData(req , res , v_siteid)
    }catch(er){
        logger.error(`Error in event traction GET method with params ${er}`)
    }
})
router.get('/tractionanalysis/reportdata/(:id)/(:fromdate)/(:todate)/(:eventname)' , async(req , res) => {
    let sitestart ,siteend ,starttime ,endti , $todat , result , data
    try{
        const {id:siteid  , fromdate , todate , eventname } = req.params
        sitedata = await commonModel.getSiteById(siteid)        
        sitename = sitedata[0]?.display_name;
        sitetime = commonModel.getSiteTimeBySiteId(siteid)
    
         sitestart = sitetime[0].start_time;
         siteend = sitetime[0].end_time;
         starttime = sitestart.slice(0, 2);
         endti = siteend.slice(0, 2);
        if (starttime - endti < 0) {
            $todat = todate
        } else {
            $todat = new Date(todate)
            $todat = $todat.setDate($todat.getDate() + 1)
            $todat = new Date($todat)
            $todat = $todat.toISOString().split('T')[0]
        }
    
        result = await retailAnalytics.CameraOnGateway(siteid)
        data = JSON.stringify(result);
        console.log("python3 ./reportingscripts/generate_event_reports.py  \'{\"site_id\":\"" + siteid + "\",\"event_name\":\"" + eventname + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'")
        exec("python3 ./reportingscripts/generate_event_reports.py  \'{\"site_id\":\"" + siteid + "\",\"event_name\":\"" + eventname + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + fromdate + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'", function (error, stdOut, stdErr) {
            if (error) {
                console.log("there is a error");
                res.json({
                    text: 'error'
                });
            } else if (stdOut) {
                console.log("there is a stdOut");
                res.send({
                    text: 'success',
                    sitename: sitename
                });
            } else if (stdErr) {
                console.log("there is a stdErr");
                res.json({
                    text: 'error'
                });
            }
        })


    }catch(er){
        logger.error(`Error in Generate report of tranction.analysis.controller ${er}`)
    }
})
export default router;