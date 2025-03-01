importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    firebase.initializeApp(event.data.config);
  }
});

const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

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
