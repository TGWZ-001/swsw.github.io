const C='planner-v1',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// network first (updates arrive), cache as offline fallback
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
 e.respondWith(fetch(r).then(res=>{if(res.ok&&new URL(r.url).origin==location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))))});
function kv(mode,k,v){return new Promise((res,rej)=>{const o=indexedDB.open('planner_sw',1);o.onupgradeneeded=()=>o.result.createObjectStore('k');
 o.onsuccess=()=>{const s=o.result.transaction('k',mode=='r'?'readonly':'readwrite').objectStore('k'),q=mode=='r'?s.get(k):s.put(v,k);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)};o.onerror=()=>rej(o.error)})}
async function check(){if(Notification.permission!='granted')return;
 const day=new Date().toDateString(),items=(await kv('r','items'))||[];if((await kv('r','last'))==day)return;
 const mid=new Date(new Date().toDateString()),s=items.map(i=>({t:i.t,n:Math.round((new Date(i.d+'T00:00:00')-mid)/864e5)})).filter(x=>x.n<=3&&x.n>=-3).sort((a,b)=>a.n-b.n);
 if(!s.length)return;
 await self.registration.showNotification(s.length+' deadline(s) within 3 days',{body:s.slice(0,3).map(x=>x.t+' – '+(x.n<0?'overdue by '+(-x.n)+' day(s)':x.n==0?'due today':x.n+' day(s) left')).join('\n'),icon:'icon-192.png',badge:'icon-192.png',tag:'deadlines'});
 await kv('w','last',day)}
self.addEventListener('periodicsync',e=>{if(e.tag=='deadlines')e.waitUntil(check())});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow('./?tab=hw')))});
