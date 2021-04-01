import Popup from './Popup.js'
export default class PopupWithForm extends Popup{
    constructor({popupSelector, formSubmitCallback}) {
        super(popupSelector);
        this.formSubmitCallback = formSubmitCallback;
    }

    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues;//возвращает объект с данными всех полей формы
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.formSubmitCallback(this._getInputValues());
            super.close();
        })

    }

    close() {
        super.close();
        this._form = this._popupElement.querySelector('.popup__container')
        this._form.reset();
    }

}

