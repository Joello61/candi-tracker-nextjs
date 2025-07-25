// public/sw.js
const CACHE_NAME = 'candi-tracker-v1';
const CACHE_ASSETS = [
  '/',
  '/favicon.ico',
  '/logo.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(CACHE_ASSETS);
      })
      .catch(err => {
        console.log('Service Worker: Cache failed', err);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  // Nettoyer les anciens caches
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
  );
});

// Stratégie de cache pour les requêtes
self.addEventListener('fetch', (event) => {
  // Ne pas intercepter les requêtes vers l'API
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  // Ne pas intercepter les requêtes externes (Google Fonts, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Vérifier si la réponse est valide
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Cloner la réponse pour le cache
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // En cas d'échec, essayer de servir depuis le cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // Page offline de fallback pour les pages HTML
            if (event.request.headers.get('accept').includes('text/html')) {
              return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Candi Tracker - Hors ligne</title>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    body {
                      font-family: system-ui, sans-serif;
                      text-align: center;
                      padding: 50px;
                      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                      min-height: 100vh;
                      margin: 0;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    .container {
                      max-width: 400px;
                      background: white;
                      padding: 40px;
                      border-radius: 12px;
                      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    }
                    h1 {
                      color: #1f2937;
                      margin-bottom: 16px;
                    }
                    p {
                      color: #6b7280;
                      line-height: 1.6;
                      margin-bottom: 24px;
                    }
                    button {
                      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                      color: white;
                      border: none;
                      padding: 12px 24px;
                      border-radius: 8px;
                      cursor: pointer;
                      font-size: 16px;
                    }
                    button:hover {
                      transform: translateY(-1px);
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>🎯 Candi Tracker</h1>
                    <p>Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion internet.</p>
                    <button onclick="window.location.reload()">Réessayer</button>
                  </div>
                </body>
                </html>
              `, {
                headers: { 'Content-Type': 'text/html' }
              });
            }
          });
      })
  );
});

// Messages depuis l'application principale
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});