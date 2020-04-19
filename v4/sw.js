try{self["workbox:core:5.1.2"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.2"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class a{constructor(e,t,a="GET"){this.handler=s(t),this.match=e,this.method=a}}class n extends a{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const i=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:a,route:n}=this.findMatchingRoute({url:s,request:e,event:t});let i,c=n&&n.handler;if(!c&&this.s&&(c=this.s),c){try{i=c.handle({url:s,request:e,event:t,params:a})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this.i&&(i=i.catch(a=>this.i.handle({url:s,request:e,event:t}))),i}}findMatchingRoute({url:e,request:t,event:s}){const a=this.t.get(t.method)||[];for(const n of a){let a;const i=n.match({url:e,request:t,event:s});if(i)return a=i,Array.isArray(i)&&0===i.length?a=void 0:i.constructor===Object&&0===Object.keys(i).length?a=void 0:"boolean"==typeof i&&(a=void 0),{route:n,params:a}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);function l(e,s,i){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new a(({url:e})=>e.href===t.href,s,i)}else if(e instanceof RegExp)c=new n(e,s,i);else if("function"==typeof e)c=new a(e,s,i);else{if(!(e instanceof a))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}return o().registerRoute(c),c}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||h(u.precache),d=e=>e||h(u.runtime);function w(e){e.then(()=>{})}const p=new Set;class v{constructor(e,t,{onupgradeneeded:s,onversionchange:a}={}){this.o=null,this.l=e,this.u=t,this.h=s,this.p=a||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const a=indexedDB.open(this.l,this.u);a.onerror=()=>t(a.error),a.onupgradeneeded=e=>{s?(a.transaction.abort(),a.result.close()):"function"==typeof this.h&&this.h(e)},a.onsuccess=()=>{const t=a.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:a="next",count:n,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),l=t?o.index(t):o,u=[],h=l.openCursor(s,a);h.onsuccess=()=>{const e=h.result;e?(u.push(i?e:e.value),n&&u.length>=n?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((a,n)=>{const i=this.o.transaction(e,t);i.onabort=()=>n(i.error),i.oncomplete=()=>a(),s(i,e=>a(e))})}async v(e,t,s,...a){return await this.transaction([t],s,(s,n)=>{const i=s.objectStore(t),c=i[e].apply(i,a);c.onsuccess=()=>n(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}v.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(v.prototype[s]=async function(t,...a){return await this.v(s,t,e,...a)});try{self["workbox:expiration:5.1.2"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.g=e,this.o=new v("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const a=indexedDB.deleteDatabase(e);a.onerror=()=>{s(a.error)},a.onblocked=()=>{s(new Error("Delete blocked"))},a.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.g,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,a)=>{const n=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let c=0;n.onsuccess=()=>{const s=n.result;if(s){const a=s.value;a.cacheName===this.g&&(e&&a.timestamp<e||t&&c>=t?i.push(s.value):c++),s.continue()}else a(i)}}),a=[];for(const e of s)await this.o.delete("cache-entries",e.id),a.push(e.url);return a}q(e){return this.g+"|"+y(e)}}class m{constructor(e,t={}){this.R=!1,this.j=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.g=e,this.N=new g(e)}async expireEntries(){if(this.R)return void(this.j=!0);this.R=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.N.expireEntries(e,this.U),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this.j&&(this.j=!1,w(this.expireEntries()))}async updateTimestamp(e){await this.N.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.N.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this.j=!1,await this.N.expireEntries(1/0)}}const q=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const a=q(s,"cacheKeyWillBeUsed");let n=e;for(const e of a)n=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:n}),"string"==typeof n&&(n=new Request(n));return n},j=async({cacheName:e,request:t,event:s,matchOptions:a,plugins:n=[]})=>{const i=await self.caches.open(e),c=await R({plugins:n,request:t,mode:"read"});let r=await i.match(c,a);for(const t of n)if("cachedResponseWillBeUsed"in t){const n=t.cachedResponseWillBeUsed;r=await n.call(t,{cacheName:e,event:s,matchOptions:a,cachedResponse:r,request:c})}return r},x=async({cacheName:e,request:s,response:a,event:n,plugins:c=[],matchOptions:r})=>{const o=await R({plugins:c,request:s,mode:"write"});if(!a)throw new t("cache-put-with-no-response",{url:i(o.url)});const l=await(async({request:e,response:t,event:s,plugins:a=[]})=>{let n=t,i=!1;for(const t of a)if("cacheWillUpdate"in t){i=!0;const a=t.cacheWillUpdate;if(n=await a.call(t,{request:e,response:n,event:s}),!n)break}return i||(n=n&&200===n.status?n:void 0),n||null})({event:n,plugins:c,response:a,request:o});if(!l)return;const u=await self.caches.open(e),h=q(c,"cacheDidUpdate"),f=h.length>0?await j({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,l)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:f,newResponse:l,request:o})},U=j,L=async({request:e,fetchOptions:s,event:a,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),a instanceof FetchEvent&&a.preloadResponse){const e=await a.preloadResponse;if(e)return e}const i=q(n,"fetchDidFail"),c=i.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const s=t.requestWillFetch,n=e.clone();e=await s.call(t,{request:n,event:a})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of n)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:a,request:r,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:a,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.2"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let E;async function K(e,t){const s=e.clone(),a={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},n=t?t(a):a,i=function(){if(void 0===E){const e=new Response("");if("body"in e)try{new Response(e.body),E=!0}catch(e){E=!1}E=!1}return E}()?s.body:await s.blob();return new Response(i,n)}try{self["workbox:precaching:5.1.2"]&&_()}catch(e){}function O(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class M{constructor(e){this.g=f(e),this._=new Map,this.K=new Map,this.O=new Map}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=O(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._.has(n)&&this._.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this.O.has(e)&&this.O.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this.O.set(e,a.integrity)}if(this._.set(n,e),this.K.set(n,i),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],a=[],n=await self.caches.open(this.g),i=await n.keys(),c=new Set(i.map(e=>e.url));for(const[e,t]of this._)c.has(t)?a.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:a})=>{const n=this.O.get(s),i=this.K.get(a);return this.M({cacheKey:s,cacheMode:i,event:e,integrity:n,plugins:t,url:a})});return await Promise.all(r),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:a}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this._.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}async M({cacheKey:e,url:s,cacheMode:a,event:n,plugins:i,integrity:c}){const r=new Request(s,{integrity:c,cache:a,credentials:"same-origin"});let o,l=await L({event:n,plugins:i,request:r});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:r,response:l}):l.status<400))throw new t("bad-precaching-response",{url:s,status:l.status});l.redirected&&(l=await K(l)),await x({event:n,plugins:i,response:l,request:e===s?r:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._}getCachedURLs(){return[...this._.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const a=this.createHandler(s),n=new Request(e);return()=>a({request:n})}}let T;const D=()=>(T||(T=new M),T);const S=(e,t)=>{const s=D().getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:a,urlManipulation:n}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(a){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(a);if(e)return e}};let P=!1;function A(e){P||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:a}={})=>{const n=f();self.addEventListener("fetch",i=>{const c=S(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:a});if(!c)return;let r=self.caches.open(n).then(e=>e.match(c)).then(e=>e||fetch(c));i.respondWith(r)})})(e),P=!0)}const C=[],I={get:()=>C,add(e){C.push(...e)}},k=e=>{const t=D(),s=I.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=D();e.waitUntil(t.activate())};var B,F;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),B={},function(e){D().addToCacheList(e),e.length>0&&(self.addEventListener("install",k),self.addEventListener("activate",W))}([{url:"/casl/v4/assets/a.0dea9028.json",revision:"d3ee4aa856a05727328ce982655d2e94"},{url:"/casl/v4/assets/a.0fb79a4b.json",revision:"b20e4d722bccee1de41520bd047ff152"},{url:"/casl/v4/assets/a.192ee03a.json",revision:"6add3816968bc67f6c3aa9481b793f34"},{url:"/casl/v4/assets/a.19f413ea.json",revision:"3b4e36fc00df8ccf19ac4789217de16b"},{url:"/casl/v4/assets/a.2555427d.json",revision:"f05a7dc1e85eb3900a1cfbda86765007"},{url:"/casl/v4/assets/a.26897b06.json",revision:"c1690a6bd10834e1c28560cea60f3744"},{url:"/casl/v4/assets/a.37d3dd8f.json",revision:"f7766de643cfee3c511efc1aedc83473"},{url:"/casl/v4/assets/a.392cf909.json",revision:"a71f9c1264c4a93a24bd69ceaf7c749b"},{url:"/casl/v4/assets/a.3a1055aa.json",revision:"9c788732271006a1cfc28c58165f228d"},{url:"/casl/v4/assets/a.3eac0367.json",revision:"db291e9819b554930d1dd9ed39ca0d21"},{url:"/casl/v4/assets/a.4649ce6a.json",revision:"22aac46033708aaad16f75bb468fa892"},{url:"/casl/v4/assets/a.475825be.json",revision:"8eec29cd4811f77e022c616ec39bed1a"},{url:"/casl/v4/assets/a.498b686d.json",revision:"2f119bb998defbcc797bc40441442142"},{url:"/casl/v4/assets/a.553eb86b.json",revision:"3222e1a37b219b849af20aa268339469"},{url:"/casl/v4/assets/a.5b820565.json",revision:"daa97e4f70e23f1b8c3db0947de5e098"},{url:"/casl/v4/assets/a.6895d449.json",revision:"59dcb40ffc035a08d6a549adcee05fd2"},{url:"/casl/v4/assets/a.79364224.json",revision:"334f89c6a7a9331bf612fa924853ecd0"},{url:"/casl/v4/assets/a.7ba660a3.json",revision:"0181ae8a086e3366b582178b2711c090"},{url:"/casl/v4/assets/a.86aea29b.json",revision:"2d15e619aa97fdb6c1590e423f8b78bb"},{url:"/casl/v4/assets/a.8c56cf79.json",revision:"05f1a617ef885400a6754a5118a9c1ed"},{url:"/casl/v4/assets/a.8e142ab0.json",revision:"bfedaf1e50ca95f9e99b98991b2b92be"},{url:"/casl/v4/assets/a.9a7a5d5a.json",revision:"853dfcc3d237afe9dd77d145493b7889"},{url:"/casl/v4/assets/a.a6a8b35f.json",revision:"12c88b82486a6231e8c2828c9a98ed1c"},{url:"/casl/v4/assets/a.ad1a03e5.json",revision:"17744804fd75c0d4a40627a84a56800d"},{url:"/casl/v4/assets/a.b0e49197.json",revision:"0885dc384121db51d8b710b178c8a17c"},{url:"/casl/v4/assets/a.c64e90da.json",revision:"003ce94ab31ce7f0d2145f152518fe44"},{url:"/casl/v4/assets/a.ce2c3571.json",revision:"4bb3caa87cc9bf3077c05a0f4f4a3a35"},{url:"/casl/v4/assets/a.d397cd54.json",revision:"9d8192b936cc8aa225313a429ff435ae"},{url:"/casl/v4/assets/a.dcafa4dc.json",revision:"76528d80e8e2a0040829a39621999637"},{url:"/casl/v4/assets/a.edf41136.json",revision:"beadb5f83f42a497091b66845c1752e7"},{url:"/casl/v4/assets/a.f4d6b565.json",revision:"715dee9bd64ba0b8b643b44ad4cb6f82"},{url:"/casl/v4/assets/a.fa592bbe.json",revision:"449fc684c553b4197c1fd914f7a2a8f8"},{url:"/casl/v4/assets/a.fcb91e16.json",revision:"42f51c1817fdf90adeeda8b30dad663d"},{url:"/casl/v4/assets/content_pages_searchIndexes.en.2e814498.json",revision:"260eec97ce55266c9a62440d62e119da"},{url:"/casl/v4/assets/content_pages_summaries.en.d7bff0bf.json",revision:"c595db0311936062554d70d1e973abc6"},{url:"/casl/v4/app-icons/android-chrome-192x192.png",revision:"0b18304dea12cc8d59c9528a00d37ee8"},{url:"/casl/v4/app-icons/android-chrome-256x256.png",revision:"8da8a7602d1cc4d21a70445eda7e8e62"},{url:"/casl/v4/app-icons/apple-touch-icon.png",revision:"e2be3ed5414bed313d9219504bd7224f"},{url:"/casl/v4/app-icons/favicon-16x16.png",revision:"c72946f88111cb426093e6bdb63fa70b"},{url:"/casl/v4/app-icons/favicon-32x32.png",revision:"e53028dac3ae19a1ebd8c2ed0a0772a8"},{url:"/casl/v4/app-icons/favicon.ico",revision:"bc4c3c662b5614ee2e63ac9bd79cafa4"},{url:"/casl/v4/app-icons/mstile-150x150.png",revision:"ffd33ced9004c319a6743d79a61d23c3"},{url:"/casl/v4/app-icons/safari-pinned-tab.svg",revision:"1171db203c6305482c696d3f702c83f6"},{url:"/casl/v4/fonts/StardosStencil-Bold.woff2",revision:"1c20088eb1050b0b81483791c320d03f"},{url:"/casl/v4/fonts/StardosStencil-Regular.woff2",revision:"54e90de15eb7c8d1d4ddb71ebc125937"},{url:"/casl/v4/manifest.json",revision:"9a2195c0c368b7ae215a188a95ff7f26"},{url:"/casl/v4/index.html",revision:"befade89cf81f953291f2eec6829bb34"},{url:"/casl/v4/bootstrap.9abe42a4.js",revision:"79fa30c359262fdc7afc7bcb65d7269f"}]),A(B),self.addEventListener("activate",e=>{const t=f();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),l(new class extends a{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(e=>this.T(e),e),this.D=t,this.S=s}T({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this.S)if(e.test(s))return!1;return!!this.D.some(e=>e.test(s))}}((F="/casl/v4/index.html",D().createHandlerBoundToURL(F)))),l(/\/casl\/v4\/images\//,new class{constructor(e={}){if(this.g=d(e.cacheName),this.P=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.P=t?e.plugins:[N,...e.plugins]}else this.P=[N];this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const a=this.I({request:s,event:e});let n,i=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(i){if(e)try{e.waitUntil(a)}catch(n){}}else try{i=await a}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async I({request:e,event:t}){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),a=x({cacheName:this.g,request:e,response:s.clone(),event:t,plugins:this.P});if(t)try{t.waitUntil(a)}catch(e){}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:a})=>{if(!a)return null;const n=this.k(a),i=this.W(s);w(i.expireEntries());const c=i.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return n?a:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.W(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.B=e,this.L=e.maxAgeSeconds,this.F=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}W(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.F.get(e);return s||(s=new m(e,this.B),this.F.set(e,s)),s}k(e){if(!this.L)return!0;const t=this.H(e);return null===t||t>=Date.now()-1e3*this.L}H(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.F)await self.caches.delete(e),await t.delete();this.F=new Map}}({maxEntries:100,purgeOnQuotaError:!0})]}),"GET"),l(/\/casl\/v4\/@webcomponents\//,new class{constructor(e={}){this.g=d(e.cacheName),this.P=e.plugins||[],this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let a,n=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(!n)try{n=await this.I(s,e)}catch(e){a=e}if(!n)throw new t("no-response",{url:s.url,error:a});return n}async I(e,t){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),a=s.clone(),n=x({cacheName:this.g,request:e,response:a,event:t,plugins:this.P});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"polyfills",plugins:[]}),"GET");
//# sourceMappingURL=sw.js.map
