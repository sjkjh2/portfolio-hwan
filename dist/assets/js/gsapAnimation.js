import{g as E,S as A}from"./ScrollTrigger.js";function y(s,n){s.classList.add(n)}function c(s,n){s.classList.remove(n)}function P(){document.querySelectorAll(".-copy-text").forEach(n=>{n.addEventListener("click",function(){const e=n.getAttribute("data-element-id"),t=document.getElementById(e),r=t.value;t.select(),t.setSelectionRange(0,99999);try{const f=document.execCommand("copy")?`${r} 클립보드에 복사되었습니다!`:"복사에 실패했습니다";alert(f)}catch(l){alert("복사하는 동안 오류가 발생했습니다: "+l)}})})}function W(){window.addEventListener("load",()=>{setTimeout(()=>scrollTo(0,0),100)})}function z(){const s=document.querySelector(".scroll-up"),n=()=>{const e=document.documentElement.scrollHeight;window.scrollY+window.innerHeight>=e?y(s,"-show"):c(s,"-show")};n(),window.addEventListener("scroll",()=>{n()}),window.addEventListener("resize",()=>{n()}),s.addEventListener("click",e=>{setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"}),c(s,"-show")},100)})}function I(){const s=document.querySelector("body"),n=document.querySelector(".header"),e=document.querySelector(".header-logo"),t=document.querySelector(".header-menu"),r=document.querySelector(".header-scroll"),l=document.querySelector(".main"),f=document.querySelector(".visual");let u,d,m,L,w,p,H,o;function g(){p=document.querySelector(".header-menu__open");let _=window.innerWidth;function b(){m=window.innerWidth,L=window.innerHeight,u=document.body.offsetHeight,w=u-L,d=f.offsetHeight,H=p.offsetTop,o=e.offsetTop,n.offsetHeight,(_>1200&&m<=1200||_<=1200&&m>1200)&&(r.style.height="",r.style.width="",c(r,"-change"),c(p,"-change"),c(e,"-change"),c(n,"-change")),_=m}function v(){const h=window.scrollY,T=h/w;m>1200?(r.style.height=T*100+"%",h>=d/1.2?y(r,"-change"):c(r,"-change"),h>=d-H?y(p,"-change"):c(p,"-change"),h>=d-o?y(e,"-change"):c(e,"-change")):(r.style.width=T*100+"%",h>=1?y(n,"-change"):c(n,"-change"))}window.addEventListener("scroll",v),window.addEventListener("resize",b),b()}g();function q(){function _(a){a.setAttribute("aria-expanded",!0),y(s,"-has-popup"),y(t,"-opened"),y(l,"-has-popup"),c(t,"-closed")}function b(){let a;function i(S){a||(a=S),S-a>=500?(c(t,"-opened"),c(t,"-closed")):requestAnimationFrame(i)}requestAnimationFrame(i)}function v(){c(s,"-has-popup"),p&&p.setAttribute("aria-expanded",!1),y(t,"-closed"),b(),c(l,"-has-popup")}function h(a,i,S,x){setTimeout(()=>{a.style.opacity=i,a.style.visibility=S},x)}function T(){const a=t.querySelectorAll("button, a, [tabindex]"),i=a[0],S=a[a.length-1];t.addEventListener("keydown",function(x){(x.key==="Tab"||x.keyCode===9)&&(x.shiftKey?document.activeElement===i&&(S.focus(),x.preventDefault()):document.activeElement===S&&(i.focus(),x.preventDefault()))})}function k(a){const i=a.getAttribute("href");setTimeout(()=>{window.location.href=i},1100)}document.addEventListener("keydown",a=>{a.key==="Escape"&&t.classList.contains("-opened")&&(h(t,"0","hidden",1200),v())}),n.addEventListener("click",a=>{let i=a.target.closest(".header-menu__open, .header-menu__closed, .header-menu__link");i&&(i.classList.contains("header-menu__closed")&&(v(),h(t,"0","hidden",1200)),i.classList.contains("header-menu__open")&&(_(i),p=i,h(t,"1","visible",0),T()),i.classList.contains("header-menu__link")&&(console.log(i),a.preventDefault(),v(),k(i)))})}q()}function F(){const s=document.querySelector(".header-menu__list"),n=document.querySelectorAll(".header-menu__link"),e=document.querySelectorAll(".header-menu__pic");let t;const r=u=>{u.forEach((d,m)=>{d.dataset.index=m})},l=(u,d)=>{const m=u.target.closest(".header-menu__link");if(!m)return null;const L=m.dataset.index,w=document.querySelector(`.header-menu__pic[data-index="${L}"]`);return w?(d==="mouseover"&&t&&c(t,"-visible"),d==="mouseover"?y(w,"-visible"):d==="mouseout"&&c(t,"-visible"),w):null};(()=>{r(n),r(e),s.addEventListener("mouseover",u=>{t=l(u,"mouseover")}),s.addEventListener("mouseout",u=>{l(u,"mouseout")})})()}function O(){E.registerPlugin(A);const s=e=>{E.set(e,{autoAlpha:0})},n=e=>{const t=parseFloat(e.dataset.delay)||0;let r=0,l=0,f=1,u="power3.out";e.classList.contains("-topToBottom")&&(l=-50),e.classList.contains("visual__pos")?(f=2,l=0):l=100,E.fromTo(e,{autoAlpha:0,x:r,y:l},{autoAlpha:1,x:0,y:0,delay:t,duration:f,ease:u})};E.utils.toArray(".-scrollMotion").forEach(e=>{s(e),A.create({trigger:e,start:"top bottom",end:"bottom top",overwrite:"auto",toggleActions:"play none restart none",onEnter:()=>{n(e)}})})}function Y(){const s=document.querySelector(".visual"),n=document.querySelectorAll(".visual__parallax");let e={x:0,y:0},t=0,r={x:0,y:0},l={x:0,y:0},f=!1;n.forEach(o=>{E.set(o,{perspective:"230rem",xPercent:-50,yPercent:-50,z:0,rotateY:0})});const u=E.timeline({defaults:{duration:1.5,ease:"power3.out"},onComplete:()=>{H()}});Array.from(n).filter(o=>!o.classList.contains("visual__parallax--txt")).forEach((o,g)=>{u.from(o,{y:o.offsetHeight/2+ +o.dataset.distance,opacity:0,duration:3.5,overwrite:"auto"},g*.2)}),u.from(".visual__logo",{y:300,opacity:0,delay:1,duration:2,ease:"power3.out"},"2.5").from(".visual__tit",{y:-150,opacity:0,delay:.6,duration:2,ease:"power3.out"},"3").from(".-hide",{opacity:0,duration:1.5});function d(){n.forEach(o=>{const g=o.dataset.speedx||1,q=o.dataset.speedy||1,_=o.dataset.speedz||1,b=o.dataset.rotation||1,v=parseFloat(getComputedStyle(o).left),h=v<window.innerWidth/2?1:-1,T=(e.x-v)*h*.1;E.to(o,{x:-e.x*g,y:e.y*q,z:T*_,rotateY:t*b,overwrite:"auto",ease:"power3.out"})})}function m(o){f||(e.x=o.clientX-window.innerWidth/2,e.y=o.clientY-window.innerHeight/2,t=e.x/(window.innerWidth/2)*20,d())}function L(o){f=!0;const g=o.touches[0];r={x:g.clientX-window.innerWidth/2,y:g.clientY-window.innerHeight/2},e={...r},d()}function w(){f=!1,E.to(e,{x:"+="+l.x*20,y:"+="+l.y*20,duration:1.5,ease:"power2.out",onUpdate:d})}function p(){d()}function H(){s.addEventListener("mousemove",m),s.addEventListener("touchstart",L,{passive:!0}),s.addEventListener("touchend",w,{passive:!0})}window.addEventListener("resize",p),d()}export{z as a,Y as b,F as c,y as d,c as e,O as g,I as m,W as r,P as s};
