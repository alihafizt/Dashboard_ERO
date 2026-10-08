// Service worker Dashboard ERO — naikkan CACHE_VERSION setiap kali file diubah
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'dashboard-ero-' + CACHE_VERSION;
const CORE_FILES = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('dashboard-ero-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first untuk file situs sendiri (selalu ambil terbaru, cache jadi cadangan offline).
// Permintaan ke Supabase dan CDN tidak disentuh.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
