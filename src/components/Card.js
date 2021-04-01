export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplateCard() {
        const elementTemplate = document.querySelector(this._cardSelector).content
        const cardElement = elementTemplate
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplateCard();
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement = this._element.querySelector('.element__image');
        this._imageElement.src = this._image;
        this._titleElement.textContent = this._text;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', function (evt) {
            const eventTarget = evt.target
            eventTarget.classList.toggle('element__like_active')
        })
        this._deleteButton.addEventListener('click', () => {
           this._deleteCard()
        })
        this._imageElement.addEventListener('click', this._handleCardClick);
      }

    _deleteCard() {
            this._element.remove();
    }
    
}
