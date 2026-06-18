const CACHE_NAME = 'dompet-saya-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
];

self.addEventListener('install', event => {
  // Use a tolerant install step: try to fetch each asset and cache it if available.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(ASSETS_TO_CACHE.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (res && res.ok) {
          await cache.put(url, res.clone());
        } else {
          console.warn('SW: asset not cached (fetch failed):', url, res && res.status);
        }
      } catch (err) {
        console.warn('SW: error fetching asset', url, err);
      }
    }));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  // Try cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
