import { addClass } from './utill';
import { removeClass } from './utill';

export function scrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-up');

  const checkScrollPosition = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if (currentScroll >= documentHeight) {
      addClass(scrollTopBtn, '-show');
    } else {
      removeClass(scrollTopBtn, '-show');
    }
  };

  checkScrollPosition();

  window.addEventListener('scroll', () => {
    checkScrollPosition();
  });

  window.addEventListener('resize', () => {
    checkScrollPosition();
  });

  scrollTopBtn.addEventListener('click', (event) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      removeClass(scrollTopBtn, '-show');
    }, 100);
  });
}
