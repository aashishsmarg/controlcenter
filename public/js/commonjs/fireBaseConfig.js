// import 'https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js'


import '../push_notification/firebase-app.js'
import '../push_notification/firebase-messaging.js'
// import 'https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js'
//import firebase from "firebase/compat/app";
//import "firebase/compat/messaging";

class FireBaseAppConfig {
  constructor() {
      if (!FireBaseAppConfig.instance) {
        this.messaging = null;
        FireBaseAppConfig.instance = this;
      }
      return FireBaseAppConfig.instance;
    }
    initFireBase() {
        const firebaseConfig = {
        apiKey: "AIzaSyD_dSnIOMaIHGPCef6GMOiU_z239ovc3O8",
        authDomain: "surveillance-aa0f5.firebaseapp.com",
        databaseURL: "https://surveillance-aa0f5.firebaseio.com",
        projectId: "surveillance-aa0f5",
        storageBucket: "surveillance-aa0f5.appspot.com",
        messagingSenderId: "269077746431",
        appId: "1:269077746431:web:c8205c61d9425bfbd332ca",
        measurementId: "G-ZNHDY3T875"
        };
        //console.log(firebase)
        firebase.initializeApp(firebaseConfig);
        // Initializing Cloud Messanging
        // var messaging2 = firebase.messaging();
        this.messaging= firebase.messaging();
        console.log(firebase.messaging())
        return this.messaging;
    }
    getFireBaseMessagingObj() {
        
        if (!this.messaging) {
            this.initFireBase();
        }
        return this.messaging;
    }
  }
  
  const singletonObj = new FireBaseAppConfig();
  singletonObj.initFireBase();
  Object.freeze(singletonObj);
  export default singletonObj;
