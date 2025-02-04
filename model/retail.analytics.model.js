import { db , logger } from '../utils/imports.js'



const retailAnalytics = {
    CameraOnGateway : async (site_id) => {
        let CameraOnGateway
        try{
            CameraOnGateway = await db.query('SELECT DISTINCT(camera.id) , camera.display_name FROM gateway_camera_mapping,camera WHERE camera.is_deleted = 0 and gateway_camera_mapping.camera_id=camera.id and gateway_camera_mapping.is_deleted=0 and camera.site_id = ?' , [site_id])
        }catch(er){
            logger.error(`Error in common.model.js - getSiteTimeById : ${er}`)            
        }
        return CameraOnGateway
        
    }
}
export default retailAnalytics