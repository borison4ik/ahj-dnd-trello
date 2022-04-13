import Card from '../card';
import Add from '../addButton';

export default class List {
  constructor(list) {
    this.name = list?.name;
    this.items = list?.items;
  }

  render() {
    const list = document.createElement('div');
    list.className = 'app__list';
    const h3 = document.createElement('h3');
    h3.className = 'app__title';
    h3.textContent = this.name;
    const button = new Add({ id: this.name });

    list.appendChild(h3);

    if (this.items.length > 0) {
      this.items.forEach((item) => {
        const card = new Card({ ...item });
        list.appendChild(card.render());
      });
    }

    list.appendChild(button);

    return list;
  }
}
