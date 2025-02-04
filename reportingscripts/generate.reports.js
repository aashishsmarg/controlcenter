import { exec , util } from '../utils/imports.js'


const execPromise = util.promisify(exec)
export async function generate_parked_vehicle_report (parkedVehicleReportData) {
    return new Promise(async(resolve) => {
        const {sitename , sccauth_token , site_id , from_date , sitestart , todate , siteend} = parkedVehicleReportData
        const parkedVehicleReportCmd = `python3 ././reportingscripts/generate_parked_vehicle_report.py  \'{\"site_name\":\"" + ${sitename} + "\",\"auth_token\":\"" + ${sccauth_token} + "\",\"site_id\":\"" + ${site_id} + "\",\"from_date\":\"" + ${from_date} + "T" + ${sitestart} + "\",\"to_date\":\"" + ${todate} + "T" + ${siteend} + "\",\"fileName\":\"" + ${todate} + "\"}\'`
        
        // console.log(parkedVehicleReportCmd)
        // const { stdout: parkedVehicleStdOut, stderr: parkedVehicleStdErr } = await execPromise(parkedVehicleReportCmd);
        // if(parkedVehicleStdOut){
        //     resolve(parkedVehicleStdOut)
        // }else if(parkedVehicleStdErr){
            // console.log(`Error in the generate report : ${parkedVehicleStdErr}`)
            // logger.error(`Error in the generate report : ${parkedVehicleStdErr}`)
        // }
        resolve("generation of report done")
    })
}
export async function generate_footfall_reports(footfallReportData){
    return new Promise(async (resolve) => {
        const {site_id , sitename , from_date , sitestart , todate , siteend , data ,} = footfallReportData
        const footfallReportCmd = `python3 ././reportingscripts/generate_footfall_reports.py  \'{\"site_id\":\"" + ${site_id} + "\",\"site_name\":\"" + ${sitename} + "\",\"from_date\":\"" + ${from_date} + " " + ${sitestart} + "\",\"to_date\":\"" + ${todate} + " " + ${siteend} + "\",\"zones\":" + ${data} + ",\"fileName\":\"" + ${todate} + "\"}\'` 
        // const { stdout: footfallTrendStdOut, stderr: footfallTrendStdErr } = await execPromise(footfallReportCmd);
        // if(footfallTrendStdOut){
        //     resolve(footfallTrendStdOut)
        // }else if(footfallTrendStdErr){
            // console.log(`Error in the generate report : ${footfallTrendStdErr}`)
            // logger.error(`Error in the generate report : ${footfallTrendStdErr}`)
        // }
        resolve("generation of report done")
    })
}
export async function generate_footfall_distribution_report(footfallDistributionReportData){
    return new Promise(async (resolve) => {
        const {site_id , sitename , from_date , sitestart , todate , siteend , data , } =  footfallDistributionReportData
        const footfallDistributionReportCmd = "python3 ././reportingscripts/footfall_distribution_report.py  \'{\"site_id\":\"" + site_id + "\",\"site_name\":\"" + sitename + "\",\"from_date\":\"" + from_date + " " + sitestart + "\",\"to_date\":\"" + todate + " " + siteend + "\",\"zones\":" + data + ",\"fileName\":\"" + todate + "\"}\'"

        const { stdout: footfallDistributionStdOut, stderr: footfallDistributionStdErr } = await execPromise(footfallReportCmd);
        // if(footfallDistributionStdOut){
        //     resolve(footfallDistributionStdOut)
        // }else if(footfallDistributionStdErr){
            // console.log(`Error in the generate report : ${footfallDistributionStdErr}`)
            // logger.error(`Error in the generate report : ${footfallDistributionStdErr}`)
        // }
        resolve("generation of report done")

    })
}