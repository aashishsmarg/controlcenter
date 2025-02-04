import { initializeApp } from './firebase/app';
import { getMessaging, getToken, onMessage } from './firebase/messaging';

// Your web app’s Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the messaging service
const messaging = getMessaging(app);

// Request permission and get the token
async function requestPermission() {
  try {
    const token = await getToken(messaging, { vapidKey: 'BLfzYwLqUu34N9tF394zJw_-MILsCcaVCnITjtiMHbdm_3ts0IfeLghnKRNgeKHN0Zl8nG5HXHArttGXakxKigc' });
    if (token) {
      console.log('FCM Token:', token);
      // Send this token to your server
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.error('Error getting permission or token:', error);
  }
}

requestPermission();

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});