const formPopup = document.querySelector('.popup_edit');
const formPopupContainer = document.querySelector('.popup__container');
const popupCloseIcon = formPopupContainer.querySelector('.popup__close-icon');
const profileInfo = document.querySelector('.profile__info');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_text_name');
const jobInput = formElement.querySelector('.popup__input_text_about-yourself');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.popup_image'); 
const closeButtonImage = popupImage.querySelector('.popup__close-button');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');

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
          const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
          const elementImage = cardElement.querySelector('.element__image');
          const elementText = cardElement.querySelector('.element__title');
          elementImage.src = cardLink;
          elementText.textContent = cardName;

          const likeButton = cardElement.querySelector('.element__like');
            //вешаем слушатель на лайк
          likeButton.addEventListener('click', function (evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle('element__like_active');
          });

          const deleteButton = cardElement.querySelector('.element__delete');
          
          deleteButton.addEventListener('click', function () {
            const listElement = deleteButton.closest('.element');
            listElement.remove();
          }); //Удаление карточки кликом на корзину


          elementImage.addEventListener('click', () => {
              openPicture(cardLink, cardName);
          })//вешаем слушатель накартинку карточки
          return cardElement;
        };

initialCards.forEach(item => {
    elements.prepend(createCard(item.link, item.name));
}); //применяем функцию создания карточек на каждый элемент из массива initialCards



function openPicture(image, text) {  
    togglePopup(popupImage);
    popupPicture.src = image;
    popupPicture.alt = image;
    popupCaption.textContent = text;
}        

closeButtonImage.addEventListener('click', () => {
    togglePopup(popupImage)
}); 

const formPopupAdd = document.querySelector('.popup_add');
const formPopupAddContainer = formPopupAdd.querySelector('.popup__container');
const popupAddCloseIcon = formPopupAddContainer.querySelector('.popup__close-icon');
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

function addSave (evt) {
    evt.preventDefault();
    elements.prepend(createCard(jobAddInput.value,nameAddInput.value));
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

