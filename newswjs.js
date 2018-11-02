// Use specific name to prevent deleting cache from other apps, and use version in naming
const staticCacheName = 'mws-cache-v3';

self.addEventListener('install', event => {
    console.log('Service worker is installing...');
    // List of Files Of Homepage
    let urlsToCache = [
        '/',
        'index.html',
        'css/modistyle.css',
        'project1/index.html',
        'project1/assets/js/add2numbers.js',
        'project2/leafletjs/leaflet.css',
        'project2/leafletjs/leaflet.js',
        'project2/index.html',
        'project3/index.html',
        'project3/main.css',
        'project3/responsive.css',
        'project3/final.css',
        'project3/images/dog_small.jpg',
        'project3/images/city.png',
        'project3/images/weather.png',
        'project3/images/sunny.png',
        'project3/images/cloudy.png',
        'project4/index.html',
        'project4/js/app.js',
        'project4/js/datamap.json',
        'project4/images/coffeecrime.jpg',
        'project4/images/rhapsodycafe.jpg',
        'project4/images/klabbers.jpg',
        'project4/images/konkow.jpg',
        'project4/images/artwork.jpg',
        'project4/images/cafesarjana.jpg',
        'project4/images/cafemasakini.jpeg',
        'project4/images/meskam.jpg',
        'project4/images/bintang.jpg',
        'project4/css/mystyle.css',
        'project5/index.html',
        'project5/js/app.js',
        'project5/css/mystyle.css',
        'images/mypic.jpg',
        'images/33717396.jpg',
        'https://image.flaticon.com/icons/png/512/660/660699.png',
        'https://image.flaticon.com/icons/svg/190/190708.svg',
        'https://image.flaticon.com/icons/svg/265/265725.svg',
        'https://image.flaticon.com/icons/svg/1062/1062304.svg',
        'https://image.flaticon.com/icons/svg/122/122632.svg',
        'https://pwa-mws.firebaseio.com/getMap.json'
    ];

    event.waitUntil(
        // Open a specific cache
        caches.open(staticCacheName).then(cache => {
            cache.addAll(urlsToCache);
            return cache.addAll(urlsToCache);
        })
        
    );
});

self.addEventListener('activate', event => {
    console.log('A new service worker is activating...');

    // Deleting old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            // Here we have an array cacheNames
            // console.log(cacheNames);
            return Promise.all(
                cacheNames.filter(cacheName => {
                    // Taking only our Cache (for scalibility purpose) to avoid deleting cache from others
                    // Return true to keep the element of the array
                    return cacheName.startsWith('mws-') && cacheName != staticCacheName;
                }).map(cacheName => {
                    // return the promise (resolve,true) for each successful deletion back to Promise.all
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
                    caches.open(staticCacheName).then(cache => {
                        cache.put(event.request, respFromNetwork.clone());
                        console.log(event.request);
                        console.log('Request recevied from network and added to cache');
                    });
                    return respFromNetwork;
                }).catch(respErr => {
                    // Offline, generic fallback
                    console.log('Offline called');
                    console.log(respErr);
                    return caches.match('404.html');
                })
            }
        })
    );
});