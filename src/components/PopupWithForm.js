import Popup from './Popup.js'
export default class PopupWithForm extends Popup{
    constructor({popupSelector, formSubmitCallback, renderLoading}) {
        super(popupSelector);
        this.formSubmitCallback = formSubmitCallback;
        this._renderLoading = renderLoading;
        this._popupButton = this._popupElement.querySelector('.popup__button')
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
            this._renderLoading(true, this._popupButton);
            this.formSubmitCallback(this._getInputValues());
        })

    }

    close() {
        super.close();
        this._form = this._popupElement.querySelector('.popup__container');
        this._form.reset();
    }

    setButtonName(newName) {
        this._popupButton.textContent = newName;
    }

}

