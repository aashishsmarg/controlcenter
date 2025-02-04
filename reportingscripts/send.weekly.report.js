import { logger,sendmailUtil,generate_parked_vehicle_report,generate_footfall_reports,generate_footfall_distribution_report } from '../utils/imports.js'
import { reportingMailModel } from "../model/model.imports.js";


class SendWeeklyReport{
    async processSites(singleSite){
        try{
            const { site_id , site_name : sitename , is_weekly_reporting , start_time : sitestart , end_time : siteend } = singleSite
            
            let starttime = sitestart.slice(0, 2);
            let endtime = siteend.slice(0, 2);
            const sccauth_token = "uwTSsIsYO9QsD7szzaELQwJN0cfHdXEWLTCc65LSPLrgnVu3NNZhBbeHwWnGXw0A"
            let dd = new Date()
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = weekday[dd.getDay()]
            console.log(`day : ${day}`)
        
            if (day == "Monday" && is_weekly_reporting == 1) {       
                    let sdate = new Date();
                    let edate = new Date();
                    sdate.setDate(new Date().getDate() - 7 )
                    sdate = sdate.toISOString().split('T')[0]
                    edate.setDate(new Date().getDate() -1 )
                    if(+starttime - +endtime >= 0){
                        edate = new Date(edate.setDate(edate.getDate() + 1 )).toISOString().split('T')[0]
                    }else{
                        edate = edate.toISOString().split('T')[0]
                    }    
            const stdOut = await generate_parked_vehicle_report({sitename , sccauth_token , site_id , from_date : sdate , sitestart , todate : edate , siteend})
            const vehicle_filepath = './report/' + stdOut.split('\n')[0]
            const result = reportingMailModel.cameraOnEachSites(site_id)
            const data = JSON.stringify(result);
    
            const stdOut1 = await generate_footfall_reports({site_id , sitename , from_date : sdate , sitestart , todate : edate ,siteend , data})
            var fromDate = sdate + " " + sitestart
            var toDate = edate + " " + siteend
            var user_name = "Team"
            var mailtype = 'Automated Weekly'

            var footfall_filepath = './report/' + stdOut1.split('\n')[0]
            const usersEmails = await reportingMailModel.selectUsersOfThatSite(site_id)
            const emailArray = usersEmails.map(singleEmail => singleEmail.email)
            sendmailUtil.sentmail(emailArray , fromDate , toDate , vehicle_filepath , footfall_filepath , null , mailtype , user_name )    
        } else {
                    console.log(`No need to send weekly report for site `)
                }

        }catch(er){
            logger.error(`Error in weekly reporting  - send.weekly.report : ${er}`)
        }
    }

    async sendWeeklyReport(){
         try{
            const result_data = await reportingMailModel.weeklyReport()
            for(let singleSite of result_data){
                await this.processSites(singleSite)
            }
     }catch(er){
        logger.error(`Error in weekly reporting  - send.weekly.report : ${er}`)
    } 
}
}
   

   
export default new SendWeeklyReport