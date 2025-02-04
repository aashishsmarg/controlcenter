import singletonObj from './public/js/commonjs/fireBaseConfig.js';
const  messaging_obj = singletonObj.getFireBaseMessagingObj();

messaging_obj.setBackgroundMessageHandler(function(payload) {
  
    const title=payload.data.title
    const body=payload.data.message
    const icon=payload.data.icon

    const notificationOptions = {
      body: body,
      icon: icon,
      sound: 'default',
      data: { 
        link: 'https://smargtech.in:3004' // Pass the click action link here
        // link: 'http://localhost:3002/violations' // Pass the click action link here
      }
    };
    return self.registration.showNotification(title, notificationOptions);
});
self.addEventListener('notificationclick', function(event) {
    console.log("%%%%%%%******----------******%%%%%%%%%%%")
    event.notification.close(); // Close the notification when it's clicked
    const clickAction = event.notification.data.link;
    // Handle the click action
    event.waitUntil(
        clients.openWindow(clickAction) // Open the link in a new window/tab
    );
});



/*
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
var firebaseConfig = {
     apiKey: "AIzaSyDDFphd7ioHLcmCfXt-eta8ljX0ex2yV6s",
     projectId: "my-project-1409b",
     storageBucket: "com.myproject.myproject",
     messagingSenderId: "130527465681",
     appId: "1:130527465681:android:7ff6c5732b020575e275f0"
 };

 firebase.initializeApp(firebaseConfig);
 const messaging = firebase.messaging();*/
