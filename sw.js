/* Offline support. The page itself is fetched network-first (so updates show up straight away)
   with a quick fallback to the cached copy when offline; icons and the manifest are cache-first. */
const CACHE = 'world-manager-v21';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function remember(req, res) {
  if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
  return res;
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname);
  if (isPage) {
    const net = fetch(req).then(res => remember(req, res));
    e.waitUntil(net.then(() => {}, () => {}));
    const timeout = new Promise(res => setTimeout(res, 2500));
    e.respondWith(Promise.race([net, timeout.then(() => caches.match(req, { ignoreSearch: true }))])
      .then(res => res || net)
      .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => remember(req, res))));
});
