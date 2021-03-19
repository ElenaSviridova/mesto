import FormValidator from './FormValidator.js'

import Card from './Card.js'

const elements = document.querySelector('.elements');
const formPopup = document.querySelector('.popup_edit');
const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const formElement = formPopup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_about-yourself');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImage = document.querySelector('.popup_image'); 
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');

  function openPopup(popup) {
    popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', closeByEscape);
  }//открываем попап

  function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', closeByEscape);
  }//закрываем попап

//функция закрытия по Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

const popups = document.querySelectorAll('.popup');

//устанавливаю обработчики для всех попапов 
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
           closePopup(popup) 
        }
    })
})

function editClick(popup) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popup);
    editFormValidator.clearValidation();
}//открываем попап,ставим в поля значения по умолчанию, очищаем от ошибок

const validationConfig = {
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function editSave (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    closePopup(formPopup);
}//сохраняем данные попапа

profileEditButton.addEventListener('click', () => {
    editClick(formPopup);
});

formElement.addEventListener('submit', editSave);


const formPopupAdd = document.querySelector('.popup_add');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddElement = formPopupAdd.querySelector('.popup__container');
const nameAddInput = formAddElement.querySelector('.popup__input_text_name');
const jobAddInput = formAddElement.querySelector('.popup__input_text_about-yourself');
const elementTitle = elements.querySelector('.element__title');
const elementImage = elements.querySelector('.element__image');

function clearInput() {
    nameAddInput.value = '';
    jobAddInput.value = '';
}//очищает поля 

function addClick(popup) {
  openPopup(popup);
  clearInput();
  addFormValidator.clearValidation();
}

function addSave (evt) {
    evt.preventDefault();
    const newCardDataSet = {
      name: nameAddInput.value,
      link: jobAddInput.value
    }
    const card = new Card(newCardDataSet,'.el-template', openPicture )
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
    closePopup(formPopupAdd);
    clearInput();
}

profileAddButton.addEventListener('click', () => {
    addClick(formPopupAdd);
});//Открываем попап для добавления карточек

formAddElement.addEventListener('submit', addSave);//Сохраняем данные кликом на кнопку "создать"

function   openPicture(name, link) { //принимает данные
  openPopup(popupImage);
  popupPicture.src = link;
  popupPicture.alt = link;
  popupCaption.textContent = name;
} 


initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.el-template', openPicture);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elements.prepend(cardElement);
}); 


const editFormValidator = new FormValidator(validationConfig, formElement);

editFormValidator.enableValidation();
  
const addFormValidator = new FormValidator(validationConfig, formAddElement);

addFormValidator.enableValidation();
