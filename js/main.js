// Service Worker Cache
navigator.serviceWorker.register("/sw.js").then((reg) => {
  reg.installing;
});
