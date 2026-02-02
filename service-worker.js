const CACHE_NAME = 'barber-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
  // ถ้ามึงมีไฟล์รูป icon หรือไฟล์ CSS/JS แยก ให้เอาชื่อมาใส่ในนี้ด้วย
];

// ติดตั้งและเก็บไฟล์ลง Cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// เรียกใช้ไฟล์จาก Cache เมื่อไม่มีเน็ต
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
