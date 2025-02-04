// import singletonObj from './commonjs/fireBaseConfig.js';


function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;  
    return /android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent);
  }
  
  
  
var singletonObj
 if (isMobile()) {
    console.log("You are on a mobile device");
} else {
    import('./commonjs/fireBaseConfig.js').then(module => {
        singletonObj = module.default;
        takeToken(singletonObj);
    }).catch(er => {
        console.error("Error loading the singletonObj:", er);
    });
        console.log("You are on a desktop device");
    takeToken(singletonObj)
  }





        // takeToken(singletonObj);

$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});
console.log("loginnnn js")
document.getElementById('signin-btn').onclick = () => {
    console.log("signin clicked")
    signinbuttonclick()
}
function signinbuttonclick() {
        console.log(`login clciked`)    
        const remember_me = document.getElementById('remember_me')
        let rememberme_field =  document.createElement('input')
        const deviceToken_field = document.getElementById('deviceToken')
        rememberme_field.type = 'hidden'
        rememberme_field.name = 'remember'
        rememberme_field.id = 'remember_me_temp'
        deviceToken_field.appendChild(rememberme_field)   
        remember_me.checked ?  rememberme_field.value = 'true' : rememberme_field.value = 'false'
        const loginfomdata = document.getElementById('login_form')
        console.log(loginfomdata)        
        loginfomdata.submit()
        
    }
    // get cookie username and password
    var cookie_username = document.getElementById('cookie_username').name
    var cookie_password = document.getElementById('cookie_password').name
    
    document.getElementById('username').value = cookie_username
    document.getElementById('password').value = cookie_password
    window.addEventListener('keydown', function (event) {  
        if(event.key == 'Enter'){
            signinbuttonclick()
        }
    })
function takeToken(singletonObj){
    
    try{
        const  messaging_obj = singletonObj.getFireBaseMessagingObj();
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./firebase-messaging-sw.js',{type:'module'}).then(res => {
                res.onupdatefound = () => {
        
                    const installingWorker = res.installing;
                    installingWorker.onstatechange = () => {
                      if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                          console.log('New update available');
                        }
                      }
                    };
                  };
    
                messaging_obj.useServiceWorker(res);
                messaging_obj.requestPermission()
                .then(() => messaging_obj.getToken({ vapidKey: 'BLfzYwLqUu34N9tF394zJw_-MILsCcaVCnITjtiMHbdm_3ts0IfeLghnKRNgeKHN0Zl8nG5HXHArttGXakxKigc' }))
                .then((token) => {
                    var deviceToken = document.getElementById("deviceToken");
                    console.log('FCM Token:', token);
                    deviceToken.value=token            
                })
                .catch((error) => {
                    console.error('Error getting permission or token:', error);
                });
                }).catch(e => {
                console.log(e);
            });
    }else{
        console.log(`Mobile APK`)
    }
    }catch(er){
        console.log(er)
    }
}









