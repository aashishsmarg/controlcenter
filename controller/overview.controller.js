import { router , config , authMiddleware} from '../utils/imports.js'
import { user_siteModal , overviewModal } from '../model/model.imports.js'


var imgLink = config.imgLink

const overviewData = async(req , res , v_siteid) => {
    let rows , result , camdata

    try{
        const {userId : user_id , username , role : userrole} = req.session
        result = await user_siteModal.getUserSite(req.session)
        rows = await overviewModal.overviewTable(v_siteid)
        if(rows.length >0){
            camdata = await overviewModal.cameraList();
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < camdata.length; j++) {
                    if (camdata[j]['id'] == rows[i]['camgrpid']) {
                        rows[i]['image_path'] = camdata[j]['image_path']
                        rows[i]['current_view_image_path'] = camdata[j]['current_view_image_path']
                    }
                }
            }
            res.render('overview/overview', { title: "Overview", datas: result, data: rows, v_siteid: v_siteid, username: username, userrole: userrole, imgLink: imgLink })
        }
    }catch(er){
        logger.error(`error in overview get method : ${er}`) 
        res.status(500).send("Intenal Server error")  
    }
}





router.get('/overview' , authMiddleware ,async(req,res)=>{
    try{
        
        const result = await user_siteModal.getUserSite(req.session)
        const v_siteid = result[0]?.site_id
        await overviewData(req,res,v_siteid)    
    }catch(er){
        logger.error(`Error in overview GET method ${er}`)
    }
})

router.get('/overview/data/(:id)' , authMiddleware , async(req , res ) => {
    try{
        
        const v_siteid = req.params.id
        await overviewData(req , res , v_siteid)
    }catch(er){
        logger.error(`Error in overview GET method with params ${er}`)
    }
})

export default router