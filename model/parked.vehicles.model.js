import { db, logger } from '../utils/imports.js'




const parkedVehiclesModel = {
    siteWithReporting : async (condition_obj) => {
        let siteWithReporting
        try{
            const role = condition_obj.role
            const user_id = condition_obj.userId
            if(role == 'Smarg_Admin')
            {
                siteWithReporting = await db.query('SELECT * FROM `site`,`site_reporting` where site.id =`site_reporting`.`site_id`  and site.is_deleted=0')
            }else{
                siteWithReporting = db.query('SELECT * FROM `site`,`user_site_mapping`,`site_reporting` where site.id = user_site_mapping.site_id and `site`.`id`=`site_reporting`.`site_id` and site.is_deleted=0 and user_site_mapping.is_deleted=0 and user_site_mapping.user_id = ?' , [user_id])   
            }
            return siteWithReporting
        }catch(er){
            logger.error(`Error in object1 parked.vehicles.model : ${er} `)
        }
    }
}

export default parkedVehiclesModel