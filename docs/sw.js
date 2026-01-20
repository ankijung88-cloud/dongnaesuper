const CACHE_NAME = 'dongnaesuper-v1';
const ASSETS = [
    './index.html',
    './store.html',
    './cart.html',
    './checkout.html',
    './orders.html',
    './css/style.css',
    './js/app.js',
    './js/data.js',
    './js/storage.js',
    './images/icon-192x192.png',
    './images/icon-512x512.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
