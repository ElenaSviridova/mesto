export default class Card {
    constructor(data, cardSelector) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__title').textContent = this._text;
        return this._element;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like');
        this._likeButton.addEventListener('click', function (evt) {
            const eventTarget = evt.target
            eventTarget.classList.toggle('element__like_active')
        })
        this._deleteButton = this._element.querySelector('.element__delete'); 
        this._deleteButton.addEventListener('click', () => {
           this._deleteCard()
        })
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPicture()
            
        })
      }

    _deleteCard() {
        const listElement = this._deleteButton.closest('.element');
            listElement.remove();
    }

    _openPicture() {
        togglePopup(popupImage);
        popupPicture.src = this._image;
        popupPicture.alt = this._image;
        popupCaption.textContent = this._text;
    }
    
    
}
const popupImage = document.querySelector('.popup_image'); 
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');

function togglePopup(popup) {
    popup.classList.toggle('popup_opened'); 
    if (popup.classList.contains('popup_opened')) {
      document.addEventListener('keydown', closeByEscape);
    }
    else {
      document.removeEventListener('keydown', closeByEscape);
    }
  }//открываем закрываем попап
  //функция закрытия по Esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      togglePopup(openedPopup);
    }
  }
