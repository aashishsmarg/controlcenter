import { router , devSession , logger , authMiddleware } from '../utils/imports.js';
import dashboardModal from '../model/dashboard.model.js';

import user_siteModal from '../model/user_site.model.js';
router.get('/dashboard', authMiddleware , async(req,res)=>{
    const {userId : user_id , username , role : userrole} = req.session
    var siteid_uni
    try{
        const countsite = await user_siteModal.getUserSiteWithTime(req.session)
        console.log(`countsite`)
        console.log(countsite)
        let rulelength = []
        if (countsite.length > 0) {
            const sitelength = countsite.length
            siteid_uni = countsite[0].site_id;
            let siteid = countsite[0].site_id;
            for (let i = 1; i < countsite.length; i++) {
                siteid = siteid + ',' + countsite[i].site_id;
            }
            console.log(`siteid`)
            console.log(siteid)
            const countzone = await dashboardModal.countZone(siteid)
            if(countzone.length > 0){
                const zonelength = countzone.length
                let camgrpid = countzone[0].camgrpid;
                for (let i = 1; i < countzone.length; i++) {
                    camgrpid = camgrpid + ',' + countzone[i].camgrpid;
                }
                // console.log(camgrpid)
                const countrule = await dashboardModal.countRule(siteid)
                const rulelength = countrule[0]?.countrule;
                res.render('dashboard/dashboard', { title: "Dashboard", datas: countsite, siteid_uni: siteid_uni, countsitedata: sitelength, countzonedata: zonelength, countruledata: rulelength, username: username, userrole: userrole, user_id: user_id });
            }else{
                res.render('dashboard/dashboard', { title: "Dashboard", datas: countsite, siteid_uni: siteid_uni, countsitedata: sitelength, countzonedata: [], countruledata: rulelength, username: username, userrole: userrole, user_id: user_id });
                    }
                }else{
                    logger.error(`Time is not configured for all the sites in site_timeslot_mapping`)
                    res.render('dashboard/dashboard', { title: "Dashboard", datas: countsite, siteid_uni: siteid_uni, countsitedata: [], countzonedata: [], countruledata: [], username: username, userrole: userrole, user_id: user_id });
                }
    }catch(er){
        console.log("error in dashboard.controller.js : "+er)
        logger.error(`error in dashboard.controller.js : ${er}`)
    }
})
export default router