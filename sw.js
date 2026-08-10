// Service worker minimal — nécessaire pour que Chrome/Android propose
// l'installation en mode standalone (écran d'accueil). Ne met rien en
// cache : chaque page continue de se charger normalement depuis le réseau.
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
