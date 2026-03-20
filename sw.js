const CACHE = 'autocare-v4'
const ASSETS = [
  '/autocare/',
  '/autocare/index.html',
  '/autocare/manifest.json'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  // Ignora tudo que não for do próprio domínio e o SW do Firebase
  if (url.hostname !== self.location.hostname) return
  if (url.pathname.includes('firebase')) return
  if (e.request.method !== 'GET') return

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()))
        }
        return resp
      }).catch(() => caches.match('/autocare/index.html'))
    })
  )
})
