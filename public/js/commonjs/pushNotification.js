import singletonObj from './fireBaseConfig.js';
const messaging_obj = singletonObj.getFireBaseMessagingObj();

// console.log("messaging_obj in push notification")
// console.log(messaging_obj)

messaging_obj.onMessage(function (payload) {
    console.log('Message receiveddddd. ', payload);
    const title=payload.data.title
    const body=payload.data.message
    const icon=payload.data.icon
    const link = 'https://smargtechnologies.in:3004';  // The link you want to open on click
    if (Notification.permission === 'granted') {
        // new Notification(title, {
        //     body: body,
        //     icon: icon,
        //     data: { 
        //         link:link  // Pass the click action link here
        //       }
        // });
        navigator.serviceWorker.getRegistration().then(function(registration) {
            if (registration) {
                registration.showNotification(title, {
                    body: body,
                    icon: icon,
                    data: { 
                        link: link  // Pass the click action link here
                    }
                });
            }else{console.error("Service Worker registration failed: ", error);}
        }).catch(function(error) {
            console.error("Service Worker registration failed: ", error);});
    }
});

self.addEventListener('notificationclick', function(event) {
    // event.notification.close(); // Close the notification immediately
    console.log("redirect")
    // Handle the click action (URL redirection)
    const notificationUrl = event.notification.data.url || '/default-url'; // Replace with your default URL logic
  
    // Open the URL in the appropriate browser tab (navigate to the desired page)
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // If there's an open window for the app, focus it
            const openClient = clientList.find(client => client.url === notificationUrl && 'focus' in client);
            if (openClient) {
                return openClient.focus();
            } else {
                // Otherwise, open a new window or tab with the link
                return clients.openWindow(notificationUrl);
            }
        })
    );
  });