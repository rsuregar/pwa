const CACHE_NAME = 'pwa-cache-v1';
let urlsToCache = [
        '/',
        'index.html',
        'css/modistyle.css',
        'images/mws.png',
        '/project1',
        '/project1/',
        'project1/index.html',
        'project1/assets/js/add2numbers.js',
        '/project2',
        '/project2/',
        'project2/leafletjs/leaflet.css',
        'project2/leafletjs/leaflet.js',
        'project2/index.html',
        '/project3',
        '/project3/',
        'project3/index.html',
        'project3/main.css',
        'project3/responsive.css',
        'project3/final.css',
        'project3/images/dog_small.jpg',
        'project3/images/city.png',
        'project3/images/weather.png',
        'project3/images/sunny.png',
        'project3/images/cloudy.png',
        '/project4',
        '/project4/',
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
        '/project5',
        '/project5/',
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
        'https://image.flaticon.com/icons/svg/148/148843.svg',
        'https://pwa-mws.firebaseio.com/getMap.json',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});









