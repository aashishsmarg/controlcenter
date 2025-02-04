import { router , sendDailyReportScript , SendMonthlyReportScript , SendWeeklyReportScript } from '../utils/imports.js';
router.get('/testmail' , (req,res) => {

    // there is some crons which gets triggered automatically
    sendDailyReportScript.sendDailyReport()
    // SendMonthlyReportScript.sendMonthReport() // SendWeeklyReportScript.sendWeeklyReport()
    })
export default router