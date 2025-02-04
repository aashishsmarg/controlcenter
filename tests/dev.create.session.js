











const adminSession = (req , res , next) => {
    return new Promise(resolve => {
        
        req.session.userId= 8,
        req.session.is_login= true,
        req.session.name= 'admin',
        req.session.auth= 'YpOP3gudZ2iTBQZAKBY315KWpI0vOPlk900y4qL2D87ZbMqe2EBVPa2aOPlZDUxP',
        req.session.isadmin= false,
        req.session.emailId= 'user@gmail.com',
        req.session.role= 'Smarg_Admin',
        req.session.username= 'admin'
        // resolve(req)
        next()
    })
}
const userSession = (req, res , next) => {
    return new Promise(resolve => {
        req.session.userId= 12,
        req.session.is_login= true,
        req.session.name= 'manager',
        req.session.auth= 'YpOP3gudZ2iTBQZAKBY315KWpI0vOPlk900y4qL2D87ZbMqe2EBVPa2aOPlZDUxP',
        req.session.isadmin= false,
        req.session.emailId= 'user@gmail.com',
        req.session.role= 'manager',
        req.session.username= 'user'
        next()
    })
}
export {adminSession , userSession}