const CACHE_NAME = 'Romarrr';
const DYNAMIC_CACHE = 'Romarr';
const API_CACHE = 'Romar';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
];

const handleTMDBResponse = async (request, response) => {
  const cache = await caches.open(API_CACHE);
  await cache.put(request, response.clone());
  return response;
};

const handleImageResponse = async (request, response) => {
  const cache = await caches.open(DYNAMIC_CACHE);
  await cache.put(request, response.clone());
  return response;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === 'https://api.themoviedb.org') {
    event.respondWith(
      fetch(request)
        .then(response => handleTMDBResponse(request, response))
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          return new Response(
            JSON.stringify({
              results: [],
              offline: true,
              message: 'Currently offline. Showing cached results.'
            }),
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  if (url.origin === 'https://image.tmdb.org') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request)
            .then(response => handleImageResponse(request, response))
            .catch(() => caches.match('/logo.png'));
        })
    );
    return;
  }

  if (url.origin.includes('youtube.com') || url.origin.includes('youtu.be')) {
    event.respondWith(
      fetch(request).catch(() => 
        new Response(
          JSON.stringify({ 
            offline: true, 
            message: 'Videos are not available offline' 
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            return new Response(
              JSON.stringify({ 
                offline: true, 
                message: 'App is offline' 
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (![CACHE_NAME, DYNAMIC_CACHE, API_CACHE].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});