export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._buttonSelector = this._formSelector.querySelector(this._submitButtonSelector);
        
    }
    _showInputError(inputSelector, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputSelector) {
        const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector,inputSelector.validationMessage);
          } else {
            this._hideInputError(inputSelector);
          }
    }

    _setEventListeners() {
       this._toggleButtonState();
         this._inputList.forEach((inputSelector) => {
            this._hideInputError(inputSelector)
             inputSelector.addEventListener('input', () => {
                this._checkInputValidity(inputSelector);
                this._toggleButtonState();
             })
         })
    }

    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid;
          });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonSelector.classList.add(this._inactiveButtonClass)
            this._buttonSelector.setAttribute('disabled', 'disabled')
          }
          else {
            this._buttonSelector.classList.remove(this._inactiveButtonClass)
            this._buttonSelector.removeAttribute('disabled', 'disabled')
          }
    }

    clearValidation() {
        this._inputList.forEach((inputSelector) => {
                this._hideInputError(inputSelector);
                this._toggleButtonState();
        })    
    }

    enableValidation() {
          this._formSelector.addEventListener('submit', function (evt) {
            evt.preventDefault();
          });
          
         this._setEventListeners();
    }
}

