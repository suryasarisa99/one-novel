if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>i(e,n),o={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2bba59257177f01de4fb4d12a62e0cb0"},{url:"/_next/static/AjNCCmtODSxJo0zC3DMQj/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/AjNCCmtODSxJo0zC3DMQj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/126-44d6970558e5390d.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/23-51e41037d2f59f6f.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/589-b3872309dd425e26.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/59650de3-79324345f7f5596d.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/648-c980cf68524f18f1.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/853-163a74bce7999076.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/8e1d74a4-3f0ee05c6058da10.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/9c4e2130-ef6aa61e91b84045.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/(auth)/Verification/page-11a731409d093c20.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/(auth)/login/page-081ebfde97fb85fd.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/(auth)/register/page-45a684ef26c4d3f7.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/(home)/page-3984fa5c5200d2b0.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/_not-found/page-36ddf3375816c401.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/layout-ed793266ff1ee9b2.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/app/profile/page-29b1073c1e60c148.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/fd9d1056-5624caf08e872e61.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/main-122a08dd185ba981.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/main-app-ca219cdd523c32dc.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-bd4c4e15df8592d2.js",revision:"AjNCCmtODSxJo0zC3DMQj"},{url:"/_next/static/css/8e50754b46cc6921.css",revision:"8e50754b46cc6921"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/bank.510b315c.png",revision:"6e0c063d0995ecaff78805b6c046b93c"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/img1.423d93c1.jpg",revision:"a7499b0f4131563a034119b32a871b90"},{url:"/_next/static/media/img2.ecf02095.png",revision:"b3f1738281d1c0251f2367fb8b587a36"},{url:"/_next/static/media/img3a.50d12b44.jpg",revision:"d0e5dab50ec22205ec9513b4f5c00aa4"},{url:"/_next/static/media/img3b.fd9da89b.jpg",revision:"a6d0037f64c20bbd02b8e62681bfd0f9"},{url:"/_next/static/media/img4.a494e668.jpg",revision:"e250ad0ddd2ae6912fcc2f656425c37f"},{url:"/_next/static/media/logo.d6888c91.png",revision:"32b7ddc37994598fb0cf7c6d5f3b6eb3"},{url:"/_next/static/media/register2.bcccc3d7.png",revision:"a5ded6b588a140bae5e7378a362e4998"},{url:"/bank.png",revision:"6e0c063d0995ecaff78805b6c046b93c"},{url:"/home/img1.jpg",revision:"a7499b0f4131563a034119b32a871b90"},{url:"/home/img2.png",revision:"b3f1738281d1c0251f2367fb8b587a36"},{url:"/home/img3a.jpg",revision:"d0e5dab50ec22205ec9513b4f5c00aa4"},{url:"/home/img3b.jpg",revision:"a6d0037f64c20bbd02b8e62681bfd0f9"},{url:"/home/img3c.jpg",revision:"0603ca9f638a90e36543298ec7031427"},{url:"/home/img4.jpg",revision:"e250ad0ddd2ae6912fcc2f656425c37f"},{url:"/logo.png",revision:"32b7ddc37994598fb0cf7c6d5f3b6eb3"},{url:"/manifest.json",revision:"3520eee2894c5afce4a2b6330146bd97"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/register.jpg",revision:"c746230cfb4c0589f07344759f7a6811"},{url:"/register.png",revision:"939e2f3355ee895139c5489ee5bd0c45"},{url:"/register2.png",revision:"a5ded6b588a140bae5e7378a362e4998"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
