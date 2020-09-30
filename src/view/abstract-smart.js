import Abstract from "./abstract.js";

export default class AbstractSmartComponent extends Abstract {
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  updateElement() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }
}
