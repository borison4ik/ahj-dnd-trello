export default class Card {
  constructor(item) {
    if (!item?.id) {
      throw new Error('Card must have id');
    }
    this.text = item?.text || 'empty';
    this.id = item?.id;
  }

  render() {
    const card = document.createElement('div');
    card.dataset.id = this.id;
    card.className = 'card';
    const button = document.createElement('button');
    button.className = 'card__close';
    button.type = 'button';
    const p = document.createElement('p');
    p.className = 'card__text';
    p.textContent = this.text;

    card.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      if (evt.target !== button) {
        this.ghostEl = card.cloneNode(true);
        this.ghostEl.classList.add('dragged');
        this.ghostEl.style.width = `${
          evt.currentTarget.getBoundingClientRect().width
        }px`;
        this.ghostEl.style.transform = 'rotate(5deg)';
        document.body.appendChild(this.ghostEl);
        this.coordsEl = {
          x: evt.currentTarget.getBoundingClientRect().x,
          y: evt.currentTarget.getBoundingClientRect().y,
        };
        this.size = {
          width: evt.currentTarget.getBoundingClientRect().width,
          height: evt.currentTarget.getBoundingClientRect().height,
        };
        this.delta = {
          x: evt.pageX - this.coordsEl.x,
          y: evt.pageY - this.coordsEl.y,
        };
        this.dragged = true;
        this.ghostEl.style.left = `${this.coordsEl.x}px`;
        this.ghostEl.style.top = `${this.coordsEl.y}px`;

        this.emtyEl = document.createElement('div');
        this.emtyEl.className = 'emty';
        this.emtyEl.style.width = `${this.size.width}px`;
        this.emtyEl.style.height = `${this.size.height}px`;
        card.replaceWith(this.emtyEl);
      }
    });

    card.addEventListener('mouseenter', (evt) => {
      // const { id } = evt.currentTarget.dataset;
      // console.log(id);
      // if (this.dragged) {
      //   document
      //     .querySelector(`[data-id="${id}"]`)
      //     .insertAdjacentElement('beforebegin', this.emtyEl.cloneNode(true));
      // }
    });

    document.addEventListener('mousemove', (evt) => {
      if (this.dragged) {
        this.ghostEl.style.left = `${evt.pageX - this.delta.x}px`;
        this.ghostEl.style.top = `${evt.pageY - this.delta.y}px`;
      }
      this.closestEl = document.elementFromPoint(evt.pageX, evt.pageY);
      this.closestList = this.closestEl.closest('.app__list');
      this.closestCard = this.closestEl.closest('.card');
      this.closestBtn = this.closestEl.closest('.add__button');
      if (this.closestList && this.dragged && this.closestEl !== this.emtyEl) {
        this.hoverIndex = [...this.closestList.children].findIndex(
          (i) => i === this.closestCard
        );
        console.log(this.hoverIndex);
      }

      if (
        this.closestList &&
        this.closestList.children.length <= 2 &&
        this.dragged
      ) {
        this.closestList
          .querySelector('.add__button')
          .insertAdjacentElement('beforebegin', this.emtyEl);
      } else if (this.closestList && this.closestCard && this.dragged) {
        this.closestCard.insertAdjacentElement('beforebegin', this.emtyEl);
      } else if (this.dragged && this.closestList && this.closestBtn) {
        this.closestBtn.insertAdjacentElement('beforebegin', this.emtyEl);
      }
    });

    document.addEventListener('mouseup', (evt) => {
      let closestListName = null;
      let listBtn = null;

      if (this.closestList && this.dragged) {
        closestListName =
          this.closestList.querySelector('.app__title').textContent;
        listBtn = this.closestList.querySelector('.add__button');

        document.body.removeChild(this.ghostEl);

        if (this.closestCard) {
          this.closestCard.insertAdjacentElement('beforebegin', this.ghostEl);
        }

        this.ghostEl.style.top = 'unset';
        this.ghostEl.style.left = 'unset';
        this.ghostEl.classList.remove('dragged');
        this.dragged = false;

        document.dispatchEvent(
          new CustomEvent('MOVED_CARD', {
            detail: {
              id: this.id,
              listId: closestListName,
              position: this.hoverIndex - 1,
            },
          })
        );
      }
    });

    button.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('DELETE_CARD', { detail: { id: this.id } })
      );
      card.remove();
    });

    card.appendChild(button);
    card.appendChild(p);

    return card;
  }
}
