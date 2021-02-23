//функция показывающая элемент ошибки
const showInputError = (formSelector, inputSelector, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
  
  //функция скрывает элемент ошибки
  const hideInputError = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }
  //проверяем на валидность поля формы, если не валидно - показываем ошибку, валидно - скрываем
  const checkInputValidity = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formSelector, inputSelector, inputErrorClass, errorClass);
    }
  }
  
  //функция которая навешивает слушатели на поля ввода
  const setEventListeners = (formSelector, inputSelector,submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonSelector = formSelector.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonSelector, inactiveButtonClass);
  inputList.forEach((inputSelector) => {
    hideInputError(formSelector, inputSelector, inputErrorClass, errorClass)
  })
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonSelector, inactiveButtonClass);
      })
    })
  }
  
  //функция проверяющая что есть хотя бы одно не валидное поле ввода
  function hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
      
    });
  }
  
  
  //функция добавляющая кнопке сабмита статус неактивности если хотя бы одно поле не валидно
  function toggleButtonState(inputList, buttonSelector, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      buttonSelector.classList.add(inactiveButtonClass)
      buttonSelector.setAttribute('disabled', 'disabled')
    }
    else {
      buttonSelector.classList.remove(inactiveButtonClass)
      buttonSelector.removeAttribute('disabled', 'disabled')
    }
  }
  
  
  const enableValidation = ({formSelector,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formSelector,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass);
    });
  }; //Вызов функции происходит при навешивании слушателя с кликом на попапы
  
  
  //функция закрывающая попапы по клику на оверлэй
  function overlayClosePopup(evt) {
    if (evt.target === evt.currentTarget) {
      evt.preventDefault();
      togglePopup(evt.target);
    }
  }
  //вешаю слушатели на все попапы
      const popupList = Array.from(document.querySelectorAll('.popup'));
      popupList.forEach((popup) => {
      popup.addEventListener('click', overlayClosePopup)
    })
  