import Popup from './Popup.js'
export default class PopupDelete extends Popup {
    constructor({popupSelector, handleSubmitCallback}) {
        super(popupSelector);
        this._handleSubmitCallback = handleSubmitCallback;
        this._popupButton = this._popupElement.querySelector('.popup__button')
    }

    setSubmitAction(action) {
        this._handleSubmitCallback = action;
      }

      setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback()
        })

    }  
}