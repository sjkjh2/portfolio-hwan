import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

function initHandler() {
  reasonSwiper();
  tabsHandler();
  navScrollHandler();
  youtubePopup();
}
initHandler();

function youtubePopup() {
  const openPopupButtons = document.querySelectorAll('[aria-controls="youtubePop"]');
  const popup = document.getElementById('youtubePop');
  const iframe = popup.querySelector('iframe');
  const closePopupButton = popup.querySelector('.popup-youtube__close');
  let lastFocusedElem;
  let dimmed;

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const youtubeId = button.getAttribute('data-youtube');
      lastFocusedElem = document.activeElement;
      openPopup(youtubeId);
    });
  });

  closePopupButton.addEventListener('click', () => {
    closePopup();
  });

  function openPopup(youtubeId) {
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}`;

    iframe.src = youtubeUrl;
    document.body.classList.add('-has-popup');
    createDimmed();
    popup.hidden = false;
    closePopupButton.focus();
    popup.setAttribute('aria-hidden', 'false');
    trapFocus();
  }

  function createDimmed() {
    dimmed = document.createElement('div');
    dimmed.className = 'dimmed';
    document.body.appendChild(dimmed);
    dimmed.addEventListener('click', closePopup);
  }

  function trapFocus() {
    const focusableElements = popup.querySelectorAll('button, a, [tabindex]');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    popup.addEventListener('keydown', function(event) {
      const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    });
  }

  function closePopup() {
    popup.hidden = true;
    document.body.classList.remove('-has-popup');

    if (dimmed) {
      document.body.removeChild(dimmed);
      dimmed = null;
    }

    iframe.src = '';
    popup.setAttribute('aria-hidden', 'true');

    if (lastFocusedElem) {
      lastFocusedElem.focus();
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !popup.hidden) {
      closePopup();
    }
  });
}

function navScrollHandler() {
  const container = document.querySelectorAll('.nav-container');
  
  // 각 nav의 위치와 높이를 저장하는 배열
  let containerData = [];

  // 초기화 함수
  function initContainerData() {
    containerData = Array.from(container).map((container) => {
      return {
        element: container,
        offsetTop: container.offsetTop,
        height: container.offsetHeight,
        nav: container.querySelector('nav')
      };
    });
  }

  function initScrolling() {
    const scrollY = window.scrollY;

    containerData.forEach((data) => {
      const { element, offsetTop, height, nav } = data;
      
      if (scrollY > offsetTop && scrollY < offsetTop + height) {
        nav.classList.add('-shadow');
      } else {
        nav.classList.remove('-shadow');
      }
    });
  }

  function handleScroll() {
    window.requestAnimationFrame(initScrolling);
  }

  window.addEventListener('resize', () => {
    initContainerData();
    initScrolling();
  });

  window.addEventListener('scroll', handleScroll);

  initContainerData();
  initScrolling();
}

function reasonSwiper(){
  let swiper = null;

  function initSwiper() {
    if (window.innerWidth <= 800) {
      if (!swiper) {
        swiper = new Swiper('.care-all__reason__swiper', {
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

function tabsHandler() {
  const tabContainer = document.querySelectorAll('.tabs-container');

  tabContainer.forEach((container) => {
    initTabs(container);
  });

  function initTabs(container) {
    const tablist = container.querySelector('[role="tablist"]');
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    activate(tabs[0]);
    activate(panels[0]);
  
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        activateTab(tab, panels[index], tabs, panels);
      });
  
      tab.addEventListener('keydown', (e) => {
        const key = e.key;
        let newIndex;
  
        if (key === 'ArrowRight') {
          newIndex = (index + 1) % tabs.length;
        } else if (key === 'ArrowLeft') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        }
  
        if (newIndex !== undefined) {
          tabs[newIndex].focus();
          activateTab(tabs[newIndex], panels[newIndex], tabs, panels);
        }
      });
    });
  }

  function activate(el) {
    el.classList.add('-active');
    if (el.getAttribute('role') === 'tab') {
      el.setAttribute('aria-selected', 'true');
    } else if (el.getAttribute('role') === 'tabpanel') {
      el.setAttribute('aria-hidden', 'false');
    }
  }

  function inactivate(el) {
    el.classList.remove('-active');
    if (el.getAttribute('role') === 'tab') {
      el.setAttribute('aria-selected', 'false');
    } else if (el.getAttribute('role') === 'tabpanel') {
      el.setAttribute('aria-hidden', 'true');
    }
  }
  
  function activateTab(tab, panel, tabs, panels) {
    tabs.forEach((t) => {
      inactivate(t);
    });
  
    panels.forEach((p) => {
      inactivate(p);
    });
  
    activate(tab);
    activate(panel);
  }
}




