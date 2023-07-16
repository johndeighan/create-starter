# service-worker-ORG.coffee

import {build, files, version} from '$service-worker'

CACHE = "cache-#{version}"
ASSETS =  [
	build...,   # the app itself
	files...,   # everything else in static dir
	]

# ---------------------------------------------------------------------------

self.addEventListener 'install', (event) =>

	console.log "event install"

	# --- create a new cache and add all files to it
	addFilesToCache = () =>
		cache = await caches.open(CACHE)
		await cache.addAll(ASSETS)

	event.waitUntil addFilesToCache()

# ---------------------------------------------------------------------------

self.addEventListener 'activate', (event) =>

	console.log "event activate"

	# --- remove previous cached data from disk
	deleteOldCaches = () =>
		for key of await caches.keys()
			if (key != CACHE)
				await caches.delete(key)

	event.waitUntil deleteOldCaches()

# ---------------------------------------------------------------------------

self.addEventListener 'fetch', (event) =>

	console.log "event fetch"

	# --- ignore non-GET requests
	if (event.request.method != 'GET')
		return

	respond = () =>
		url = new URL(event.request.url)
		cache = await caches.open(CACHE)

		if (ASSETS.includes(url.pathname))
			return cache.match(event.request)

		try
			resp = await fetch(event.request)
			if (resp.status == 200)
				cache.put(event.request, resp.clone())
			return resp
		catch err
			return cache.match(event.request)

	event.respondWith(respond())
