---
---

var cacheName = "chemcommittee-{{ site.time | date: '%s' }}";
var contentToCache = [
"assets/css/style.css?v={{ site.time | date: '%s' }}",
"assets/css/print.css?v={{ site.time | date: '%s' }}",
"assets/js/scale.fix.js?v={{ site.time | date: '%s' }}",
"assets/fonts/Noto-Sans-700/Noto-Sans-700.woff2",
"assets/fonts/Noto-Sans-regular/Noto-Sans-regular.woff2",
"assets/fonts/Noto-Sans-italic/Noto-Sans-italic.woff2",
"safari-pinned-tab.svg?v={{ site.time | date: '%s' }}",
"mstile-150x150.png?v={{ site.time | date: '%s' }}",
"manifest.json?v={{ site.time | date: '%s' }}",
"jquery-3.4.1.min.js",
"index.html?v={{ site.time | date: '%s' }}",
"français.html?v={{ site.time | date: '%s' }}",
"favicon.ico?v={{ site.time | date: '%s' }}",
"favicon-32x32.png?v={{ site.time | date: '%s' }}",
"favicon-16x16.png?v={{ site.time | date: '%s' }}",
"croplife-logo.png?v={{ site.time | date: '%s' }}",
"browserconfig.xml?v={{ site.time | date: '%s' }}",
"apple-touch-icon.png?v={{ site.time | date: '%s' }}",
"android-chrome-512x512.png?v={{ site.time | date: '%s' }}",
"android-chrome-192x192.png?v={{ site.time | date: '%s' }}"
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