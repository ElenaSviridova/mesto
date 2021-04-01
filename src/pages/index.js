import './index.css'

import FormValidator from '../components/FormValidator.js'

import Card from '../components/Card.js'

import Section from '../components/Section.js'

import PopupWithForm from '../components/PopupWithForm.js'

import PopupWithImage from '../components/PopupWithImage.js'

import UserInfo from '../components/UserInfo.js'

import initialCards from '../components/initial-cards.js'

const elements = document.querySelector('.elements');
const formPopup = document.querySelector('.popup_edit');
const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const formElement = formPopup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_about-yourself');

const validationConfig = {
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formPopupAdd = document.querySelector('.popup_add');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddElement = formPopupAdd.querySelector('.popup__container');

const popupOpenImage = new PopupWithImage({popupSelector:'.popup_image'});
popupOpenImage.setEventListeners();

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '.el-template', () => {
    popupOpenImage.open(item.name,item.link)});
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}}, '.elements')

cardList.renderItems();

const editFormValidator = new FormValidator(validationConfig, formElement);

editFormValidator.enableValidation();
  
const addFormValidator = new FormValidator(validationConfig, formAddElement);

addFormValidator.enableValidation();

//создаем класс, отвечающий за управлением отоброжения информации о пользователе
const ourUser = new UserInfo({nameSelector:'.profile__title', aboutYourselfSelector: '.profile__subtitle'});
//создаем класс для попапа с информацией о пользователе
const popupProfile = new PopupWithForm({popupSelector:'.popup_edit', formSubmitCallback: (values) => {
    ourUser.setUserInfo({name:values.Author, job: values.Profile}) //принимает новые данные и добавляет на страницу
  }
});
popupProfile.setEventListeners();

//вешаем слушатель на кнопку открытия попапа профиля
profileEditButton.addEventListener('click', () => {
       popupProfile.open();
       const userInfo = ourUser.getUserInfo();//возвращает объект с данными пользователя
       nameInput.value = userInfo.name;
       jobInput.value = userInfo.profession;//вставляет данные в форму
       editFormValidator.clearValidation();
   });

//создаем класс для попапа добавления карточки
const popupAddCard = new PopupWithForm({popupSelector:'.popup_add', formSubmitCallback: () => {
  const addInputValues = popupAddCard._getInputValues();//возвращает объект с данными всех полей формы
  const newCardDataSet = {
    name: addInputValues.Name,
    link: addInputValues.Link
  }
  const card = new Card(newCardDataSet,'.el-template', () => {
    popupOpenImage.open(item.name,item.link)});
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  popupAddCard.close();}
});   
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', () => {
  popupAddCard.open();
  addFormValidator.clearValidation();
});
