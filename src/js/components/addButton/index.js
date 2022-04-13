import { v4 as uuid } from 'uuid';

// написать отдельный компонент
export default class Add {
  constructor(obj) {
    this.parent = obj?.parent;
    this.id = obj?.id;
    this.button = document.createElement('button');
    this.button.className = 'add__button';
    this.button.type = 'button';
    this.button.textContent = 'add new Task';

    this.button.addEventListener('click', this.btnClickHandler.bind(this));

    this.isHidden = false;

    return this.button;
  }

  btnClickHandler(evt) {
    console.log(this.button);
    const { target } = evt;

    const addItem = document.createElement('div');
    addItem.className = 'add__item';
    const textArea = document.createElement('textarea');
    textArea.className = 'add__textarea';
    const controls = document.createElement('div');
    controls.className = 'add__controls';
    const applyBtn = document.createElement('button');
    applyBtn.className = 'controls__btn';
    applyBtn.textContent = 'Applay';
    applyBtn.addEventListener('click', () => {
      console.log(textArea.value);
      document.dispatchEvent(
        new CustomEvent('ADD_CARD', {
          detail: { listId: this.id, text: textArea.value, id: uuid() },
        })
      );
      addItem.remove();
      this.button.classList.remove('hidden');
    });
    const backBtn = document.createElement('button');
    backBtn.className = 'controls__btn';
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => {
      addItem.remove();
      this.button.classList.remove('hidden');
    });

    controls.appendChild(applyBtn);
    controls.appendChild(backBtn);
    addItem.appendChild(textArea);
    addItem.appendChild(controls);

    this.button.classList.add('hidden');
    target.insertAdjacentElement('beforebegin', addItem);
    textArea.focus();
  }
}
