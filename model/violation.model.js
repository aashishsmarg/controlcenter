import { db , logger } from '../utils/imports.js'



const violation = {
    rulesOnCamera : async(siteid) => {
        let rulesOnCamera
        try{
            rulesOnCamera = await db.query("SELECT DISTINCT(camera.id) , camera.display_name as name, rule_category_rule_mapping.rule_category_id FROM gateway_camera_mapping,camera,camera_covered_area,area_rule_mapping,rule_master,rule_category_rule_mapping WHERE camera.is_deleted = 0 and gateway_camera_mapping.camera_id=camera.id and camera_covered_area.camera_id=camera.id and area_rule_mapping.area_id=camera_covered_area.id and rule_category_rule_mapping.rule_id=area_rule_mapping.rule_id and gateway_camera_mapping.is_deleted=0 and area_rule_mapping.is_deleted=0 and rule_category_rule_mapping.rule_category_id=10 and camera.site_id = ?" , [siteid])
        }catch(er){
            logger.error(`Error in model violation - rulesOnCamera : ${er}`)
        }
        return rulesOnCamera
    },
    siteTimeslotWithIncident : async(condition_obj) => {
        let siteTimeslotWithIncident
        try{
            const role = condition_obj.role
            const user_id = condition_obj.userId
            if(role == "Smarg_Admin"){
                siteTimeslotWithIncident = await db.query('SELECT `site`.*,`site_timeslot_mapping`.is_incident_video_enable,`site_timeslot_mapping`.site_id FROM `site`,`site_timeslot_mapping`  where site.id = site_timeslot_mapping.site_id  and site.is_deleted=0')
            }else{
                siteTimeslotWithIncident = await db.query('SELECT `site`.*,`site_timeslot_mapping`.is_incident_video_enable,`site_timeslot_mapping`.site_id FROM `site`,`site_timeslot_mapping` ,user_site_mapping where site.id = site_timeslot_mapping.site_id and site.id = user_site_mapping.site_id and site.is_deleted=0 and user_site_mapping.is_deleted=0 and user_site_mapping.user_id = ?' , [user_id])
            }
            return siteTimeslotWithIncident
        }catch(er){
            logger.error(`Error in site Time slot query of violations list model : ${er}`)
        }
    } , 
    notificationCountBySiteId : async(siteid) => {
        let notificationCount 
        try{
            notificationCount = await db.query('SELECT COUNT(*) as count FROM `notificationdata` WHERE notificationdata.site_id = ?' , [siteid])
            return notificationCount
        }catch(er){
            logger.error(`Error in notification query of violations.model : ${er}`)
        }
    }, 

    notificationDataWithOffset : async(siteid , pageSize , start) => {
        let notificationData
        try{
            notificationData = await db.query('SELECT * FROM `notificationdata` WHERE notificationdata.site_id = '+ siteid + ' ORDER BY notificationdata.created_at DESC limit ' + pageSize + ' offset ' + start)
            return notificationData
        }catch(er){
            logger.error(`Error in notificationData query of violations.model : ${er}`)
        }
    } ,
    isIncidentOnSite : async (site_id) => {
        let isIncidentOnSite
        try{
            isIncidentOnSite = await db.query('SELECT is_incident_video_enable FROM `site_timeslot_mapping` where site_id =  ?' , [site_id])
            return isIncidentOnSite
        }catch(er){
            logger.error(`Error in isIncideOnSite in violations.model : ${er}`)
        }
    } , 
    updateNotification : async(resid , violatio_obj) => {
        const update_sql = 'update notification SET ? where id = ' + resid;
        let update
        try{
            update = await db.query( update_sql,violatio_obj, [site_id])
            return update
        }catch(er){
            logger.error(`Error in updateNotification  in violations.model : ${er}`)
        }
    } , 
    deleteNotification : async (site_obj) => {
        const delete_sql = 'update notification SET is_deleted = 1 where ?';
        let delete_res
        try{
            delete_res = await db.query(delete_sql , [site_obj])
            return delete_res
        }catch(er){
            logger.error(`Error in deleteNotification in violations.model : ${er}`)
        }
    }
}
export default violation
