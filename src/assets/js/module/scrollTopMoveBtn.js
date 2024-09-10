import { addClass } from './utill';
import { removeClass } from './utill';

export function scrollTopMoveBtn() {
  const scrollTopBtn = document.querySelector('.scroll-up');
  scrollTopBtn.addEventListener('click', (event) => {
    setTimeout(() => scrollTo(0, 0), 100);
  });
}