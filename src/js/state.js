export default class State {
  constructor() {
    this.DATA = [
      {
        name: 'TODO',
        items: [],
      },
      {
        name: 'IN PROGRESS',
        items: [],
      },
      {
        name: 'DONE',
        items: [],
      },
    ];
  }

  getState() {
    return this.DATA;
  }

  setState(state) {
    this.DATA = [...state];
  }

  addCard(listId, text, id) {
    this.DATA = this.DATA.map((item) => {
      if (item.name === listId) {
        item.items.push({ id, text });
        return item;
      }
      return item;
    });
    this.setToLocalStorage();
  }

  deleteCard(id) {
    console.log('deleteCard', id);
    console.log(this.DATA);
    this.DATA = this.DATA.map((item) => {
      const filtered = item.items.filter((card) => card.id !== id);
      return { ...item, items: filtered };
    });
    this.setToLocalStorage();
  }

  moveCard(id, listId, position) {
    console.log('position', position);
    let findCardIndex = null;
    let findCard = null;

    const movedList = this.DATA.find((item) => item.name === listId);
    this.DATA.forEach((item) => {
      findCardIndex = item.items.findIndex((card) => card.id === id);
      if (findCardIndex > -1) {
        findCard = item.items.splice(findCardIndex, 1);
      }
    });
    if (position < 0) {
      movedList.items.push(findCard[0]);
    } else {
      movedList.items.splice(position, 0, findCard[0]);
    }

    console.log('findCardIndex', findCardIndex);
    console.log('findCard', findCard);
    console.log(this.DATA);
    this.setToLocalStorage();
  }

  getFromLocalStorage() {
    if (localStorage.getItem('TRELLO_DATA') !== null) {
      const storage = JSON.parse(localStorage.getItem('TRELLO_DATA'));
      this.DATA = [...storage];
      console.log('storage from local', this.DATA);
    }
  }

  setToLocalStorage() {
    const jsonStorage = JSON.stringify(this.DATA);
    localStorage.setItem('TRELLO_DATA', jsonStorage);
  }
}
