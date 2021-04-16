import Popup from './Popup.js'
export default class PopupWithImage extends Popup{
    constructor({popupSelector}) {
        super(popupSelector);
        this._popupPicture = this._popupElement.querySelector('.popup__picture');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(name, link) {
        super.open();
        this._popupPicture.src = link;
        this._popupPicture.alt = link;
        this._popupCaption.textContent = name;   
        
    }
}