'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "b7c64a30ce27d24a6b9527072ccef393",
"version.json": "1252a6f69ebc585888b5d0d0f6b631ea",
"index.html": "5ce079c52c4dd1db52f28d07bf9766eb",
"/": "5ce079c52c4dd1db52f28d07bf9766eb",
"main.dart.js": "6b87c2079a037c43b18c8e53a8ad614b",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.mjs": "39b93e9ac325cd708a57c102996f089a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "787d38ac274784b3693468eded3a64b8",
"main.dart.wasm": "38518af7a4671d9794e9d6857203f1ca",
"assets/AssetManifest.json": "76253a2de59ea7ee05b193786c335aac",
"assets/NOTICES": "6dda3cd9fc04bc99ed16765c56ceb7dd",
"assets/FontManifest.json": "778b31fe0c2aa31f65cd059c9cef6ba1",
"assets/AssetManifest.bin.json": "8d2b0bd63add55e76dbf0011a2ede535",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "991aea1e6ebd2a1d41b93b3d519d65dc",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/assets/images/tiled/Wooden%2520House.png": "dd9452573747eca7654e8d851f6a6dae",
"assets/assets/images/tiled/Basic%2520Grass%2520Biom%2520things%25201.png": "aed9324ef39151b6813e2a4532362b92",
"assets/assets/images/tiled/Fences.png": "bb214423fa26359af83d09dea553bcfb",
"assets/assets/images/tiled/Grass.png": "0d797851a7171a2014aea20d78d0d4d1",
"assets/assets/images/tiled/Water.png": "78d1ad08e28c734e437b35e58f200560",
"assets/assets/images/tiled/Tilled%2520Dirt.png": "9bc1ed232698e9ff1e734f2579cd70c6",
"assets/assets/images/tiled/Button%2520Sprite.png": "b652b817e748a3587b7c5b652bf04d8e",
"assets/assets/images/tiled/map_tiled.json": "e7d312e5922a10eba308c16aac37ddb9",
"assets/assets/images/character/Free%2520Chicken%2520Sprites.png": "8039a45966594db1f50d8638d1c1eb26",
"assets/assets/images/character/Free%2520Cow%2520Sprites.png": "ea42bd84fca6006d2af8bc05f9f88f9e",
"assets/assets/images/character/NPC_02.png": "15d819f69ff36988444ec46a83124040",
"assets/assets/images/character/NPC_01.png": "a8b4b1323916470f443ca0d16a58e48c",
"assets/assets/images/character/Basic%2520Charakter%2520Actions.png": "99571da736d6cde640d0190a96edfdb7",
"assets/assets/images/character/Player.png": "743d85f3000ac4c4ecf490c7784cf4fc",
"assets/assets/images/png/board-profile.png": "c49125b6955011f7e33563bb66cdc5d0",
"assets/assets/images/png/board-info.png": "0feec6ae1370ed7c58df7934c455b72e",
"assets/assets/images/png/background.webp": "cae021f84cb091cf31abc58a414d403e",
"assets/assets/audio/backsound.mp3": "026c02855245972175c65fa1bd455d07",
"assets/assets/audio/sword-hit.mp3": "73cd53da3abd051ecc3d7a3ae628a607",
"assets/assets/audio/texting.mp3": "833223afdb6de917c5a77463a6e8ac2b",
"assets/assets/fonts/PixelifySans.ttf": "10b4d5a1291e82892d3419c9ab7d8088",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
