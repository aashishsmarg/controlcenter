import { nodemailer, logger } from '../utils/imports.js';
class SentMail{

    constructor(){
        this.from = process.env.mailuser
        this.transporter = nodemailer.createTransport({
            host : "smtp.office365.com",
            port: 587, // TLS port
            secure: false, // Use TLS
            auth: {
                user: process.env.mailuser,
                pass: process.env.mailpassword
            }
        })
    }
    sentmail(email, startDate, endDate, filepath1, filepath2,filepath3, mailtype,user_name){
        
        var mailOptions = {}
        if( filepath1 && filepath2){
            mailOptions = {
                from: this.from,
                to: `aashish.khandelwal.smarg@gmail.com`, 
                cc: ``,
                subject: `Automailer: Smarg Footfall and Parked Vehicle Report`, 
                text: ``,
                html: '<!DOCTYPE html>'+
                '<html><head><title>Auto Generated Mail</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+"new user"+'</p>'+
                '<p>Greeting!</p>'+
                '<p>Please find attached Smarg Footfall and Parked Vehicle Report for the duration</p>'+
                '<p> From : '+"startDate"+'    To :'+"endDate"+' </p>'+
                '<p>Should you have any concern</p>'+
                '<p>Please write to support@smargtech.com</p><br><br>'+
                '<p>Regards <br>Smarg Support Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
            };
        }else if(filepath1){
            mailOptions = { 
                from: this.from,
                to: email, 
                cc: '',
                subject: 'Automailer: Smarg Parked Vehicle Report', 
                text: '',
                html: '<!DOCTYPE html>'+
                '<html><head><title>Auto Generated Mail</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+user_name+'</p>'+
                '<p>Greeting!</p>'+
                '<p>Please find attached Smarg Parked Vehicle Report for the duration</p>'+
                '<p> From : '+startDate+'    To :'+endDate+' </p>'+
                '<p>Should you have any concern</p>'+
                '<p>Please write to support@smargtech.com</p><br><br>'+
                '<p>Regards <br>Smarg Support Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
                attachments: [{ path: filepath1 }]
            }

        }else if (filepath2){
            mailOptions = {
                from: this.from,
                to: email, 
                cc: '',
                subject: 'Automailer: Smarg Footfall Report', 
                text: '',
                html: '<!DOCTYPE html>'+
                '<html><head><title>Auto Generated Mail</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+user_name+'</p>'+
                '<p>Greeting!</p>'+
                '<p>Please find attached Smarg Footfall Report for the duration</p>'+
                '<p> From : '+startDate+'    To :'+endDate+' </p>'+
                '<p>Should you have any concern</p>'+
                '<p>Please write to support@smargtech.com</p><br><br>'+
                '<p>Regards <br>Smarg Support Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
                attachments: [ { path: filepath2 }]
            }
        }
        if(filepath3){
            mailOptions = {
                from: this.from,
                to: email, 
                cc: '',
                subject: 'Automailer: Smarg Footfall Distribution Report', 
                text: '',
                html: '<!DOCTYPE html>'+
                '<html><head><title>Auto Generated Mail</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+user_name+'</p>'+
                '<p>Greeting!</p>'+
                '<p>Please find attached Smarg Footfall Distribution Report for the duration</p>'+
                '<p> From : '+startDate+'    To :'+endDate+' </p>'+
                '<p>Should you have any concern</p>'+
                '<p>Please write to support@smargtech.com</p><br><br>'+
                '<p>Regards <br>Smarg Support Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
                attachments: [ { path: filepath3 }]
            }
        }


        console.log(`sentttttttt mail`)
        console.log(mailOptions)
        // this.transporter.sendMail(mailOptions , (er , info) => {
        //     if(er){
        //         console.log(`Error in sending mail - sendmail.js : ${er}`)
        //         logger.error(`Error in sending mail - sendmail.js : ${er}`)
        //     }else{
        //         logger.info(`Mail sent successfully to ${info}`)
        //         console.log(`Mail sent successfully to ${info}`)
        //     }
        // })
    }



    // for support ticket only

    sentSupportMail(site_name , name , url , support_type , subject , description , ticket_attachment){
        
        var mailOptions = {}
        if( !ticket_attachment){
            mailOptions = {
                from: this.from,
                to: process.env.supportemail, 
                cc: ``,
                subject: `Support Ticket from ${site_name}`, 
                text: ``,
                html: '<!DOCTYPE html>'+
                '<html><head><title>Support Ticket</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+"<b>Smarg Team</b>"+'</p>'+
                '<p>Greeting!</p>'+
                '<p>This is to inform smarg team, the support Ticket has been raised from site : '+site_name+'</p>'+
                '<p> From : <b>'+name+'</b> </p>'+
                
                '<p>Kind of support they want : <b>'+support_type+'</b></p>'+
                '<p>Ticket Subject : <b>'+subject+'</b></p>'+
                '<p>Ticket Description : '+description+'</p>'+
                '<p>Related URL : '+url+'</p>'+
                '<p>Regards <br>Smarg Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
            };
        }else if(ticket_attachment){
            mailOptions = { 
                from: this.from,
                to: process.env.supportemail, 
                cc: '',
                subject: `Support Ticket from ${site_name}`, 
                text: '',
                html: '<!DOCTYPE html>'+
                '<html><head><title>Support Ticket</title>'+
                '</head><body><div style="color:black;">'+
                '<p>Dear '+"<b>Smarg Team</b>"+'</p>'+
                '<p>Greeting!</p>'+
                '<p>This is to inform smarg team, the support Ticket has been raised from site : '+site_name+'</p>'+
                '<p> From : '+name+' </p>'+
                
                '<p>Kind of support they want : <b>'+support_type+'</b></p>'+
                '<p>Ticket Subject : <b>'+subject+'</b></p>'+
                '<p>Ticket Description : '+description+'</p>'+
                '<p>Related URL : '+url+'</p>'+
                '<p>Regards <br>Smarg Team <br>smargtech.com</p><br><br>'+
                '<p style="font-size: 11px;">The Report is auto generated . If you have received it by mistake, please inform us by an email reply.</p><br><br>'+
                '</div></body></html>' , 
                attachments: [{ path: ticket_attachment }]
            }
        }
        
        this.transporter.sendMail(mailOptions , (er , info) => {
            if(er){
                console.log(`Error in sending mail - sendmail.js : ${er}`)
                logger.error(`Error in sending mail - sendmail.js : ${er}`)
            }else{
                logger.info(`Mail sent successfully to ${JSON.stringify(info)}`)
                // console.log(`Mail sent successfully to ${JSON.stringify(info)}`)
            }
        })
}


}
export default new SentMail