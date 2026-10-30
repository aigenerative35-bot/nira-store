/* Nira — minimal offline cache */
const CACHE = 'nira-v1'
const ASSETS = ['/nira-store/', '/nira-store/index.html', '/nira-store/assets/app.js', '/nira-store/assets/app.css']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET') return
  if (request.destination === 'image' || request.destination === 'video') {
    e.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      const copy = res.clone()
      caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {})
      return res
    }).catch(() => hit)))
    return
  }
  e.respondWith(fetch(request).then((res) => {
    const copy = res.clone()
    caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {})
    return res
  }).catch(() => caches.match(request).then((hit) => hit || caches.match('/nira-store/index.html'))))
})
