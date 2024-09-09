import { addClass } from './module/utill';
import { removeClass } from './module/utill';
import { setupCopyText } from './module/utill';
import { menuHandler } from './module/Header';
import { projectsHandler } from './projects';

menuHandler();
setupCopyText();

mainScrollHandler();
visualHandler();  


function mainScrollHandler() {
  const headerBarElem = document.querySelector('.header-scroll');
  const menuOpenBtn = document.querySelector('.header-menu__open')
  const visual = document.querySelector('.visual');
  let visualBreakpoint;
  let maxScrollValue;

  function onResize() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
    visualBreakpoint = visual.offsetHeight;
  }

  function headerProgress() {
    const scrollPer = scrollY / maxScrollValue;
    headerBarElem.style.height = scrollPer * 100 + '%';

    if (scrollY >= visualBreakpoint / 1.5) {
      addClass(headerBarElem, '-change');
    } else {
      removeClass(headerBarElem, '-change');
    }

    if (scrollY >= visualBreakpoint / 2) {
      addClass(menuOpenBtn, '-change');
    } else {
      removeClass(menuOpenBtn, '-change');
    }
  }

  window.addEventListener('scroll', () => {
    headerProgress();
  });
  

  window.addEventListener('resize', onResize);

  onResize()
}


function visualHandler() {
  const parallaxElem = document.querySelectorAll('.visual__parallax');
  let mousePos = { x: 0, y: 0 };
  let rotateDegree = 0;

  function update(cursorPosition) {
    parallaxElem.forEach((el) => {
      const speadx = el.dataset.speedx || 1;
      const speady = el.dataset.speedy || 1;
      const speadz = el.dataset.speedz || 1;
      const rotateSpeed = el.dataset.rotation || 1;

      const left = parseFloat(getComputedStyle(el).left);
      const isInLeft = left < window.innerWidth / 2 ? 1 : -1;
      const zVlaue = (cursorPosition - left) * isInLeft * 0.1;

      el.style.transform = `
        perspective(230rem) 
        translate3d(calc(-50% + ${-mousePos.x * speadx}px), calc(-50% + ${mousePos.y * speady}px), ${zVlaue * speadz}px) 
        rotateY(${rotateDegree * rotateSpeed}deg)
      `;
    });
  }

  function onMouseMove(event) {
    mousePos.x = event.clientX - window.innerWidth / 2;
    mousePos.y = event.clientY - window.innerHeight / 2;
    rotateDegree = (mousePos.x / (window.innerWidth / 2)) * 20;
    requestAnimationFrame(() => update(mousePos.x));
  }

  function onResize() {
    requestAnimationFrame(() => update(mousePos.x));
  }

  const visual = document.querySelector('.visual');
  visual.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  update(0);
}