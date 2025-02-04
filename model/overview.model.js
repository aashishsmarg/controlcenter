import { db , logger } from '../utils/imports.js'



const overviewModal = {
    overviewTable : async (site_id) => {
        let rows
        try{
            rows = await db.query("SELECT * FROM `overview` where NOT rule_name = 'Staff Count Exclusion' and site_id = ?" , [site_id])
        }catch(er){
            console.log(`Error in overview.modal - overviewTable ${er}`)
            logger.error(`Error in overview.modal - overviewTable ${er}`)
        }
        return rows
    },
    cameraList : async () => {
        let camdata
        try{
            camdata = await db.query("SELECT * FROM `camera` where is_deleted =0")
        }catch(er){
            logger.error(`Error in overview.modal - CameraList ${er}`)
            console.log(`Error in overview.modal - CameraList ${er}`)
        }
        return camdata
    }        
}
export default overviewModal
