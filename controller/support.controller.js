import { router , fileUploadMiddleware  , logger , sendmailUtil , authMiddleware } from '../utils/imports.js' 
import { commonModel , supportModel } from '../model/model.imports.js'

router.get('/support' , async(req,res) => {
    try{
        const  {userId : user_id , username , role : userrole} = req.session 
        const data = await commonModel.getSiteAndTimeBySessionData(req.session)
        res.render('support/support' , { username , userrole , data})

    }catch(er){
        logger.error(`Error in get support - support.controller.js - ${er}`)
    }
})
router.post('/support', authMiddleware ,fileUploadMiddleware().single('file') , async (req,res) => {
    // router.post('/support' , async (req,res) => {
        try{
            const  {userId : user_id , username , role : userrole} = req.session 
            const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var  filename
            req.file?.path ? filename = req.file.path :  filename = "" 
            const DBData = { ...req.body , user_id , status : "Pending" , created_at , is_deleted:0  ,ticket_attachment :filename  }     
            const insertAck = await supportModel.insertion(DBData)
            sendmailUtil.sentSupportMail(DBData.site_name , DBData.name , DBData?.url , DBData.support_type , DBData.subject , DBData.description , DBData?.ticket_attachment )
            res.redirect('/support/list')
        }catch(er){
            console.log(`Error in support post API : ${er}`)
            logger.error(`Error in support post API : ${er}`)
            req.flash('msg_error', "error in adding ticket");
            res.redirect('/support/list')
        }
})
router.get('/support/list' , authMiddleware , async (req,res) => { 
    try{
        const  {userId : user_id , username , role : userrole} = req.session
        if(userrole != "Smarg_Admin")
            return res.redirect('/support') 
        
        let supportDetails = await supportModel.fetchSupportData({is_deleted:0})
        supportDetails = supportDetails.reverse()
        res.render('support/support_list.jade' , {username , userrole , supportDetails }) 
    }catch(er){
        logger.error(`Error in support data fetching in support model - ${er}`)
    }
})

router.post('/support/resolve' , async(req,res) => {
    try{
        const  {userId : user_id , username , role : userrole} = req.session
        req.body.ticketcomments = `${req.body.problemtitle} : ${req.body.ticketcomments}`;
        const updateAck = await supportModel.updateStatus(req.body)
        res.redirect('/support/list')  
    }catch(er){
        logger.error(`Error in support data fetching in support controller - ${er}`)
    }   
})

router.get('/support/details' , authMiddleware , async(req,res) => {
    try{
        const  {userId : user_id , username , role : userrole} = req.session
        const id = req.query.ticketid
        let supportDetails = await supportModel.fetchSupportById({ id })
        supportDetails = supportDetails[0]
        res.render('support/support_details' , { supportDetails , userrole , username })
    }catch(er){
        logger.error(`Error in support data fetching in support controller - ${er}`)
    }   
})
export default router
