import{S as e,i as t,s as a,l as s,f as l,d as n,e as r,t as o,c,a as i,g as d,b as f,E as h,h as u,H as m,I as p,k as v,n as g,v as b,r as x,u as y,J as E,z as S,y as N,K as T,B as I,L as P,M as O,N as q,O as U,P as _,Q as k,R as w,T as B}from"../chunks/vendor-0d7a9b8a.js";function M(e,t,a){const s=e.slice();return s[13]=t[a],s}function L(e,t,a){const s=e.slice();return s[16]=t[a].from,s[17]=t[a].text,s[18]=t[a].to,s}function R(e){let t,a,s,m,p,b,x,y,E,S,N=e[16]+"",T=e[18]+"",I=e[17]+"";return{c(){t=r("p"),a=o(N),s=o(" → "),m=o(T),b=v(),x=r("p"),y=o(I),E=v(),this.h()},l(e){t=c(e,"P",{class:!0,m:!0});var l=i(t);a=d(l,N),s=d(l," → "),m=d(l,T),l.forEach(n),b=g(e),x=c(e,"P",{class:!0,bg:!0,text:!0,p:!0,border:!0});var r=i(x);y=d(r,I),E=g(r),r.forEach(n),this.h()},h(){f(t,"class",p=e[16]===e[2].name?"self-end":"self-start"),f(t,"m","t-2"),f(x,"class",S=e[16]===e[2].name?"self-end":"self-start"),f(x,"bg","blue-600"),f(x,"text","light-300"),f(x,"p","2"),f(x,"border","rounded")},m(e,n){l(e,t,n),h(t,a),h(t,s),h(t,m),l(e,b,n),l(e,x,n),h(x,y),h(x,E)},p(e,s){1&s&&N!==(N=e[16]+"")&&u(a,N),1&s&&T!==(T=e[18]+"")&&u(m,T),5&s&&p!==(p=e[16]===e[2].name?"self-end":"self-start")&&f(t,"class",p),1&s&&I!==(I=e[17]+"")&&u(y,I),5&s&&S!==(S=e[16]===e[2].name?"self-end":"self-start")&&f(x,"class",S)},d(e){e&&n(t),e&&n(b),e&&n(x)}}}function A(e){let t,a,s=e[17]+"";return{c(){t=r("p"),a=o(s),this.h()},l(e){t=c(e,"P",{bg:!0,m:!0,p:!0,border:!0});var l=i(t);a=d(l,s),l.forEach(n),this.h()},h(){f(t,"bg","orange-600"),f(t,"m","t-2"),f(t,"p","2"),f(t,"border","rounded")},m(e,s){l(e,t,s),h(t,a)},p(e,t){1&t&&s!==(s=e[17]+"")&&u(a,s)},d(e){e&&n(t)}}}function D(e){let t;function a(e,t){return"Server"===e[16]?A:R}let r=a(e),o=r(e);return{c(){o.c(),t=s()},l(e){o.l(e),t=s()},m(e,a){o.m(e,a),l(e,t,a)},p(e,s){r===(r=a(e))&&o?o.p(e,s):(o.d(1),o=r(e),o&&(o.c(),o.m(t.parentNode,t)))},d(e){o.d(e),e&&n(t)}}}function V(e){let t,a,s,v;return{c(){t=r("p"),a=o(e[5]),this.h()},l(s){t=c(s,"P",{p:!0,bg:!0,text:!0});var l=i(t);a=d(l,e[5]),l.forEach(n),this.h()},h(){f(t,"p","4"),f(t,"bg","red-600"),f(t,"text","light-300")},m(e,s){l(e,t,s),h(t,a),v=!0},p(e,t){(!v||32&t)&&u(a,e[5])},i(e){v||(m((()=>{s||(s=p(t,T,{},!0)),s.run(1)})),v=!0)},o(e){s||(s=p(t,T,{},!1)),s.run(0),v=!1},d(e){e&&n(t),e&&s&&s.end()}}}function $(e){let t,a,s,p,b,x,y,E,S,N,T,I,P,L,R,A,D,V,$=e[2].name+"",J=[],W=new Map,H=e[4];const j=e=>e[13].name;for(let l=0;l<H.length;l+=1){let t=M(e,H,l),a=j(t);W.set(a,J[l]=F(a,t))}return{c(){t=r("p"),a=o("Welcome, "),s=o($),p=v(),b=r("label"),x=o("Send to"),y=v(),E=r("select");for(let e=0;e<J.length;e+=1)J[e].c();S=v(),N=r("form"),T=r("div"),I=r("input"),P=v(),L=r("button"),R=o("Send Message"),this.h()},l(e){t=c(e,"P",{});var l=i(t);a=d(l,"Welcome, "),s=d(l,$),l.forEach(n),p=g(e),b=c(e,"LABEL",{for:!0,m:!0});var r=i(b);x=d(r,"Send to"),r.forEach(n),y=g(e),E=c(e,"SELECT",{id:!0,w:!0,class:!0});var o=i(E);for(let t=0;t<J.length;t+=1)J[t].l(o);o.forEach(n),S=g(e),N=c(e,"FORM",{m:!0});var f=i(N);T=c(f,"DIV",{display:!0});var h=i(T);I=c(h,"INPUT",{flex:!0,id:!0,type:!0,class:!0}),P=g(h),L=c(h,"BUTTON",{type:!0,class:!0});var u=i(L);R=d(u,"Send Message"),u.forEach(n),h.forEach(n),f.forEach(n),this.h()},h(){f(b,"for","to"),f(b,"m","r-1"),f(E,"id","to"),f(E,"w","min-12"),f(E,"class","svelte-1lavqcd"),void 0===e[3].to&&m((()=>e[9].call(E))),f(I,"flex","1"),f(I,"id","message"),f(I,"type","text"),f(I,"class","svelte-1lavqcd"),L.disabled=A=e[3].text.length<1,f(L,"type","submit"),f(L,"class","svelte-1lavqcd"),f(T,"display","flex"),f(N,"m","t-4")},m(n,r){l(n,t,r),h(t,a),h(t,s),l(n,p,r),l(n,b,r),h(b,x),l(n,y,r),l(n,E,r);for(let e=0;e<J.length;e+=1)J[e].m(E,null);O(E,e[3].to),l(n,S,r),l(n,N,r),h(N,T),h(T,I),q(I,e[3].text),h(T,P),h(T,L),h(L,R),D||(V=[U(E,"change",e[9]),U(I,"input",e[10]),U(N,"submit",_(e[6]))],D=!0)},p(e,t){4&t&&$!==($=e[2].name+"")&&u(s,$),20&t&&(H=e[4],J=k(J,t,j,1,e,H,W,E,B,F,null,M)),24&t&&O(E,e[3].to),24&t&&I.value!==e[3].text&&q(I,e[3].text),24&t&&A!==(A=e[3].text.length<1)&&(L.disabled=A)},d(e){e&&n(t),e&&n(p),e&&n(b),e&&n(y),e&&n(E);for(let t=0;t<J.length;t+=1)J[t].d();e&&n(S),e&&n(N),D=!1,w(V)}}}function J(e){let t,a,s,u,m,p,b,x,y,E,S,N,T,I;return{c(){t=r("form"),a=r("label"),s=o("Username"),u=v(),m=r("div"),p=r("input"),b=v(),x=r("button"),y=o("Request Username"),S=v(),N=r("br"),this.h()},l(e){t=c(e,"FORM",{});var l=i(t);a=c(l,"LABEL",{for:!0});var r=i(a);s=d(r,"Username"),r.forEach(n),u=g(l),m=c(l,"DIV",{m:!0,display:!0});var o=i(m);p=c(o,"INPUT",{flex:!0,id:!0,type:!0,class:!0}),b=g(o),x=c(o,"BUTTON",{type:!0,class:!0});var f=i(x);y=d(f,"Request Username"),f.forEach(n),o.forEach(n),l.forEach(n),S=g(e),N=c(e,"BR",{}),this.h()},h(){var t;f(a,"for","username"),f(p,"flex","1"),f(p,"id","username"),f(p,"type","text"),f(p,"class","svelte-1lavqcd"),x.disabled=E=(null==(t=e[1])?void 0:t.length)<1,f(x,"type","submit"),f(x,"class","svelte-1lavqcd"),f(m,"m","t-2"),f(m,"display","flex")},m(n,r){l(n,t,r),h(t,a),h(a,s),h(t,u),h(t,m),h(m,p),q(p,e[1]),h(m,b),h(m,x),h(x,y),l(n,S,r),l(n,N,r),T||(I=[U(p,"input",e[8]),U(t,"submit",_(e[7]))],T=!0)},p(e,t){var a;2&t&&p.value!==e[1]&&q(p,e[1]),2&t&&E!==(E=(null==(a=e[1])?void 0:a.length)<1)&&(x.disabled=E)},d(e){e&&n(t),e&&n(S),e&&n(N),T=!1,w(I)}}}function W(e){let t,a,s,m=e[13].name+"";return{c(){t=r("option"),a=o(m),this.h()},l(e){t=c(e,"OPTION",{class:!0});var s=i(t);a=d(s,m),s.forEach(n),this.h()},h(){t.__value=s=e[13].name,t.value=t.__value,f(t,"class","svelte-1lavqcd")},m(e,s){l(e,t,s),h(t,a)},p(e,l){16&l&&m!==(m=e[13].name+"")&&u(a,m),16&l&&s!==(s=e[13].name)&&(t.__value=s,t.value=t.__value)},d(e){e&&n(t)}}}function F(e,t){let a,r,o="Server"!=t[13].name&&t[13].name!=t[2].name&&W(t);return{key:e,first:null,c(){a=s(),o&&o.c(),r=s(),this.h()},l(e){a=s(),o&&o.l(e),r=s(),this.h()},h(){this.first=a},m(e,t){l(e,a,t),o&&o.m(e,t),l(e,r,t)},p(e,a){"Server"!=(t=e)[13].name&&t[13].name!=t[2].name?o?o.p(t,a):(o=W(t),o.c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},d(e){e&&n(a),o&&o.d(e),e&&n(r)}}}function H(e){let t,a,s,m,p,S,N,T,P,O,q,U,_,k=e[4].length-2+"",w=e[0],B=[];for(let l=0;l<w.length;l+=1)B[l]=D(L(e,w,l));let M=e[5]&&V(e);function R(e,t){return e[2].name?$:J}let A=R(e),W=A(e);return{c(){t=r("div"),a=r("p"),s=o("Number of users: "),m=o(k),p=v(),S=r("div"),N=r("p"),T=o("Start of conversation"),P=v();for(let e=0;e<B.length;e+=1)B[e].c();O=v(),M&&M.c(),q=v(),U=r("div"),W.c(),this.h()},l(e){t=c(e,"DIV",{bg:!0,p:!0});var l=i(t);a=c(l,"P",{text:!0});var r=i(a);s=d(r,"Number of users: "),m=d(r,k),r.forEach(n),l.forEach(n),p=g(e),S=c(e,"DIV",{id:!0,display:!0,flex:!0,p:!0,overflow:!0,class:!0});var o=i(S);N=c(o,"P",{font:!0});var f=i(N);T=d(f,"Start of conversation"),f.forEach(n),P=g(o);for(let t=0;t<B.length;t+=1)B[t].l(o);o.forEach(n),O=g(e),M&&M.l(e),q=g(e),U=c(e,"DIV",{bg:!0,p:!0});var h=i(U);W.l(h),h.forEach(n),this.h()},h(){f(a,"text","light-300"),f(t,"bg","dark-300"),f(t,"p","4"),f(N,"font","italic"),f(S,"id","messages"),f(S,"display","flex"),f(S,"flex","1 col"),f(S,"p","y-4 l-4"),f(S,"overflow","y-scroll"),f(S,"class","svelte-1lavqcd"),f(U,"bg","dark-300"),f(U,"p","4")},m(e,n){l(e,t,n),h(t,a),h(a,s),h(a,m),l(e,p,n),l(e,S,n),h(S,N),h(N,T),h(S,P);for(let t=0;t<B.length;t+=1)B[t].m(S,null);l(e,O,n),M&&M.m(e,n),l(e,q,n),l(e,U,n),W.m(U,null),_=!0},p(e,[t]){if((!_||16&t)&&k!==(k=e[4].length-2+"")&&u(m,k),5&t){let a;for(w=e[0],a=0;a<w.length;a+=1){const s=L(e,w,a);B[a]?B[a].p(s,t):(B[a]=D(s),B[a].c(),B[a].m(S,null))}for(;a<B.length;a+=1)B[a].d(1);B.length=w.length}e[5]?M?(M.p(e,t),32&t&&b(M,1)):(M=V(e),M.c(),b(M,1),M.m(q.parentNode,q)):M&&(I(),x(M,1,1,(()=>{M=null})),y()),A===(A=R(e))&&W?W.p(e,t):(W.d(1),W=A(e),W&&(W.c(),W.m(U,null)))},i(e){_||(b(M),_=!0)},o(e){x(M),_=!1},d(e){e&&n(t),e&&n(p),e&&n(S),E(B,e),e&&n(O),M&&M.d(e),e&&n(q),e&&n(U),W.d()}}}function j(e,t,a){let s=`Guest #${(9999*Math.random()).toFixed(0)}`;const l={name:""},n={from:"",text:"Hello, World!",to:"All"};let r,o=[{name:"All"},{name:"Server"}],c="",i=[];return S((()=>{r=new WebSocket("ws://localhost:8080"),r.onmessage=function(e){const t=JSON.parse(e.data);if("message"===t.type){const e=t.data;a(0,i=[...i,e])}else if("update"===t.type){const e=t.data;t.success?(a(2,l.name=e.name,l),a(3,n.from=e.name,n)):(a(5,c="That username is taken!"),setTimeout((()=>a(5,c="")),2500))}else"list"===t.type&&(a(4,o=t.data),a(3,n.to=-1!=o.findIndex((e=>e.name===n.to))?n.to:"All",n))}})),e.$$.update=()=>{1&e.$$.dirty&&i&&N((()=>{const e=document.getElementById("messages");e.scrollTop=e.scrollHeight}))},[i,s,l,n,o,c,function(){const e={type:"message",data:n};r.send(JSON.stringify(e)),a(3,n.text="",n)},function(){const e={type:"update",data:{name:s}};r.send(JSON.stringify(e))},function(){s=this.value,a(1,s)},function(){n.to=P(this),a(3,n),a(4,o)},function(){n.text=this.value,a(3,n),a(4,o)}]}export default class extends e{constructor(e){super(),t(this,e,j,H,a,{})}}
