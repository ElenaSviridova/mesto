export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputElement = config.inputElement;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
        this._buttonSelector = this._formElement.querySelector(this._submitButtonSelector);
        
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement,inputElement.validationMessage);
          } else {
            this._hideInputError(inputElement);
          }
    }

    _setEventListeners() {
       this._toggleButtonState();
         this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
             })
         })
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
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
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
                
        })    
    }

    enableValidation() {
          this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
          });
          
         this._setEventListeners();
    }
}

