import { addClass } from './module/utill';
import { removeClass } from './module/utill';
// import { projectsList } from './module/projectsList';

export function projectsHandler() {
  const projectsWrap = document.querySelector('.projects');

  function linkHover(event, action) {
    let target = event.target.closest('.projects__link__tilt');

    if (!target) return;

    if (target.classList.contains('projects__link__tilt')) {
      if (action ==='mouseover') {
        addClass(target, '-active');
      } else if (action === 'mouseout') {
        removeClass(target, '-active');
      }
    }
  }

  projectsWrap.addEventListener('mouseover', (event) => {
    linkHover(event, 'mouseover');
  });

  projectsWrap.addEventListener('mouseout', (event) => {
    linkHover(event, 'mouseout');
  });
}

// export function projectsListHandler() {
//   const projectsList = new FileList({
//     data: projectsList.list,
//     id : 'projectsList'
//   });
// }