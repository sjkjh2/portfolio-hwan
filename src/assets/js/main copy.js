function initHandlers() {
  menuOpenedHandler();
  menuHoverHandler();
}
initHandlers();

function menuOpenedHandler() {
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const headerMenu = document.querySelector('.header-menu');
  const menuLinks = document.querySelectorAll('.header-menu__link');
  let menuOpenBtn;

  function addClass(elem, className) {
    elem.classList.add(className);
  }

  function removeClass(elem, className) {
    elem.classList.remove(className);
  }

  function menuOpen(elem) {
    elem.setAttribute('aria-expanded', true);
    addClass(body, '-has-popup');
    addClass(headerMenu, '-opened');
    removeClass(headerMenu, '-closed');
    linkMouseCursor();
  }

  function delayClass() {
    let start;
    function delay(time) {
      if (!start) start = time;
      const elapsed = time - start;
  
      if (elapsed < 500) {
        requestAnimationFrame(delay);
      } else {
        removeClass(headerMenu, '-opened');
        removeClass(headerMenu, '-closed');
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

  function delayLinkHandler(elem) {
    const url = elem.getAttribute('href');
    let start;
  
    function delayLink(time) {
      if (!start) start = time;
      const elapsed = time - start;
  
      if (elapsed < 1100) {
        requestAnimationFrame(delayLink);
      } else {
        window.location.href = url;
      }
    }
    requestAnimationFrame(delayLink);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && headerMenu.classList.contains('-opened')) {
      menuClosed();
      menuOpenedControl(headerMenu, '0', 'hidden', 1200);
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const url = link.getAttribute('href');

      menuClosed();

      setTimeout(() => {
        window.location.href = url;
      }, 1100);
    });
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
      event.preventDefault();
      menuClosed();
      delayLinkHandler(target);
    }
  });
}

const mouseCursor = document.querySelector('.header-menu__cursor');
let cursorHandler;

function linkMouseCursor() {
  cursorHandler = function(event) {
    const cursorHalfWidth = mouseCursor.clientWidth / 2;
    const cursorHalfHeight = mouseCursor.clientHeight / 2;

    mouseCursor.style.transform = `
      translate3d(${event.clientX - cursorHalfWidth}px, ${event.clientY - cursorHalfHeight}px, 0)
    `;
  }
  window.addEventListener('mousemove', cursorHandler);
}

function linkMouseCursorClassHandler(action) {
  if (action === 'mouseover') {
    mouseCursor.classList.add('-grow');
  } else if (action === 'mouseout') {
    mouseCursor.classList.remove('-grow');
  }
}

function menuHoverHandler() {
  function addIndex(elem) {
    elem.forEach((elem, index) => {
      elem.dataset.index = index;
    })
  }

  function visible(elem) {
    elem.classList.add('-visible');
  }

  function invisible(elem) {
    elem.classList.remove('-visible');
  }

  function handlerMenuItem(event, action, currentBackground) {
    let target = event.target.closest('.header-menu__link');

    if (!target) return;
  
    if (target.classList.contains('header-menu__link')) {
      const index = target.dataset.index;
      const correspondingBackground = document.querySelector(`.header-menu__pic[data-index="${index}"]`);
      if (correspondingBackground) {
        if (action === 'mouseover' && currentBackground) {
          invisible(currentBackground);
        }
        if (action === 'mouseover') {
          visible(correspondingBackground);
          linkMouseCursorClassHandler('mouseover');
        } else if (action === 'mouseout') {
          invisible(currentBackground);
          linkMouseCursorClassHandler('mouseout');
        }
        return correspondingBackground;
      }
    }
    return null;
  }

  function menuActionHandler() {
    const menuListWrap = document.querySelector('.header-menu__list');
    const menuItems = document.querySelectorAll('.header-menu__link');
    const menuBackgrounds = document.querySelectorAll('.header-menu__pic');
    
    let currentBackground = null;

    addIndex(menuItems);
    addIndex(menuBackgrounds);

    menuListWrap.addEventListener('mouseover', (event) => {
      currentBackground = handlerMenuItem(event, 'mouseover', currentBackground);
    });
  
    menuListWrap.addEventListener('mouseout', (event) => {
      handlerMenuItem(event, 'mouseout', currentBackground);
    });
  }
  menuActionHandler();
}

