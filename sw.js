// Offline support. Bump VERSION whenever you change files so phones pick up the update.
var VERSION = "degree-checklist-v18";
var CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon.png"];
var EXTERNAL = ["fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var same = url.origin === self.location.origin;
  if (!same && EXTERNAL.indexOf(url.hostname) < 0) return;
  if (same && (req.mode === "navigate" || url.pathname.slice(-1) === "/" || /index\.html$/.test(url.pathname))) {
    // pages: newest copy when online, saved copy when offline
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put("index.html", copy); }); return res;
    }).catch(function () { return caches.match("index.html"); }));
    return;
  }
  // everything else: saved copy first, refreshed in the background
  e.respondWith(caches.open(VERSION).then(function (c) {
    return c.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
