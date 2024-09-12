import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { addClass } from './utill';
import { removeClass } from './utill';

export function gsapScrollHandler() {
  gsap.registerPlugin(ScrollTrigger);

  const hide = (el) => {
    gsap.set(el, {autoAlpha: 0});
  };

  const animate = (el) => {
    const elDelay = parseFloat(el.dataset.delay) || 0;
    let x = 0;
    let y = 0;
    let delay = elDelay;
    let duration = 1;
    let ease = 'bounce';

    if (el.classList.contains('-topToBottom')) {
      y = -50;
    } else {
      y = 100;
    }

    gsap.fromTo(el, 
      {autoAlpha: 0, x: x, y: y}, 
      {autoAlpha: 1, x: 0, y: 0, delay: elDelay, duration: duration, overwrite: 'auto', ease: ease}
    );
  };

  gsap.utils.toArray('.-scrollMotion').forEach(el => {
    hide(el);

    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      markers: false,
      onEnter: () => {
        animate(el);
      },
    });
  });
}

export function mainVisualHandler() {
  const parallaxElem = document.querySelectorAll('.visual__parallax');
  let mousePos = { x: 0, y: 0 };
  let rotateDegree = 0;

  parallaxElem.forEach((el) => {
    gsap.set(el, {
      perspective: '230rem',
      xPercent: -50,
      yPercent: -50,
      z: 0,
      rotateY: 0,
    });
  });

  const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'bounce' } });

  Array.from(parallaxElem)
    .filter((el) => !el.classList.contains('visual__parallax--txt'))
    .forEach((el, index) => {
      timeline.from(el, {
        y: el.offsetHeight / 2 + +el.dataset.distance,
        opacity: 0,
        duration: 3.5,
        ease: 'power3.out',
      }, index * 0.2);
    });

  timeline.from('.visual__logo', {
    y: 300,
    opacity: 0,
    delay: 1,
    duration: 2,
  }, '2.5')
  .from('.visual__tit', {
    y: -150,
    opacity: 0,
    delay: 0.6,
    duration: 2,
  }, '3')
  .from('.-hide', {
    opacity: 0,
    duration: 1.5,
  });

  function updateParallax() {
    parallaxElem.forEach((el) => {
      const speadx = el.dataset.speedx || 1;
      const speady = el.dataset.speedy || 1;
      const speadz = el.dataset.speedz || 1;
      const rotateSpeed = el.dataset.rotation || 1;

      const left = parseFloat(getComputedStyle(el).left);
      const isInLeft = left < window.innerWidth / 2 ? 1 : -1;
      const zValue = (mousePos.x - left) * isInLeft * 0.1;

      gsap.set(el, {
        x: -mousePos.x * speadx,
        y: mousePos.y * speady,
        z: zValue * speadz,
        rotateY: rotateDegree * rotateSpeed,
      });
    });
  }

  function onMouseMove(event) {
    mousePos.x = event.clientX - window.innerWidth / 2;
    mousePos.y = event.clientY - window.innerHeight / 2;
    rotateDegree = (mousePos.x / (window.innerWidth / 2)) * 20;

    updateParallax();
  }

  function onResize() {
    updateParallax();
  }

  const visual = document.querySelector('.visual');
  visual.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);

  updateParallax();
}


// function visualHandler() {
//   const parallaxElem = document.querySelectorAll('.visual__parallax');
//   let mousePos = { x: 0, y: 0 };
//   let rotateDegree = 0;

//   function update(cursorPosition) {
//     parallaxElem.forEach((el) => {
//       const speadx = el.dataset.speedx || 1;
//       const speady = el.dataset.speedy || 1;
//       const speadz = el.dataset.speedz || 1;
//       const rotateSpeed = el.dataset.rotation || 1;

//       const left = parseFloat(getComputedStyle(el).left);
//       const isInLeft = left < window.innerWidth / 2 ? 1 : -1;
//       const zVlaue = (cursorPosition - left) * isInLeft * 0.1;

//       el.style.transform = `
//         perspective(230rem) 
//         translate3d(calc(-50% + ${-mousePos.x * speadx}px), calc(-50% + ${mousePos.y * speady}px), ${zVlaue * speadz}px) 
//         rotateY(${rotateDegree * rotateSpeed}deg)
//       `;
//     });
//   }

//   function onMouseMove(event) {
//     mousePos.x = event.clientX - window.innerWidth / 2;
//     mousePos.y = event.clientY - window.innerHeight / 2;
//     rotateDegree = (mousePos.x / (window.innerWidth / 2)) * 20;
//     requestAnimationFrame(() => update(mousePos.x));
//   }

//   function onResize() {
//     requestAnimationFrame(() => update(mousePos.x));
//   }

//   const visual = document.querySelector('.visual');
//   visual.addEventListener('mousemove', onMouseMove);
//   window.addEventListener('resize', onResize);

//   update(0);
// }