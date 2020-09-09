var CACHE_NAME = "myCache-v1";
var urlsToCache = [
  "/",
  "/js/main.js",
  "/index.html",
  "/img/logo_round_192.png",
  "/img/logo_round_512.png",
];
self.addEventListener("install", function (event) {
  //Perform Install Steps
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      //Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (CACHE_NAME !== cacheName && cacheName.startsWith("myCache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
