import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function initHandler() {
  introPicAnimation();
  goodsSwiper();
  gsapAnimation();
}
initHandler();


function goodsSwiper(){
  let swiper = null;

  function initSwiper() {
    if (window.innerWidth <= 800) {
      if (!swiper) {
        swiper = new Swiper('.bspk-goods__box', {
          slidesPerView: 'auto',
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    }
  }

  initSwiper();

  window.addEventListener('resize', initSwiper);
}

function introPicAnimation() {
  const picContainer = document.querySelectorAll('.bspk-intro__pic');
  
  function inactivate(elem) {
    elem.classList.remove('-active');
  }

  function activate(elem) {
    elem.classList.add('-active');
  }
  
  picContainer.forEach((container) => {
    const picItems = container.querySelectorAll('.bspk-intro__pic-item');
    let currentPic = 0;
    let startTime = 0;
    let timer = 3000;

    activate(picItems[0]);

    function animate(timestamp) {
      if (timestamp - startTime >= timer) {
        picItems.forEach((item, index) => {
          inactivate(item);
        });
        currentPic = (currentPic + 1) % picItems.length;
        startTime = timestamp;
        activate(picItems[currentPic]);
      }
      requestAnimationFrame(animate);
    }
    animate(0);
  })
}

function gsapAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const playVideo = (item) => {
    const video = item;
    if (video) {
      video.play();
    }
  };

  const pauseVideo = (item) => {
    const video = item;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const hide = (item) => {
    gsap.set(item, {autoAlpha: 0});
  };

  const animate = (item) => {
    let x = 0;
    let y = 0;
    let delay = 0;
    let duration = 1.8;
    let visible = 1;
    let invisible = 0;
    let ease = 'expo';

    if (item.classList.contains('bspk-top__desc-bar--bottom')) {
      y = 100;
      delay = 0.2;
    } else if (item.classList.contains('bspk-top__video-item')) {
      invisible = 1;
    } else if (item.classList.contains('bspk-intro__overlay')) {
      invisible = 1;
      visible = 0;
      delay = 1;
      duration = 3;
      ease = 'power1';
    } else if (item.classList.contains('bspk-intro__txt-tit')) {
      y = 150;
      delay = 0.2;
    } else if (item.classList.contains('bspk-intro__txt-bar')) {
      y = -200;
      delay = 0.3;
    } else if (item.classList.contains('-nth02')) {
      y = 100;
      delay = 0.2;
    } else if (item.classList.contains('-nth03')) {
      y = 100;
      delay = 0.4;
    } else {
      y = 100;
    }

    gsap.fromTo(item, 
      {autoAlpha: invisible, x: x, y: y}, 
      {autoAlpha: visible, x: 0, y: 0, delay: delay, duration: duration, overwrite: 'auto', ease: ease}
    );
  };

  gsap.utils.toArray('.-motion').forEach(item => {
    hide(item);

    ScrollTrigger.create({
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      markers: false,
      onEnter: () => {
        animate(item);

        if (item.classList.contains('bspk-top__video-item')) {
          playVideo(item);
        }
      },
      onLeaveBack: () => {
        if (item.classList.contains('bspk-top__video-item')) {
          pauseVideo(item);
        }
      }
    });
  });
}




