
function getLogger(){
  var moment = require('moment'),
      timestamp = moment().format('DD-MM-YYYY HH:mm:ss');


const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { timestamp: timestamp },
  transports: [
    new winston.transports.File({ filename: 'Surveillance.log'  }),
  ],
});

return logger;
}

module.export={getLogger}