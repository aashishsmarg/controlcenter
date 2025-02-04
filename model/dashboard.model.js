import { db } from '../utils/imports.js'


const dashboardModal = {
    countZone : async (sitesar) => {
        try{
            const countzone = await db.query('SELECT camera.id as camgrpid FROM camera,gateway_camera_mapping WHERE camera.site_id IN (' + sitesar + ') and camera.is_deleted = 0 and gateway_camera_mapping.camera_id=camera.id and gateway_camera_mapping.is_deleted=0')
            return countzone
        }catch(er){
            console.log("error in dashboard.modal - countZone : "+er)
        }
        },
    
    countRule : async(sitesar) => {
        try{
            const countRule = await db.query('SELECT COUNT(DISTINCT `rule_name`) as countrule FROM `overview` WHERE overview.site_id IN (' + sitesar + ')')
            return countRule
        }catch(er){
            console.log("error in dashboard.modal - countRule : "+er)
        }
    }
} 
export default dashboardModal
