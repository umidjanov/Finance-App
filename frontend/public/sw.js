const CACHE_NAME = "finance-app-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((name) => caches.delete(name))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("localhost")
  ) {
    return;
  }
  event.respondWith(fetch(event.request));
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Finance App", {
      body: data.body || "Yangi xabar!",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [100, 50, 100],
    }),
  );
});
