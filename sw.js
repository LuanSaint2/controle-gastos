const CACHE_NAME = 'gastos-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache aberto, adicionando assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.log('Erro ao adicionar ao cache (esperado em ambiente de dev):', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker ativando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  // Ignorar requisições que não são GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Para requisições de origem (mesmo site)
  if (event.request.url.indexOf(self.location.origin) === 0) {
    event.respondWith(
      caches.match(event.request).then(response => {
        // Retornar do cache se encontrado
        if (response) {
          // Atualizar cache em background
          fetch(event.request)
            .then(freshResponse => {
              if (!freshResponse || freshResponse.status !== 200) {
                return;
              }
              const responseToCache = freshResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            })
            .catch(() => {
              // Falha na requisição, manter cache
            });
          return response;
        }

        // Não encontrado em cache, fazer requisição
        return fetch(event.request).then(response => {
          // Não cachear respostas inválidas
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Cachear a resposta válida
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(err => {
          // Falha na requisição e não há cache, retornar página offline
          console.log('Requisição falhou:', err);
          return caches.match('/index.html');
        });
      })
    );
  }
});

// Sincronizar dados quando voltar online
self.addEventListener('sync', event => {
  if (event.tag === 'sync-gastos') {
    event.waitUntil(syncGastos());
  }
});

async function syncGastos() {
  try {
    // Aqui você pode implementar lógica para sincronizar com um servidor
    console.log('Sincronizando gastos...');
  } catch (error) {
    console.log('Erro ao sincronizar:', error);
    throw error;
  }
}