importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyCmXqVtfJL8hE4xddMZ3jVU6yQTYMNCQc8",
  authDomain: "manutencar-app.firebaseapp.com",
  projectId: "manutencar-app",
  storageBucket: "manutencar-app.firebasestorage.app",
  messagingSenderId: "955642662931",
  appId: "1:955642662931:web:b1406d35f5bae6d8b8afe6"
})

const messaging = firebase.messaging()

// Recebe notificações com o app em background/fechado
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification
  self.registration.showNotification(title, {
    body,
    icon: '/autocare/icon-192.png',
    badge: '/autocare/icon-192.png',
    data: { url: 'https://aleesti1.github.io/autocare/' }
  })
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || 'https://aleesti1.github.io/autocare/')
  )
})
