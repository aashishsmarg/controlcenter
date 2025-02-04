import { logger, router , exec , authMiddleware } from '../utils/imports.js'
import { commonModel , violation , user_siteModal } from '../model/model.imports.js'



let totalRec = 0, pageSize = 10, pageCount = 0 , start = 0 , currentPage = 1;;

router.get('/violations' , authMiddleware , async(req,res) => {


    let isadmin , result, siteid , is_incident_video_enable, recordCount , rows = []
    try{
        const { userId : user_id , username , role : userrole , auth : sccauth_token , isadmin : isadmindata} = req.session
        isadmin = isadmindata ? true : false
        result = await violation.siteTimeslotWithIncident(req.session)
        console.log(result)
        siteid = result[0]?.id
        is_incident_video_enable = result[0].is_incident_video_enable
        recordCount = await violation.notificationCountBySiteId(siteid)        
        totalRec = recordCount[0].count
        pageCount = Math.ceil(totalRec / pageSize);
        if( typeof req.query.page !== 'undefined'){
            currentPage = req.query.page
        }else{
            currentPage = 1
            start = 0}
        if(currentPage > 1){
            start = (currentPage - 1) * pageSize
        }
        rows = await violation.notificationDataWithOffset(siteid , pageSize , start)
        res.render('violation_list/violation_list', { title: "Violations", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, datas: result, data: rows, sccauth_token: sccauth_token, v_siteid: siteid, isadmin: isadmin, username: username, userrole: userrole, is_incident_video_enable: is_incident_video_enable });
    }catch(er){
        logger.error(`Error in Violations list GET method : ${er}`)
    }
})

router.get('/violations/data/(:id)' , authMiddleware , async(req , res) => {
    let isadmin , result, siteid , is_incident_video_enable, recordCount , rows = [] , site_timeslot_mapping
    try{
        
        const { userId : user_id , username , role : userrole , auth : sccauth_token , isadmin : isadmindata} = req.session    
        isadmin = isadmindata ? true : false
        siteid = req.params.id

        recordCount = await violation.notificationCountBySiteId(siteid)        
        totalRec = recordCount[0].count;
        pageCount = Math.ceil(totalRec / pageSize);
        if (typeof req.query.page !== 'undefined') {
            currentPage = req.query.page;
        } else { }
        if (currentPage > 1) {
            start = (currentPage - 1) * pageSize;
        }
        if (currentPage == 1) {
            start = (currentPage - 1) * pageSize;
        }

        site_timeslot_mapping = await violation.isIncidentOnSite(siteid)
        is_incident_video_enable = site_timeslot_mapping[0]?.is_incident_video_enable
        result = await user_siteModal.getUserSite(req.session)
        rows = await violation.notificationDataWithOffset(siteid , pageSize , start)
        res.render('violation_list/violation_list', { title: "Violations", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, datas: result, data: rows, sccauth_token: sccauth_token, v_siteid: siteid, isadmin: isadmin, username: username, userrole: userrole, is_incident_video_enable: is_incident_video_enable });

    }catch(er){
        logger.error(`Error in Violations list . controller GET by ID : ${er}`)
    }
})


