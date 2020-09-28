import {createElement} from "../utils.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Нельзя создавать объект напрямую. Унаследуйте данный класс!`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Не описан метод getTemplate()`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
