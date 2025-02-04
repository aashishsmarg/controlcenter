import { mysql , dotenv } from '../utils/imports.js'
dotenv.config()

// Implement the singleton here
class DBInstance{
    constructor(){
        if(DBInstance){
            return DBInstance.instance
        }
        this.pool = mysql.createPool({
            host : process.env.db_host,
            user : process.env.db_username,
            password : process.env.db_password,
            database : process.env.db_name,
        })        
        this.pool.query = util.promisify(this.pool.query);
        DBInstance.instance = this
}
getInstance(){
    return this.pool
}
}
const DBobj = new DBInstance()
const pool=DBobj.getInstance()
export default pool

    // const pool = mysql.createPool({
    //     host : 'localhost',
    //     user : 'root' , 
    //     password : '',
    //     database : 'surveillance_v1.8.0'
    // })
    // pool.query = util.promisify(pool.query);
    // export default pool
    // even above commented code is working but created singleton class for maintability