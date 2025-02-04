import { db , logger } from '../utils/imports.js'
const reportingMail = {
    siteDetailsForReporting : async() => {
        try{
            const siteDetailsForReporting = await db.query(`SELECT site_reporting.site_id,site_reporting.is_daily_reporting , site_reporting.is_monthly_reporting,site_reporting.is_footfall_distribution_reporting,site_reporting.is_footfall_trend_reporting,site_reporting.is_FW_Reporting, site.site_name, site_timeslot_mapping.start_time,site_timeslot_mapping.end_time FROM site_reporting,site_timeslot_mapping,site WHERE site.id=site_reporting.site_id and site_timeslot_mapping.site_id=site.id and site.is_deleted=0`)
            return siteDetailsForReporting
        }catch(er){
            logger.error(`Error in reporting.mail.model siteDetailsForReporting : ${er}`)
        }
    },
    cameraOnEachSites : async(site_id) => {
        try{
            const cameraOnEachSites = await db.query(`SELECT DISTINCT(camera.id) , camera.display_name FROM gateway_camera_mapping,camera WHERE camera.is_deleted = 0 and gateway_camera_mapping.camera_id=camera.id and gateway_camera_mapping.is_deleted=0 and camera.site_id = ?` , [site_id])
            return cameraOnEachSites
        }catch(er){
            logger.error(`Error in reporting.mail.model cameraOnEachSites : ${er}`)
        }
    } ,
    selectUsersOfThatSite : async(site_id) => {
        try{
            const selectUsersOfThatSite = await db.query(`SELECT user.email FROM user ,user_site_mapping WHERE user.id=user_site_mapping.user_id and user.is_reporting=1 and user.is_deleted=0 and user_site_mapping.is_deleted=0 and user.is_deleted=0 and user_site_mapping.site_id= ? `, [site_id])
            return selectUsersOfThatSite
        }catch(er){
            logger.error(`Error in reporting.mail.model selectUsersOfThatSite : ${er}`)            
        }

    } ,
    monthlyReport : async() => {
        try{
            const monthlySiteData = db.query(`SELECT site_reporting.site_id,site_reporting.is_daily_reporting , site_reporting.is_monthly_reporting, site.site_name, site_timeslot_mapping.start_time,site_timeslot_mapping.end_time FROM site_reporting,site_timeslot_mapping,site WHERE site.id=site_reporting.site_id and site_timeslot_mapping.site_id=site.id`)
            return monthlySiteData

        }catch(er){
            logger.error(`Error in reporting.mail.model monthlyReport : ${er}`)            
        }
    } , 
    weeklyReport : async() => {
        try{

            const weeklyReportData = db.query(`SELECT site_reporting.site_id,site_reporting.is_daily_reporting , site_reporting.is_monthly_reporting, site_reporting.is_weekly_reporting, site.site_name, site_timeslot_mapping.start_time,site_timeslot_mapping.end_time FROM site_reporting,site_timeslot_mapping,site WHERE site.id=site_reporting.site_id and site_timeslot_mapping.site_id=site.id`)
            return weeklyReportData
        }catch(er){
            logger.error(`Error in reporting.mail.model weeklyReport : ${er}`)            

        }
    }
}
export default reportingMail