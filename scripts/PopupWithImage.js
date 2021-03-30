import Popup from './Popup.js'
export default class PopupWithImage extends Popup{
    constructor({popupSelector}) {
        super(popupSelector);
    }

    open(name, link) {
        super.open();
        this._popupPicture = this._popupElement.querySelector('.popup__picture');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
        this._popupPicture.src = link;
        this._popupPicture.alt = link;
        this._popupCaption.textContent = name;   
        
    }
}