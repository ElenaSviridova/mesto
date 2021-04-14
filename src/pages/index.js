import './index.css'

import FormValidator from '../components/FormValidator.js'

import Card from '../components/Card.js'

import Section from '../components/Section.js'

import PopupWithForm from '../components/PopupWithForm.js'

import PopupWithImage from '../components/PopupWithImage.js'

import UserInfo from '../components/UserInfo.js'

import Popup from '../components/Popup.js'

import Api from '../components/Api.js'


const elements = document.querySelector('.elements');
const formPopup = document.querySelector('.popup_edit');
const saveEditButton = formPopup.querySelector('.popup__button')
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar-image');
const profileAvatarIcon = document.querySelector('.profile__avatar-hover');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const formElement = formPopup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_about-yourself');
const formAvatar = document.querySelector('.popup_avatar');
const formDelete = document.querySelector('.popup_delete-card');
const deletePopupButton = formDelete.querySelector('.popup__button');
const formPopupAdd = document.querySelector('.popup_add');
const profileAddButton = document.querySelector('.profile__add-button');
const formAddElement = formPopupAdd.querySelector('.popup__container');

const validationConfig = {
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editFormValidator = new FormValidator(validationConfig, formElement);

editFormValidator.enableValidation();
  
const addFormValidator = new FormValidator(validationConfig, formAddElement);

addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, formAvatar);

avatarFormValidator.enableValidation();

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
}

function createCard(item) {
  const card = new Card(item, '.el-template', () => {
    popupOpenImage.open(item.name,item.link)}, myUserObjToTest, (evt) => {
      popupDelete.open();
      evt.preventDefault();
      console.log(item)
      api.removeCards(item._id)//отправляем запрос удаления на сервер
      .then((res) => {
        console.log(res);
        card.deleteCard();
        popupDelete.close();
        })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    }, () => {
      api.setLike(item._id)//запрос при постановке лайка
      .then((res) => {
        console.log('our array on set:', res)
        card.handleLikes(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    }, () => {
      api.deleteLike(item._id)//запрос при удалении лака
      .then((res) => {
        console.log('our array on del:', res)

        card.handleLikes(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    });
  return card
}


const popupDelete = new Popup ('.popup_delete-card');
popupDelete.setEventListeners();

const popupOpenImage = new PopupWithImage({popupSelector:'.popup_image'});
popupOpenImage.setEventListeners();

//создаем класс, отвечающий за управлением отоброжения информации о пользователе
const ourUser = new UserInfo({nameSelector:'.profile__title', aboutYourselfSelector: '.profile__subtitle', avatarSelector: '.profile__avatar-image'});

const api = new Api({adress:'https://mesto.nomoreparties.co/v1/cohort-22', token:'3df83bef-b96a-43f8-aaa6-dee5c669d99f'});

let myUserObjToTest

Promise.all([api.getInitialCards(), api.getProfileInfo()])
.then(([cards, userData]) => {
  myUserObjToTest = userData._id;//сохраняю в переменную мой id
  ourUser.loadImage(userData.avatar);//выгружаю и вставляю картинку профиля
  profileTitle.textContent = userData.name;//выгружаю и вставляю имя профиля
  profileSubtitle.textContent = userData.about; //выгружаю и вставляю описание профиля
  const cardList = new Section({items: cards, renderer: (item) => { 
    createCard(item);
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }}, '.elements')
  
  cardList.renderItems()
  
})

.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

//создаем класс для попапа с информацией о пользователе
const popupProfile = new PopupWithForm({popupSelector:'.popup_edit', formSubmitCallback: (values) => {
    ourUser.setUserInfo({name:values.Author, job: values.Profile}) //принимает новые данные и добавляет на страницу
    api.changeProfileInfo(values.Author, values.Profile)
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }, renderLoading
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
  api.addCards(newCardDataSet)
  .then((newCard) => {
    createCard(newCard);
    const card = createCard(newCard);
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}, renderLoading
});   
popupAddCard.setEventListeners();
profileAddButton.addEventListener('click', () => {
  popupAddCard.open();
  addFormValidator.clearValidation();
});


//создаем класс для попапа обновления аватара
const popupAvatar = new PopupWithForm({popupSelector:'.popup_avatar', formSubmitCallback: (values) => {
  api.updateAvatar(values.Link)
  .then((res) => {
    ourUser.loadImage(res.avatar)
    popupAvatar.close();
  })
  .catch(() => {
    console.error('Всё идёт не по плану.');
  });
}, renderLoading})
popupAvatar.setEventListeners();

profileAvatarIcon.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.clearValidation();
})