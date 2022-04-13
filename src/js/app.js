import List from './components/list';
import State from './state';

import '../css/style.scss';

export default class App {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.STATE = new State();

    this.STATE.getFromLocalStorage();
  }

  init() {
    this.render();
    this.listeners();
  }

  render() {
    this.rootEl.innerHTML = '';
    this.STATE.getState().forEach((list) => {
      const listEl = new List({ ...list }).render();
      this.rootEl.appendChild(listEl);
    });
  }

  listeners() {
    document.addEventListener('ADD_CARD', (evt) => {
      const { listId, text, id } = evt.detail;

      this.STATE.addCard(listId, text, id);
      console.log(this.STATE);

      this.render();
    });

    document.addEventListener('DELETE_CARD', (evt) => {
      const { id } = evt.detail;
      this.STATE.deleteCard(id);
      this.render();
    });

    document.addEventListener('MOVED_CARD', (evt) => {
      const { id, listId, position } = evt.detail;
      console.log('position', position);
      this.STATE.moveCard(id, listId, position);
      this.render();
    });
  }
}
