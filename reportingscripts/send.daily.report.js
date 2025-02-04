import { logger,sendmailUtil,generate_parked_vehicle_report,generate_footfall_reports,generate_footfall_distribution_report} from '../utils/imports.js'
import { reportingMailModel } from '../model/model.imports.js'

class SendReport{    
    async processSites(singleSite){
        try{
            const { site_id ,site_name : sitename ,is_daily_reporting ,is_footfall_distribution_reporting ,is_footfall_trend_reporting ,is_FW_Reporting } = singleSite
            var d = new Date()

            var from_date = new Date(d.setDate(d.getDate() -1)).toISOString().split('T')[0];
            let sitestart = singleSite.start_time
            let siteend = singleSite.end_time
            let starttime = sitestart.slice(0,2)
            let endtime = siteend.slice(0,2)
            let sccauth_token = "uwTSsIsYO9QsD7szzaELQwJN0cfHdXEWLTCc65LSPLrgnVu3NNZhBbeHwWnGXw0A"            
            let todate
            if(+starttime - +endtime < 0 ){
                let dt = new Date()
                todate = new Date(dt.setDate(dt.getDate() - 1)).toISOString().split('T')[0]
            }else{
                let dt = new Date()
                todate = new Date(dt.setDate(dt.getDate())).toISOString().split('T')[0]
            }
            if(is_daily_reporting == 1){                
                if(is_footfall_trend_reporting == 1 && is_FW_Reporting == 1){
                    const stdOut = await generate_parked_vehicle_report({sitename , sccauth_token , site_id , from_date , sitestart , todate , siteend})
                    // const vehicle_filepath = `../report/${stdOut.split('\n')[0]}`
                    const cameraOnEachSites = await reportingMailModel.cameraOnEachSites(site_id)
                    const data = JSON.stringify(cameraOnEachSites)
                    const stdOut1 = await generate_footfall_reports({site_id , sitename , from_date , sitestart , todate , siteend , data ,})
                    // const footfall_filepath = `./report/${stdOut1.split('\n')[0]}`
                    const usersEmails = await reportingMailModel.selectUsersOfThatSite(site_id)
                    
                    const emailArray = usersEmails.map(singleEmail => singleEmail.email)
                    const fromDate = from_date + " " + sitestart
                    const toDate = todate + " " + siteend
                    const user_name = `Team`
                    const mailtype = `Automated Daily`

                    const vehicle_filepath="" , footfall_filepath=""
                    // console.log(emailArray , fromDate , toDate , vehicle_filepath , footfall_filepath , null , mailtype , user_name)
                    // sendmailUtil.sentmail(emailArray , fromDate , toDate , vehicle_filepath , footfall_filepath , null , mailtype , user_name )                       
                }else if(is_FW_Reporting == 1){
                    try{
                        const stdOut = await generate_parked_vehicle_report({sitename , sccauth_token , site_id , from_date , sitestart , todate , siteend})
                        console.log(`sitename is : : : : :: ${sitename}`)  
                        
                        // var vehicle_filepath = './report/' + stdOut.split('\n')[0]
                        var vehicle_filepath = ''
                        var fromDate = from_date + " " + sitestart
                        var toDate = todate + " " + siteend
                        var user_name = "Team"
                        var mailtype = 'Automated Daily'
                        const usersEmails = await reportingMailModel.selectUsersOfThatSite(site_id)
                        const emailArray = usersEmails.map(singleEmail => singleEmail.email)
                        // sendmailUtil.sentmail(emailArray, fromDate, toDate, vehicle_filepath, null,null, mailtype, user_name)
                    }catch(er){
                        logger.error(`Error in daily reporting  - send.daily.report : ${er}`)
                    }

                }else if(is_footfall_trend_reporting == 1){
                     try{
                    const result = reportingMailModel.cameraOnEachSites(site_id)
                    const data = JSON.stringify(result);
                    const stdOut1 = await generate_footfall_reports({site_id , sitename , from_date , sitestart , todate , siteend , data ,})                    
                    var fromDate = from_date + " " + sitestart
                    var toDate = todate + " " + siteend
                    var user_name = "Team"
                    var mailtype = 'Automated Daily'
                    var footfall_filepath = './report/' + stdOut1.split('\n')[0]
                    const usersEmails = reportingMailModel.selectUsersOfThatSite(site_id)
                    const emailArray = usersEmails.map(singleEmail => singleEmail.email)
                    // sendmailUtil.sentmail(emailArray, fromDate, toDate, null, footfall_filepath,null, mailtype, user_name)
                 }catch(er){
                        logger.error(`Error in daily reporting  - send.daily.report : ${er}`)
                    }
                 }
                if(is_footfall_distribution_reporting == 1){
                     try{

                    const result = reportingMailModel.cameraOnEachSites(site_id)
                    const data = JSON.stringify(result)
                    const stdOut2 = generate_footfall_distribution_report({site_id , sitename , from_date , sitestart , todate , siteend , data , })
                    var fromDate = from_date + " " + sitestart
                    var toDate = todate + " " + siteend
                    var user_name = "Team"
                    var mailtype = 'Automated Daily'
                    var footfall_distribution_filepath = './report/' + stdOut2.split('\n')[0]
                    const usersEmails = reportingMailModel.selectUsersOfThatSite(site_id)
                    const emailArray = usersEmails.map(singleEmail => singleEmail.email)
                    // sendmailUtil.sentmail(emailArray, fromDate, toDate, null, null,footfall_distribution_filepath, mailtype, user_name)
                 }catch(er){
                        logger.error(`Error in daily reporting  - send.daily.report : ${er}`)
                    }
                 }                
            }else{
                // console.log("Daily Reporting Disable For " + sitename)
                logger.error(`daily repoting is not enabled for site ${sitename}`)
            }

        }catch(er){
            logger.error(`Error in daily reporting  - send.daily.report : ${er}`)

        }
    }
    
    
    async sendDailyReport(){
        const result_data = await reportingMailModel.siteDetailsForReporting()
        for(let singleSite of result_data){
            await this.processSites(singleSite)
        }
    }
    
    // sendMonthlyReport(){
    // make it modular in same folder with filename send.monthly.report
    //     sendmailUtil.sentmail("wit soem extractd data from dp and reort file path")
    // }
    // sendWeeklyReport(){
    // make it modular in same folder with filename send.monthly.report
    //     sendmailUtil.sentmail("wit soem extractd data from dp and reort file path")
    // }
}
export default new SendReport