const CACHE_NAME = 'mws-v1';
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
        'https://image.flaticon.com/icons/svg/122/122632.svg'
];

console.log('Caching Files');

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('installing service-worker');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                let x = cache.addAll(urlsToCache);
                console.log('cache added');
                return x;
            }).catch(function(err){
            	console.log(err);
            })
    );
});

self.addEventListener('activate', function(event) {
	console.log('Install Service Worker baru ...');
  event.waitUntil(
    caches.keys(CACHE_NAME).then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-') && cacheName != CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                     // Cache hit - return response
//                     if (response) {
//                         return response;
//                     }
//                     return fetch(event.request);
//                      fetchFromNetworkAndCache(event);
//                 }
//             )
//     );
// });


// function fetchFromNetworkAndCache(e) {
//   if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

//   return fetch(e.request).then(res => {
//     // foreign requests may be res.type === 'opaque' and missing a url
//     if (!res.url) return res;
//     // regardless, we don't want to cache other origin's assets
//     if (new URL(res.url).origin !== location.origin) return res;

//     return caches.open(CACHE_NAME).then(cache => {
//       // TODO: figure out if the content is new and therefore the page needs a reload.
//       cache.put(e.request, res.clone());
//       return res;
//     });
//   }).catch(err => {
//   	console.error(e.request.url, err)

//   });
// }
