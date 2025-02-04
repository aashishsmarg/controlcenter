import { logger,sendmailUtil,generate_parked_vehicle_report,generate_footfall_reports,generate_footfall_distribution_report} from '../utils/imports.js'
import {  reportingMailModel } from "../model/model.imports.js";


class SendMonthlyReport{
    async processSites(singleSite){
         try{
        const { site_id , site_name : sitename , is_monthly_reporting , start_time , sitestart , siteend } = singleSite
        let st = result.start_time.split(':')

        
        let starttime = sitestart.slice(0, 2);
        let endtime = siteend.slice(0, 2);
        const sccauth_token = "uwTSsIsYO9QsD7szzaELQwJN0cfHdXEWLTCc65LSPLrgnVu3NNZhBbeHwWnGXw0A"
        let dd = new Date()
        let day = dd.getDate()
        if ((day == 1 || day == 1) && is_monthly_reporting == 1) {
        var s_date = new Date();
                s_date.setDate(0);
                s_date.setDate(1);
        var sdate = s_date.toISOString().split('T')[0];
        var edate = new Date()
        edate.setDate(0);
        if (parseInt(starttime) - parseInt(endtime) >= 0) {
            edate = new Date(edate.setDate(edate.getDate() + 1)).toISOString().split('T')[0];
        } else {
            edate = edate.toISOString().split('T')[0];
        }
        const stdOut = await generate_parked_vehicle_report({sitename , sccauth_token , site_id , from_date : sdate , sitestart , todate : edate , siteend})
        const vehicle_filepath = './report/' + stdOut.split('\n')[0]
        

        const result = reportingMailModel.cameraOnEachSites(site_id)
        const data = JSON.stringify(result);

        
        
        const stdOut1 = await generate_footfall_reports({site_id , sitename , from_date : sdate , sitestart , todate : edate ,siteend , data})
        var fromDate = sdate + " " + sitestart
        var toDate = edate + " " + siteend
        var user_name = "Team"
        var mailtype = 'Automated Monthly'
        var footfall_filepath = './report/' + stdOut1.split('\n')[0]
        const usersEmails = reportingMailModel.selectUsersOfThatSite(site_id)
        const emailArray = usersEmails.map(singleEmail => singleEmail.email)
        sendmailUtil.sentmail(emailArray , fromDate , toDate , vehicle_filepath , footfall_filepath , null , mailtype , user_name )                       

    } else {
                console.log(`No need to send monthly report for site `)
            }  }catch(er){
                        logger.error(`Error in monthly reporting  - send.monthly.report : ${er}`)
                    }
                }
    async sendMonthReport(){
         try{
        const result_data = await reportingMailModel.monthlyReport()
        for(let singleSite of result_data){
            await this.processSites(singleSite)
        }
    }catch(er){
        logger.error(`Error in monthly reporting  - send.monthly.report : ${er}`)
    }
}
}  
export default new SendMonthlyReport