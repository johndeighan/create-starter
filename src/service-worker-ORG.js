// service-worker-ORG.coffee
var ASSETS, CACHE;

import {
  build,
  files,
  version
} from '$service-worker';

CACHE = `cache-${version}`;

ASSETS = [
  ...build, // the app itself
  ...files // everything else in static dir
];

// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  var addFilesToCache;
  console.log("event install");
  // --- create a new cache and add all files to it
  addFilesToCache = async() => {
    var cache;
    cache = (await caches.open(CACHE));
    return (await cache.addAll(ASSETS));
  };
  return event.waitUntil(addFilesToCache());
});

// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  var deleteOldCaches;
  console.log("event activate");
  // --- remove previous cached data from disk
  deleteOldCaches = async() => {
    var key, results;
    results = [];
    for (key in (await caches.keys())) {
      if (key !== CACHE) {
        results.push((await caches.delete(key)));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  return event.waitUntil(deleteOldCaches());
});

// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  var respond;
  console.log("event fetch");
  // --- ignore non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  respond = async() => {
    var cache, err, resp, url;
    url = new URL(event.request.url);
    cache = (await caches.open(CACHE));
    if (ASSETS.includes(url.pathname)) {
      return cache.match(event.request);
    }
    try {
      resp = (await fetch(event.request));
      if (resp.status === 200) {
        cache.put(event.request, resp.clone());
      }
      return resp;
    } catch (error) {
      err = error;
      return cache.match(event.request);
    }
  };
  return event.respondWith(respond());
});
