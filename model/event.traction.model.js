import { db, logger } from '../utils/imports.js'



const events = {
    eventsList : async(site_id) => {
        try{
            const eventsList = await db.query("SELECT id as `stg_id`, tag_value FROM `site_tag_mapping` WHERE tag_id=7 and is_deleted=0 and site_id = ? and NOT tag_value ='No Event'" , [site_id])
            return eventsList
        }catch(er){
            logger.error(`Error in event.traction.model eventList ${er} `)
        }
    } 
}

export default events