import { db , logger } from '../utils/imports.js'


const user_site = {
    // it is only using in login and overview because time is not makes any sense here, if need this query with time go to common.model.js 
    getUserSite : async(condition_obj) => {
        try{
            let siteList 
            const user_id = condition_obj.userId
            const role = condition_obj.role
            if(role == "Smarg_Admin"){
                siteList = await db.query("SELECT * FROM `site` where  site.is_deleted=0")
                siteList.forEach(resultmini => {
                    resultmini.site_id = resultmini.id
                })
                return siteList 
            }else{
                siteList = await db.query("SELECT * FROM `site`,user_site_mapping where site.id = user_site_mapping.site_id and site.is_deleted=0 and user_site_mapping.is_deleted=0 and user_site_mapping.user_id = ?",[user_id])
                return siteList 
            }
        }catch(er){
            logger.error(`Error in user_site.modal - getUserSite ${er}`)
        }
        
    },

    // Here time is also mentioned because it is using in dashboard.js for the time.

    getUserSiteWithTime : async(condition_obj) => {
        try{
            let siteList 
            const user_id = condition_obj.userId
            const role = condition_obj.role
            if(role == "Smarg_Admin"){
                siteList = await db.query("SELECT `client`.`id`,`client`.`cl_start_time`,`client`.`cl_end_time`,`site`.*,`site_timeslot_mapping`.* FROM `client`,`site`,`site_timeslot_mapping` where `client`.`id`=site.client_id  and site.is_deleted=0   and site_timeslot_mapping.site_id=site.id")
                // siteList.forEach(resultmini => {
                //     resultmini.site_id = resultmini.id
                // })
                return siteList 
            }else{
                siteList = await db.query("SELECT `client`.`id`,`client`.`cl_start_time`,`client`.`cl_end_time`,`site`.*,`user_site_mapping`.*,`site_timeslot_mapping`.* FROM `client`,`site`,`user_site_mapping`,`site_timeslot_mapping` where `client`.`id`=`site`.`client_id` and site.id = user_site_mapping.site_id and site.is_deleted=0  and user_site_mapping.is_deleted=0 and site_timeslot_mapping.site_id=site.id and user_site_mapping.user_id =?",[user_id])
                return siteList 
            }
        }catch(er){
            logger.error(`Error in user_site.modal - getUserSite ${er}`)
        }
        
    },
    validUser : async(condition_obj) => {
        try{
            let userExists 
            const username = condition_obj.username
            const password = condition_obj.password
            userExists = await db.query("select * from user where is_deleted =0 and username=  ?  and password=  ?  ", [username , password])
            return userExists
        }
        catch(er){
            logger.error(`Error in user_site.modal - getUserSite ${er}`)
        }
    },
    updateRefreshToken : async(condition_obj) => {

        try{
            const refreshtoken = condition_obj.refreshtoken
            const user_id = condition_obj.user_id
            const refreshUpdateAck = db.query(`update user set refresh_token = ? where id = ? ` , [refreshtoken , user_id])
            return refreshUpdateAck
        }catch(er){
            logger.error(`Error in updateing refresh token - user_sitemodel : ${er}`)
        }
    },
    fetchRefreshToken : async (user_id) => {
        try{
            const refreshToken = db.query(`select refresh_token from user where id=?`, [user_id])
            return refreshToken

        }catch(er){
            logger.error(`Error in taking refresh token - user_sitemodel : ${er}`)            
        }
    }
}
export default user_site