router.get('/violations/addres' , async(req,res) => {
    let resid , isadmin , comments ,siteidres , dateISOString , aest , updateresult , result , rows , siteid
    try{
        const { userId : user_id , username , role : userrole , auth : sccauth_token , isadmin : isadmindata} = req.session    
        isadmin = isadmindata ? true : false
        comments = req.body.comments
        resid = req.body.resid
        siteidres = req.body.siteidres
        dateISOString = new Date()
        aest = new Date(new Date(dateISOString).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const violation = {
            comment: comments,
            status: 2,
            updated_by: user_id,
            updated_at: aest.toISOString()
        }
        updateresult = await violation.updateNotification(resid , violation)
        siteid = siteidres
        result = await user_siteModal.getUserSite(req.session)
        // In below pageSize and start is not available even in prev code also, maybe taking from global variable
        rows = await violation.notificationDataWithOffset(siteid , pageSize , start)
        res.render('violation_list/violation_list', { title: "Violations", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, datas: result, data: rows, sccauth_token: sccauth_token, v_siteid: siteid, isadmin: isadmin, username: username, userrole: userrole });
    }catch(er){
        logger.error(`Error in violations addres in violations.list.controller : ${er}`)
    }
})

router.get('/violations/addrej' , async(req,res) => {
    let resid , isadmin , comments ,siteidres , dateISOString , aest , updateresult , result , rows , siteid
    const { userId : user_id , username , role : userrole , auth : sccauth_token , isadmin : isadmindata} = req.session    
    isadmin = isadmindata ? true : false
    comments = req.body.comments
    resid = req.body.resid
    siteidres = req.body.siteidres
    dateISOString = new Date()
    aest = new Date(new Date(dateISOString).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    var violation = {
        comment: comments,
        status: 1,
        updated_by: user_id,
        updated_at: aest.toISOString()
    }
    updateresult = await violation.updateNotification(resid , violation)
    siteid = siteidres
    result = await user_siteModal.getUserSite(req.session)
    res.render('violation_list/violation_list', { title: "Violations", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, datas: result, data: rows, sccauth_token: sccauth_token, v_siteid: siteid, isadmin: isadmin, username: username, userrole: userrole });
})




router.get('/violations/delete' , async(req,res) => {
    let delid , siteidres , result , isadmin , site , siteid , rows
    delid = req.body.delid
    siteidres = req.body.siteidres

    const { userId : user_id , username , role : userrole , auth : sccauth_token , isadmin : isadmindata} = req.session    
    isadmin = isadmindata ? true : false
    site = { id: delid }
    await violation.deleteNotification(site)
    result = user_siteModal.getUserSite(req.session)
    siteid = siteidres
    rows = await violation.notificationDataWithOffset(siteid , pageSize , start)
    res.render('violation_list/violation_list', { title: "Violations", pageSize: pageSize, pageCount: pageCount, currentPage: currentPage, datas: result, data: rows, sccauth_token: sccauth_token, v_siteid: siteid, isadmin: isadmin, username: username, userrole: userrole });
})

router.get('/violations/data2/(:authToken)/(:id)/(:fromdate)/(:todate)' , (req,res) => {
      let sitedata , sitename , sitetime , sitestart , siteend , starttime , endti
      try{

          const {authToken : sccauth_token , id : site_id , fromdate : frmdt , todate : tdt} = req.params
    
          sitedata = commonModel.getSiteById(site_id)
          sitename = sitedata[0].display_name
          sitetime = commonModel.getSiteTimeBySiteId(site_id)
          sitestart = sitetime[0].start_time;
          siteend = sitetime[0].end_time;
          starttime = sitestart.slice(0, 2);
          endti = siteend.slice(0, 2);
          if (starttime - endti < 0) {
              $todat = tdt
          }
          else {
              $todat = new Date(tdt)
              $todat = $todat.setDate($todat.getDate() + 1)
              $todat = new Date($todat)
              $todat = $todat.toISOString().split('T')[0]
          }
          console.log("python3 ./reportingscripts/generate_violation_report.py  \'{\"site_name\":\"" + sitename + "\",\"auth_token\":\"" + sccauth_token + "\",\"site_id\":\"" + site_id + "\",\"from_date\":\"" + frmdt + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"fileName\":\"" + tdt + "\"}\'")
          exec("python3 ./reportingscripts/generate_violation_report.py  \'{\"site_name\":\"" + sitename + "\",\"auth_token\":\"" + sccauth_token + "\",\"site_id\":\"" + site_id + "\",\"from_date\":\"" + frmdt + " " + sitestart + "\",\"to_date\":\"" + $todat + " " + siteend + "\",\"fileName\":\"" + tdt + "\"}\'", function (error, stdOut, stdErr) {
            if(error){
                res.json({text : 'error'})
            }else if(stdOut){
                return res.send({ text : 'success' , sitename : sitename })
            }else if(stdErr){
                res.send({ text : 'error' })
            }
          })

          res.send({"result":"result"})

      }catch(er){
        logger.error(`Error in Violations generate report : ${er}`)
      }








})
export default router