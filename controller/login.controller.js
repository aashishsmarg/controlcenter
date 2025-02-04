import { router , axios , logger , rateLimit , config  , generateToken , encrypt , decrypt } from '../utils/imports.js';
import user_siteModal from '../model/user_site.model.js'


const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 4, 
    message: 'Too many login attempts, please try again later',
    keyGenerator: (req) => `${req.body.username}`,
    standardHeaders: true,
    legacyHeaders: false,
  });


router.get("/", async(req, res) => { 
    console.log(`redirected to the dashboad : ${req.session.is_login}`)

    if (!req.session.is_login) {
        let hash_username = req.cookies.username;
        let hash_password = req.cookies.password;
        if(hash_username && hash_password){
            var deco_username = decrypt(process.env.crypto_password,hash_username.salt , hash_username.iv , hash_username.encrypted )
            var deco_password = decrypt(process.env.crypto_password,hash_password.salt , hash_password.iv , hash_password.encrypted )
        }else{
            var deco_username = ""
            var deco_password = ""
        }
        res.render('main/login' , {"username":deco_username, "password" :deco_password });  
    }else{
        console.log(`redirected to the dashboad : ${req.session.is_login}`)
        res.redirect('/dashboard');
    }
});

// router.post("/login",async(req,res)=>{
    router.post("/login",loginLimiter,async(req,res)=>{
    const v_email = req.body.username
    const v_pass = req.body.txtPassword

    console.log(`v_email : ${v_email}`)
    if(v_email=== "" || v_pass === ""){
        req.flash('msg_error',"Enter Username and Password")
        return res.redirect('/')
    }
    let v_deviceToken = req.body.deviceToken
    const hashedEmail = encrypt(process.env.crypto_password,v_email)
    const hashedPassword = encrypt(process.env.crypto_password,v_pass)
    if(req.body.remember == "true"){
        res.cookie('username' , hashedEmail , { httpOnly: true })
        res.cookie('password' , hashedPassword , { httpOnly: true })
    }else{
        res.cookie('username' , "" , { httpOnly: true })
        res.cookie('password' , "" , { httpOnly: true })
    }
    v_deviceToken = v_deviceToken == '' || undefined ? "devicetoken" :  v_deviceToken
    const requestBody = {
        "username": v_email,
        "password": v_pass,
        "role": "manager",
        "device_token": v_deviceToken
    }
    const userExists = await user_siteModal.validUser(requestBody)
    if(userExists.length <= 0){
        logger.error(`Invalid username : ${v_email} and password : ${v_pass}`)
        req.flash("msg_error","Invalid Username or Password")
        console.log(`Invalid username : ${v_email} or password : ${v_pass} `)
        res.redirect('/')
    }else{
        try{
            var response = await axios.post(`${config.API_URL}/user`, requestBody);
            console.log(response)
            const loginData = response.data.result
            const auth = loginData.auth_token;
            const isadmin = loginData.isDeleteFunctionalityEnable;
            const user_id = loginData.user_id;
            const role = loginData.role
            console.log(`role login ${role}`)
            const emailId = loginData.user_email
            const uname = loginData.user_name
            const username = userExists[0].display_name
            const siteList = await user_siteModal.getUserSite({"userId":user_id , "role":role})
            if(siteList.length > 0){
                req.session.userId = user_id;
                req.session.is_login = true;
                req.session.name = uname;            
                req.session.auth = auth;
                req.session.isadmin = isadmin;
                req.session.emailId = emailId;
                req.session.role = role;
                req.session.username = username;
                const { accesstoken , refreshtoken } = await generateToken(username , user_id)
                res.cookie('accesstoken', accesstoken , { httpOnly: true });
                res.cookie('refreshtoken', refreshtoken , { httpOnly: true });
                // insert into db also
                await user_siteModal.updateRefreshToken({  user_id , refreshtoken })
                logger.info(`User ${username} login successfully`)
                console.log(`User ${username} login successfully`)
                res.redirect('/dashboard')
            }else{
                logger.error(`No sites are mapped for user : ${v_email}`)
                console.log(`No sites are mapped for user : ${v_email}`)
                req.flash('msg_error',"Unable to login Control Center")
                res.redirect('/')
            }
        }catch(er){
            logger.error(`Error in login post request login.controller - login.post : ${er}`)
            console.log("API is not working : "+er)
            console.log("Error in login post request login.controller - login.post : "+er)
            req.flash('msg_error',"Unable to connect with server") 
            res.redirect('/')
        }
        }
})
router.get('/logout',(req,res)=>{
    req.session.destroy(er => {
        if(er){
            logger.error(`Error in destorying session login.controller - logout : ${er}`)
            console.log("error in destorying session, login.controller - logout :"+ er)
        }
        res.clearCookie('accesstoken');
        res.clearCookie('refreshtoken');
        res.redirect('/')
    })
})
export default router;