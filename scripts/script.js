let formPopup = document.querySelector('.popup_edit');
let formPopupContainer = document.querySelector('.popup__container');
let popupCloseIcon = formPopupContainer.querySelector('.popup__close-icon');
let profileInfo = document.querySelector('.profile__info');
let profileEditButton = profileInfo.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_text_name');
let jobInput = formElement.querySelector('.popup__input_text_about-yourself');
let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');


function togglePopup(popup) {
    popup.classList.toggle('popup_opened');   
}//открываем закрываем попап

function editClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    togglePopup(formPopup);
}//ставим в поля значения по умолчанию

function editSave (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    togglePopup(formPopup);
}//сохраняем данные попапа

profileEditButton.addEventListener('click', () => {
    editClick(formPopup);
});
popupCloseIcon.addEventListener('click', () => {
    togglePopup(formPopup);
});
formElement.addEventListener('submit', editSave);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

        //создаем карточку
        function createCard(cardLink, cardName) {
          let cardElement = elementTemplate.querySelector('.element').cloneNode(true);
          cardElement.querySelector('.element__image').src = cardLink;
          cardElement.querySelector('.element__title').textContent = cardName;

          const likeButton = cardElement.querySelector('.element__like');
            //вешаем слушатель на лайк
          likeButton.addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle('element__like_active');
          });
          elements.prepend(cardElement);

          const deleteButton = document.querySelector('.element__delete');
          
          deleteButton.addEventListener('click', function () {
            const listElement = deleteButton.closest('.element');
            listElement.remove();
          }); //Удаление карточки кликом на корзину

          const elementImage = cardElement.querySelector('.element__image');
          const elementText = cardElement.querySelector('.element__title');

          elementImage.addEventListener('click', () => {
              openPicture(elementImage, elementText);
          })//вешаем слушатель накартинку карточки
        };

initialCards.forEach(item => {
    createCard(item.link, item.name)
}); //применяем функцию создания карточек на каждый элемент из массива initialCards

const popupImage = document.querySelector('.popup_image'); 
const closeButtonImage = popupImage.querySelector('.popup__close-button');

function openPicture(image, text) {  
    togglePopup(popupImage);
    popupImage.querySelector('.popup__picture').src = image.src;
    popupImage.querySelector('.popup__picture').alt = image.alt;
    popupImage.querySelector('.popup__caption').textContent = text.textContent;
}        

closeButtonImage.addEventListener('click', () => {
    togglePopup(popupImage)
}); 

let formPopupAdd = document.querySelector('.popup_add');
let formPopupAddContainer = formPopupAdd.querySelector('.popup__container');
let popupAddCloseIcon = formPopupAddContainer.querySelector('.popup__close-icon');
let profileAddButton = document.querySelector('.profile__add-button');
let formAddElement = formPopupAdd.querySelector('.popup__container');
let nameAddInput = formAddElement.querySelector('.popup__input_text_name');
let jobAddInput = formAddElement.querySelector('.popup__input_text_about-yourself');
let elementTitle = elements.querySelector('.element__title');
let elementImage = elements.querySelector('.element__image');

function clearInput() {
    nameAddInput.value = '';
    jobAddInput.value = '';
}//очищает поля 

function addSave (evt) {
    evt.preventDefault();
    createCard(jobAddInput.value,nameAddInput.value);
    togglePopup(formPopupAdd);
    clearInput();
}

profileAddButton.addEventListener('click', () => {
    togglePopup(formPopupAdd);
});//Открываем попап для добавления карточек


popupAddCloseIcon.addEventListener('click',  () => {
    togglePopup(formPopupAdd);
    clearInput();
});//Закрываем попап для добавления карточек кликом на крестик


formAddElement.addEventListener('submit', addSave);//Сохраняем данные кликом на кнопку "создать"

