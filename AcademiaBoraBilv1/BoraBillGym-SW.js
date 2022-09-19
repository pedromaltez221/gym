//Classe Reaproveitada das videos aulas do professor Kutova
// Define o nome do cache atual, considerando a sua versão.

var cacheName = 'boraBillGymv1.0';

// Armazena todos os arquivos no cache atual
self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/sobre.html',
      '/manifest.webmanifest',
      '/style.css',
      '/consultar.html',
      '/buscar.js',
      '/script.js',
      '/homePage.html',
      '/lar.svg',
      '/loupe.svg',
      '/assets/favicon/android-icon-36x36.png',
      '/assets/favicon/android-icon-48x48.png',
      '/assets/favicon/android-icon-72x72.png',
      '/assets/favicon/android-icon-96x96.png',
      '/assets/favicon/android-icon-144x144.png',
      '/assets/favicon/android-icon-192x192.png'
    ]);
  });
});


// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});


// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});