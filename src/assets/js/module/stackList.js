export default class StackList {
  constructor(stackItems, containerSelector) {
    this.stackItems = stackItems;
    this.container = document.querySelector(containerSelector);
  }

  render() {
    this.stackItems.forEach(item => {
      this.container.insertAdjacentHTML('beforeend', 
        `
          <li class="stack__item">
            <img class="stack__item-logo" src="${item.logo}" alt="${item.alt}">
            <span class="stack__item-flag">${item.flag}</span>
          </li>
        `
      );
    });
  }
}
