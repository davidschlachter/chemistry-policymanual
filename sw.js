---
---

var cacheName = "chemcommittee-{{ site.time | date: '%s' }}";
var contentToCache = [
"assets/css/style.css",
"assets/css/print.css",
"assets/js/scale.fix.js",
"assets/fonts/Noto-Sans-700/Noto-Sans-700.woff2",
"assets/fonts/Noto-Sans-regular/Noto-Sans-regular.woff2",
"assets/fonts/Noto-Sans-italic/Noto-Sans-italic.woff2",
"safari-pinned-tab.svg",
"mstile-150x150.png",
"manifest.json",
"jquery-3.4.1.min.js",
"index.html",
"français.html",
"favicon.ico",
"favicon-32x32.png",
"favicon-16x16.png",
"croplife-logo.png",
"browserconfig.xml",
"apple-touch-icon.png",
"android-chrome-512x512.png",
"android-chrome-192x192.png"
];


// On load, save files to cache
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// If possible, fetch files from the cache if the network is not available
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Clean cache automatically
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
        if(cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// On message, take over with new service worker
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
})