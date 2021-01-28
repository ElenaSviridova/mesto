let formPopup = document.querySelector('.popup');
let formPopupContainer = document.querySelector('.popup__container');
let popupCloseIcon = formPopupContainer.querySelector('.popup__close-icon');
let profileInfo = document.querySelector('.profile__info');
let profileEditButton = profileInfo.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_text_name');
let jobInput = formElement.querySelector('.popup__input_text_about-yourself');
let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');

function saveClick() {
    formPopup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closeClick() {
    formPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    closeClick();
}

profileEditButton.addEventListener('click', saveClick);
popupCloseIcon.addEventListener('click', closeClick);
formElement.addEventListener('submit', formSubmitHandler);
