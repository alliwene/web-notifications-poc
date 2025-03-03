importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

let messaging = null;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    try {
      firebase.initializeApp(event.data.config);
      messaging = firebase.messaging.isSupported()
        ? firebase.messaging({
            serviceWorkerRegistration: self.registration
          })
        : null;

      if (messaging) {
        messaging.onBackgroundMessage((payload) => {
          const { notification } = payload;
          const options = {
            body: notification.body,
            data: {
              url: notification.click_action,
            },
          };

          self.registration.showNotification(notification.title, options);
        });
      }
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  }
});
