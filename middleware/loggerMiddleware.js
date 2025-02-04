import {winston , path , dirname , fileURLToPath , moment} from '../utils/imports.js'
const __dirname = dirname(fileURLToPath(import.meta.url));

const logDir = path.join(__dirname , '../tests')
// configuring moment here , If using in multiple places configure it in middleware folder
const getISTTime = () => {  
    const now = new Date();  
    const istDate = moment(now).tz("Asia/Kolkata");
    const formattedISTDate = istDate.format('DD-MM-YYYY HH:mm:ss');  
    return formattedISTDate;
};  
const logger = winston.createLogger({
    level: 'info',
    format : winston.format.combine(
        winston.format.timestamp({format : getISTTime}),
        winston.format.json()
    ),
    transports : [        
        new winston.transports.File({filename : path.join(logDir,'SurveillanceInfo.log'),level:'info'}),
        new winston.transports.File({filename : path.join(logDir,'SurveillanceError.log'),level:'error'})
    ]
}) 
export default logger