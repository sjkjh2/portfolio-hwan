export function addClass(elem, className) {
  elem.classList.add(className);
}

export function removeClass(elem, className) {
  elem.classList.remove(className);
}

export function setupCopyText() {
  const copyButtons = document.querySelectorAll('.-copy-text');

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

export function refresh() {
  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100);
  })
}

export function detectDeviceType() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // if (isTouch && isMobile) {
  //   return 'Mobile/Tablet';
  // } else {
  //   return 'PC';
  // }
}