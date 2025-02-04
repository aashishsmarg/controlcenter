// // import JWT here for auth
// import { jwt , config, logger } from '../utils/imports.js'

// const generateToken = (username) => {
//     return new Promise(resolve => {
//         const accesstoken = jwt.sign({ username } , config.JWT_key , {expiresIn: '80000'})
//         resolve({accesstoken})
//     })
// }
// const authMiddleware = (req , res , next) => {
//     // return next()
//     const token = req.cookies.accesstoken; // Access token from cookies
//     console.log(token)
//     let decoded
//     if(!token){
//         console.log("Token is not available")
//         logger.error(`Token is not available`)
//         return res.redirect('/logout')
//     } 
//     try{
//         decoded = jwt.verify(token , config.JWT_key)
//         req.user = decoded
//         next()
//     }catch(er){
//         console.log(`invalid token : ${er}`)
//         logger.error(`invalid token : ${er}`)
//         res.redirect('/logout')
//     }
// }
// export { authMiddleware , generateToken }

















// import JWT here for auth
import { jwt , config, logger } from '../utils/imports.js'
import user_siteModal from '../model/user_site.model.js'
const generateToken = (username , user_id) => {
    return new Promise(resolve => {
        const accesstoken = jwt.sign({ username , user_id } , process.env.JWT_key , {expiresIn: config.access_timeout})
        const refreshtoken = jwt.sign({ username , user_id } , process.env.JWT_refresh_key , {expiresIn:config.refresh_timeout })
        // {expiresIn: 86400}
        resolve({accesstoken , refreshtoken})
    })
}



const authMiddleware = async (req , res , next) => {

    if(!req.session.is_login)
        return res.redirect('/')

    const accesstoken = req.cookies.accesstoken; // Access token from cookies  
    let decoded , refreshtoken , decoded_refresttoken
    refreshtoken = req.cookies.refreshtoken
    if(!accesstoken){
        console.log("accesstoken is not available")
        logger.error(`accesstoken is not available`)
        return res.redirect('/logout')
    } 
    try{
        decoded = jwt.verify(accesstoken , process.env.JWT_key)
        console.log("accesstoken : "+  accesstoken)
        console.log("refreshtoken : "+  refreshtoken)
        
        req.user = decoded
        next()
    }catch(er){
        if(er.name === "TokenExpiredError"){
            try{
            decoded_refresttoken = jwt.verify(refreshtoken , process.env.JWT_refresh_key)
            const newusername = decoded_refresttoken.username
            const newuser_id = decoded_refresttoken.user_id
            const dbRefreshToken = await user_siteModal.fetchRefreshToken(newuser_id)
            
            if(dbRefreshToken[0]['refresh_token'] == refreshtoken){
                const new_accesstoken = jwt.sign({ username : newusername , user_id : newuser_id } , process.env.JWT_key , {expiresIn: config.access_timeout})
                console.log("re generated accesstoken : "+  new_accesstoken)
                res.cookie('accesstoken', new_accesstoken, { httpOnly: true })
                res.redirect(req.path)
            }else{
                console.log("user logidin somewhere else")
                req.flash("msg_error","user logidin somewhere else, login again")
                req.session.is_login = false
                return res.redirect('/')
            }
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



































