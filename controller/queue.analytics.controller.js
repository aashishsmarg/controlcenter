import { authMiddleware, logger, router } from '../utils/imports.js'
import { commonModel } from '../model/model.imports.js'


router.get('/queueanalytics' , authMiddleware , async(req , res) => {
    let result
    try{
        
        result = await commonModel.getSiteAndTimeBySessionData(req.session)
        const { userId : user_id , username , role : userrole } = req.session
        res.render('queue_analytics/queue_analytics', { title: "Queue Analytics", data: result, username: username, userrole: userrole });
    }catch(er){
        logger.error(`Error in queue.analytics.contoller GET method : ${er}`)
    }
})
export default router