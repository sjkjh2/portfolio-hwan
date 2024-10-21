export default class projectList {
  constructor(projectItems, containerSelector) {
    this.projectItems = projectItems;
    this.container = document.querySelector(containerSelector);
  }

  render() {
    this.projectItems.forEach(item => {
      this.container.insertAdjacentHTML('beforeend', 
        `
          <li class="projects__item">
            <a href="${item.link}" class="projects__link">
              <span class="projects__link__tilt -top-left"></span>
              <span class="projects__link__tilt -top-right"></span>
              <span class="projects__link__tilt -btm-left"></span>
              <span class="projects__link__tilt -btm-right"></span>
              <div class="projects__link__mask"></div>
              <div class="projects__link__bg ${item.bg}"></div>
              <div class="projects__link-txt">
                <div class="projects__link-txt__inner">
                  <span class="projects__link-txt__small -scrollMotion -topToBottom" data-delay="0.3">${item.flag}</span>
                  <h3 class="projects__link-txt__tit -scrollMotion">${item.project}</h3>
                </div>
                <p class="projects__link-txt__desc -scrollMotion" data-delay="0.2">${item.desc}</p>
                <div class="projects__link-txt__flag">
                  <span class="txt">See</span>
                  <span class="txt">case</span>
                  <span class="txt">project</span>
                  <span class="txt -arrow">
                    <svg viewBox="0 0 24 13"><path d="M21.131 7.267H0V5.733h21.131l-4.535-4.649L17.653 0 24 6.505 22.942 7.59l-.005-.006L17.653 13l-1.057-1.084 4.535-4.65z"></path></svg>
                  </span>
                </div>
              </div>
            </a>
          </li>
        `
      );
    });
  }
}
