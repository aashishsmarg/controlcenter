import { router , logger , authMiddleware  } from '../utils/imports.js'
import { commonModel } from '../model/model.imports.js'



router.get('/vehicleanalytics' , authMiddleware ,async(req , res) => {
    let result
    try{
        
        const {userId : user_id , username , role : userrole} = req.session
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('vehicle_analytics/vehicle_analytics', { title: "Vehicle Trends", data: result, username: username, userrole: userrole , user_id : user_id });
    }catch(er){
        logger.error(`Error in Vehicleanalytics.controller GET method ${er}`)
    }
})
export default router






//  