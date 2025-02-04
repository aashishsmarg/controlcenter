import { db , logger } from '../utils/imports.js'



const commonModel = {
    // majorly used query , almost in every module's get method (same query is in user_site.model but time is not available there)
    getSiteAndTimeBySessionData : async(condition_obj) => {
        let siteWithTime
        try{
            const user_id = condition_obj.userId
            const role = condition_obj.role
            if(role == "Smarg_Admin"){
                siteWithTime = await db.query("SELECT * FROM `site`,`site_timeslot_mapping` where  site.id = site_timeslot_mapping.site_id and site.is_deleted=0") 
                return siteWithTime
            }else{
                siteWithTime = await db.query("SELECT * FROM `site`,`user_site_mapping`,`site_timeslot_mapping` where site.id = user_site_mapping.site_id and site.id = site_timeslot_mapping.site_id and site.is_deleted=0 and user_site_mapping.is_deleted=0 and user_site_mapping.user_id = ?" , [user_id]) 
                return siteWithTime
            }
        }catch(er){
            logger.error(`Error in userSite Query , common IMP query available in every route - common.model.js : ${er}`)
        }
    },

    // Use in multiple module for report genertaion API (requires SiteID no deal with user and user_site_mapping)
    getSiteTimeBySiteId : async(site_id) => {  
        let sitetime
        try{
            sitetime = await db.query('SELECT site_timeslot_mapping.start_time,site_timeslot_mapping.end_time FROM `site_timeslot_mapping` WHERE site_timeslot_mapping.site_id = ?' , [site_id])
        }catch(er){
            logger.error(`Error in common.model.js - getSiteTimeById : ${er}`)            
        }
        return sitetime
    } ,

    // Useing in every report to get the site data by site_id    
    getSiteById : async(site_id) => {
        let sitedata
        try{
            sitedata = await db.query('SELECT * FROM `site` WHERE site.id = ?' , [site_id])
            
        }catch(er){
            logger.error(`Error in common.model.js - getSiteById : ${er}`)
        }
        return sitedata
    },


  

}

export default commonModel



