import { logger , router , authMiddleware } from '../utils/imports.js'
import { commonModel } from '../model/model.imports.js'



router.get('/monitoring' , authMiddleware , async(req , res)=>{
    let result

    try{
        const    {userId : user_id , username , role:userrole} = req.session
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('monitoring/monitoring', { title: "System Health", data: result, username: username, userrole: userrole });
    }catch(er){
        logger.error(`Error in Monitoring GET method - monitoring.controller.js : ${er}`)        
    }
})
export default router