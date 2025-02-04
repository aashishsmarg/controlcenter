// import JWT here for auth
import { jwt , config, logger , db } from '../utils/imports.js'

const generateToken = (username , user_id) => {
    return new Promise(resolve => {
        const accesstoken = jwt.sign({ username , user_id } , config.JWT_key , {expiresIn: '8000'})
        const refreshtoken = jwt.sign({ username , user_id } , config.JWT_refresh_key , {expiresIn: '20000'})
        // {expiresIn: 86400}
        resolve({accesstoken , refreshtoken})
    })
}



const authMiddleware = (req , res , next) => {
    
    const accesstoken = req.cookies.accesstoken; // Access token from cookies  
    let decoded , refreshtoken , decoded_refresttoken
    if(!accesstoken){
        console.log("accesstoken is not available")
        logger.error(`accesstoken is not available`)
        return res.redirect('/logout')
    } 
    try{
        decoded = jwt.verify(accesstoken , config.JWT_key)
        console.log("accesstoken : "+  accesstoken)
        req.user = decoded
        next()
    }catch(er){
        if(er.name === "TokenExpiredError"){
            try{
            refreshtoken = req.cookies.refreshtoken
            decoded_refresttoken = jwt.verify(refreshtoken , config.JWT_refresh_key)
            const newusername = decoded_refresttoken.username
            const newuser_id = decoded_refresttoken.user_id
            const new_accesstoken = jwt.sign({ newusername , newuser_id } , config.JWT_key , {expiresIn: '8000'})
            console.log("re generated accesstoken : "+  new_accesstoken)
            res.cookie('accesstoken', new_accesstoken, { httpOnly: true })
            
            res.redirect(req.path)
            }catch(er){
                console.log("Even refresh token has been ranout , login again")
                req.flash("msg_error","Token is not valid, login again")
                req.session.is_login = false
                return res.redirect('/')
            }
        }else{
            console.log(`invalid token : ${er}`)
            logger.error(`invalid token : ${er}`)
            return res.redirect('/logout')
        }
    }
        

}


export { authMiddleware , generateToken }