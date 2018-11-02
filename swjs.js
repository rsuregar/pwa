self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Installing service worker...');
        // console.log('cache added');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('my-') && cacheName != CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    console.log("Service worker is listening to requests");
    console.log(event.request);
    event.respondWith(
        // Compare the request and all the available cache
        caches.match(event.request).then(respFromCache => {
            // If any matches, return it
            if (respFromCache) {
                // console.log(event.request);
                console.log('Request matches cache');
                return respFromCache;
            }
            else {
                // Otherwise, fetch from the network
                fetch(event.request).then(respFromNetwork => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, respFromNetwork.clone());
                        console.log(event.request);
                        console.log('Request recevied from network and added to cache');
                    });
                    return respFromNetwork;
                }).catch(respErr => {
                    // Offline, generic fallback
                    console.log('Offline called');
                    console.log(respErr);
                    return caches.match('/404.html');
                })
            }
        })
    );
});