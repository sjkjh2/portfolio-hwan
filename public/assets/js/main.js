import"./modulepreload-polyfill.js";import{s as c,r,a as n,m as g,g as _,b as p,c as d,d as m,e as k}from"./gsapAnimation.js";import"./ScrollTrigger.js";const l={forward:[{logo:"/assets/images/stack_logo_bash.png",alt:"Bash",flag:"Bash"},{logo:"/assets/images/stack_logo_css3.png",alt:"CSS3",flag:"CSS3"},{logo:"/assets/images/stack_logo_eclipse.png",alt:"Eclipse IDE",flag:"Eclipse IDE"},{logo:"/assets/images/stack_logo_figma.png",alt:"Figma",flag:"Figma"},{logo:"/assets/images/stack_logo_filezilla.png",alt:"FileZilla",flag:"FileZilla"},{logo:"/assets/images/stack_logo_git.png",alt:"Git",flag:"Git"},{logo:"/assets/images/stack_logo_github.png",alt:"GitHub",flag:"GitHub"},{logo:"/assets/images/stack_logo_gitlab.png",alt:"GitLab",flag:"GitLab"},{logo:"/assets/images/stack_logo_gulp.png",alt:"Gulp",flag:"Gulp"},{logo:"/assets/images/stack_logo_html5.png",alt:"HTML5",flag:"HTML5"}],reverse:[{logo:"/assets/images/stack_logo_javascript.png",alt:"Javascript",flag:"Javascript"},{logo:"/assets/images/stack_logo_jquery.png",alt:"jQuery",flag:"jQuery"},{logo:"/assets/images/stack_logo_node.png",alt:"node.js",flag:"node.js"},{logo:"/assets/images/stack_logo_npm.png",alt:"npm",flag:"npm"},{logo:"/assets/images/stack_logo_photoshop.png",alt:"Adobe Photoshop",flag:"Photoshop"},{logo:"/assets/images/stack_logo_powershell.png",alt:"Powershell",flag:"Powershell"},{logo:"/assets/images/stack_logo_sass.png",alt:"sass",flag:"sass"},{logo:"/assets/images/stack_logo_slack.png",alt:"slack",flag:"slack"},{logo:"/assets/images/stack_logo_vite.png",alt:"vite",flag:"vite"},{logo:"/assets/images/stack_logo_vscode.png",alt:"vscode",flag:"vscode"},{logo:"/assets/images/stack_logo_xd.png",alt:"Adobe Xd",flag:"Xd"}]};class i{constructor(s,t){this.stackItems=s,this.container=document.querySelector(t)}render(){this.stackItems.forEach(s=>{this.container.insertAdjacentHTML("beforeend",`
          <li class="stack__item">
            <img class="stack__item-logo" src="${s.logo}" alt="">
            <span class="stack__item-flag">${s.flag}</span>
          </li>
        `)})}}const f=[{project:"BESPOKE infinite Line",flag:"New Project",desc:"비스포크 인피니트 라인 <br>홍보 페이지 제작",link:"./detail/bespoke.html",bg:"projects__link__bg--bespoke"},{project:"삼성케어플러스",flag:"New Project",desc:"삼성케어플러스 가전 / TV<br> 안내 페이지 제작",link:"./detail/care.html",bg:"projects__link__bg--care"},{project:"ADSTORM",flag:"Creative Renewal",desc:"웹에이전시 애드스톰 사이트<br> 애니메이션 리뉴얼",link:"./detail/adstorm.html",bg:"projects__link__bg--adstorm"},{project:"삼성닷컴 CPG",flag:"Operation",desc:"삼성닷컴의 제품 <br>CPG 페이지 리뉴얼 및 운영",link:"./detail/cpg.html",bg:"projects__link__bg--cpg"},{project:"Dacor",flag:"Operation",desc:"Dacor 사이트 <br> 리뉴얼 및 운영",link:"./detail/dacor.html",bg:"projects__link__bg--dacor"}];class j{constructor(s,t){this.projectItems=s,this.container=document.querySelector(t)}render(){this.projectItems.forEach(s=>{this.container.insertAdjacentHTML("beforeend",`
          <li class="projects__item">
            <a href="${s.link}" class="projects__link">
              <span class="projects__link__tilt -top-left"></span>
              <span class="projects__link__tilt -top-right"></span>
              <span class="projects__link__tilt -btm-left"></span>
              <span class="projects__link__tilt -btm-right"></span>
              <div class="projects__link__mask"></div>
              <div class="projects__link__bg ${s.bg}"></div>
              <div class="projects__link-txt">
                <div class="projects__link-txt__inner">
                  <span class="projects__link-txt__small -scrollMotion -topToBottom" data-delay="0.3">${s.flag}</span>
                  <h3 class="projects__link-txt__tit -scrollMotion">${s.project}</h3>
                </div>
                <p class="projects__link-txt__desc -scrollMotion" data-delay="0.2">${s.desc}</p>
                <div class="projects__link-txt__flag">
                  <span class="txt">See</span>
                  <span class="txt">case</span>
                  <span class="txt">project</span>
                  <span class="txt -arrow">
                    <svg viewBox="0 0 24 13"><path d="M21.131 7.267H0V5.733h21.131l-4.535-4.649L17.653 0 24 6.505 22.942 7.59l-.005-.006L17.653 13l-1.057-1.084 4.535-4.65z"></path></svg>
                  </span>
                </div>
              </div>
            </a>
          </li>
        `)})}}c();r();n();g();_();p();d();h();u();function h(){const a=document.querySelector(".projects");function s(t,o){let e=t.target.closest(".projects__link__tilt");e&&e.classList.contains("projects__link__tilt")&&(o==="mouseover"?m(e,"-active"):o==="mouseout"&&k(e,"-active"))}a.addEventListener("mouseover",t=>{s(t,"mouseover")}),a.addEventListener("mouseout",t=>{s(t,"mouseout")})}function u(){const a="ontouchstart"in window||navigator.maxTouchPoints>0,s=/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),t=document.querySelector(".visual__more-txt--info");a&&s?t.innerHTML="화면을 터치해 보세요":t.innerHTML="마우스를 움직여 보세요"}const v=new i(l.forward,".stack__list--forward");v.render();const b=new i(l.reverse,".stack__list--reverse");b.render();const L=new j(f,".projects__list");L.render();
