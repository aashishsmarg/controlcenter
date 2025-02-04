import { db, logger } from '../utils/imports.js'


const supportModel = {
    insertion : (payload) => {
        try{
            const { user_id ,name , site_name , priority , url , support_type , status ,  subject , description , created_at , is_deleted , ticket_attachment } = payload
            const insertAck = db.query(`insert into support(user_id , name , site_name , support_type , priority , status , resolved_by , resolved_comments , ticket_subject , ticket_url , ticket_description , ticket_attachment , is_deleted , created_at , updated_at) values( ${user_id} , "${name}" , "${site_name}" , "${support_type}" , "${priority}" , "${status}" , Null , Null , "${subject}" , "${url}" , "${description}" , "${ticket_attachment}" , ${is_deleted} , "${created_at}" , Null  )`)
            return insertAck
        }catch(er){
            logger.error(`Error in support raise a ticket model - ${er}`)
        }
    },
    fetchSupportData : (condition_obj) => {
        try{
            const { is_deleted } = condition_obj
            const supportData = db.query(`select * from support where is_deleted = ${is_deleted}`)
            return supportData
        }catch(er){
            logger.error(`Error in support data fetching in support model - ${er}`)
        }
    } , 
    fetchSupportById : ({ id }) => {
        try{
            const supportData = db.query(`select * from support where id=${id}`)
            return supportData
        }catch(er){
            logger.error(`Error in support data fetching by ID in support model - ${er}`)
        }
    },



    updateStatus : ({ ticketid , ticketcomments , resolved_by }) => {
        try{
            console.log({ ticketid , ticketcomments , resolved_by })
            const updateStatus = db.query(`UPDATE support SET status="Closed",resolved_by="${resolved_by}",resolved_comments="${ticketcomments}" WHERE id=${ticketid}`)
            return updateStatus


        }catch(er){
            logger.error(`Error in support data updation by ID in support model - ${er}`)
        }
    }
    

}



export default supportModel








 