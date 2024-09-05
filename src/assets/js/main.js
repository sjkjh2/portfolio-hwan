initHandlers();

function initHandlers() {
  menuHandler();
  mainScrollHandler();
  visualHandler();  
  workHandler();
  setupCopyText();
}

function addClass(elem, className) {
  elem.classList.add(className);
}

function removeClass(elem, className) {
  elem.classList.remove(className);
}


function setupCopyText() {
  const copyButtons = document.querySelectorAll('.copy-text');

  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const elementId = button.getAttribute('data-element-id');
      const textElement = document.getElementById(elementId);
      const textValue = textElement.value;

      textElement.select();
      textElement.setSelectionRange(0, 99999);

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? `${textValue} 클립보드에 복사되었습니다!` : '복사에 실패했습니다';
        alert(msg);
      } catch (err) {
        alert('복사하는 동안 오류가 발생했습니다: ' + err);
      }
    });
  });
}


function menuHandler() {
  
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const headerMenu = document.querySelector('.header-menu');
  const main = document.querySelector('.main');
  const mouseCursor = document.querySelector('.header-menu__cursor');
  const menuListWrap = document.querySelector('.header-menu__list');
  const menuItems = document.querySelectorAll('.header-menu__link');
  const menuBackgrounds = document.querySelectorAll('.header-menu__pic');
  let currentBackground;
  let cursorHandler;
  let menuOpenBtn;

  function menuOpenedHandler() {
  
    function menuOpen(elem) {
      elem.setAttribute('aria-expanded', true);
      addClass(body, '-has-popup');
      addClass(headerMenu, '-opened');
      addClass(main, '-has-popup');
      removeClass(headerMenu, '-closed');
      linkMouseCursor();
    }
  
    function delayClass() {
      let start;
      function delay(time) {
        if (!start) start = time;
        const elapsed = time - start;
    
        if (elapsed >= 500) {
          removeClass(headerMenu, '-opened');
          removeClass(headerMenu, '-closed');
        } else {
          requestAnimationFrame(delay);
        }
      }
      requestAnimationFrame(delay);
    }
  
    function menuClosed() {
      removeClass(body, '-has-popup');
      if (menuOpenBtn) {
        menuOpenBtn.setAttribute('aria-expanded', false);
      }
  
      addClass(headerMenu, '-closed');
      delayClass();
  
      if (cursorHandler) {
        window.removeEventListener('mousemove', cursorHandler);
        cursorHandler = null;
      }
  
      removeClass(main, '-has-popup');
    }
  
    function menuOpenedControl(target, opacity, visibility, delay) {
      setTimeout(() => {
        target.style.opacity = opacity;
        target.style.visibility = visibility;
      }, delay);
    }
  
    function trapFocus() {
      const focusableElements = headerMenu.querySelectorAll('button, a, [tabindex]');
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
      headerMenu.addEventListener('keydown', function(event) {
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
  
        if (!isTabPressed) return;
  
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
  
    function delayLinkHandler(elem) {
      const url = elem.getAttribute('href');
      let start;
    
      function delayLink(time) {
        if (!start) start = time;
        const elapsed = time - start;
    
        if (elapsed >= 1100) {
          window.location.href = url;
        } else {
          requestAnimationFrame(delayLink);
        }
      }
      requestAnimationFrame(delayLink);
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && headerMenu.classList.contains('-opened')) {
        menuOpenedControl(headerMenu, '0', 'hidden', 1200);
        menuClosed();
      }
    });
  
    header.addEventListener('click', (event) => {
      let target = event.target.closest('.header-menu__open, .header-menu__closed, .header-menu__link');
      
      if (!target) return;
      
      if (target.classList.contains('header-menu__closed')) {
        menuClosed();
        menuOpenedControl(headerMenu, '0', 'hidden', 1200);
      }
  
      if (target.classList.contains('header-menu__open')) {
        menuOpen(target);
        menuOpenBtn = target;
        menuOpenedControl(headerMenu, '1', 'visible', 0);
        trapFocus();
      }
  
      if (target.classList.contains('header-menu__link')) {
        console.log(target)
        event.preventDefault();
        menuClosed();
        delayLinkHandler(target);
      }
    });
  }
  menuOpenedHandler();

  function linkMouseCursor() {
    cursorHandler = function(event) {
      const cursorHalfWidth = mouseCursor.clientWidth / 2;
      const cursorHalfHeight = mouseCursor.clientHeight / 2;
  
      mouseCursor.style.transform = `
        translate(${event.clientX - cursorHalfWidth}px, ${event.clientY - cursorHalfHeight}px) 
      `;
    }
    headerMenu.addEventListener('mousemove', cursorHandler);
  }

  function linkMouseCursorClassHandler(action) {
    if (action === 'mouseover') {
      addClass(mouseCursor, '-grow');
    } else if (action === 'mouseout') {
      removeClass(mouseCursor, '-grow');
    }
  }

  function menuHoverHandler() {
    function addIndex(elem) {
      elem.forEach((elem, index) => {
        elem.dataset.index = index;
      })
    }
  
    function handlerMenuItem(event, action, currentBackground) {
      let target = event.target.closest('.header-menu__link');
  
      if (!target) return;
    
      if (target.classList.contains('header-menu__link')) {
        const index = target.dataset.index;
        const correspondingBackground = document.querySelector(`.header-menu__pic[data-index="${index}"]`);
        if (correspondingBackground) {
          if (action === 'mouseover' && currentBackground) {
            removeClass(currentBackground, '-visible');
          }
          if (action === 'mouseover') {
            addClass(correspondingBackground, '-visible');
          } else if (action === 'mouseout') {
            removeClass(currentBackground, '-visible');
          }
          return correspondingBackground;
        }
      }
      return null;
    }
  
    function menuActionHandler() {
      addIndex(menuItems);
      addIndex(menuBackgrounds);
  
      menuListWrap.addEventListener('mouseover', (event) => {
        currentBackground = handlerMenuItem(event, 'mouseover', currentBackground);
        linkMouseCursorClassHandler('mouseover');
      });
    
      menuListWrap.addEventListener('mouseout', (event) => {
        handlerMenuItem(event, 'mouseout', currentBackground);
        linkMouseCursorClassHandler('mouseout');
      });
    }
    menuActionHandler();
  }
  menuHoverHandler();
}


function mainScrollHandler() {
  const headerBarElem = document.querySelector('.header-scroll');
  const menuOpenBtn = document.querySelector('.header-menu__open')
  const visual = document.querySelector('.visual');
  let visualBreakpoint;
  let maxScrollValue;

  function resizeHandler() {
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
  

  window.addEventListener('resize', resizeHandler);

  resizeHandler()
}


function visualHandler() {
  const parallaxElem = document.querySelectorAll('.visual__parallax');
  let mousePos = { x: 0, y: 0};
  let rotateDegree = 0;

  function update(cursorPosition) {
    parallaxElem.forEach((el) => {
      let speadx = el.dataset.speedx;
      let speady = el.dataset.speedy;
      let speadz = el.dataset.speedz;
      let rotateSpeed = el.dataset.rotation;

      let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
      let zVlaue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

      el.style.transform = `
        perspective(230rem) 
        translate3d(calc(-50% + ${-mousePos.x * speadx}px), calc(-50% + ${mousePos.y * speady}px), ${zVlaue * speadz}px) 
        rotateY(${rotateDegree * rotateSpeed}deg)
      `;
    })
  }

  update(0);

  const visual = document.querySelector('.visual');
  visual.addEventListener('mousemove', (event) => {
    mousePos.x = event.clientX - window.innerWidth / 2;
    mousePos.y = event.clientY - window.innerHeight / 2;

    rotateDegree = (mousePos.x / (window.innerWidth / 2)) * 20;

    update(mousePos.x);
  });
}


function workHandler() {
  const workWrap = document.querySelector('.work');

  function linkHover(event, action) {
    let target = event.target.closest('.work__link__tilt');

    if (!target) return;

    if (target.classList.contains('work__link__tilt')) {
      if (action ==='mouseover') {
        addClass(target, '-active');
      } else if (action === 'mouseout') {
        removeClass(target, '-active');
      }
    }
  }

  workWrap.addEventListener('mouseover', (event) => {
    linkHover(event, 'mouseover');
  });

  workWrap.addEventListener('mouseout', (event) => {
    linkHover(event, 'mouseout');
  });
}