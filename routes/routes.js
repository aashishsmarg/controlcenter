module.exports = app => {
    
    const User = require("../controllers/user.controller.js");
    const Camera_group = require("../controllers/camera_group.controller.js");
    const vehiclelist = require("../controllers/vehiclelist.js");
	var router = require("express").Router();
    ///////////////////////////////USERS/////////////////////////////
    
    router.post("/user", User.login); 
    router.post("/logout", User.logout);   
    router.get("/camera_group", Camera_group.findAll);
    router.get("/vehiclelist", vehiclelist.findAll);

    app.use('/vehicle_counting', router);
};
