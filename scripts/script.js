let formPopup = document.querySelector('.popup');

let formPopupContainer = document.querySelector('.popup__container');

let popupCloseIcon = formPopupContainer.querySelector('.popup__close-icon');

let profileInfo = document.querySelector('.profile__info');

let profileEditButton = profileInfo.querySelector('.profile__edit-button');

function showClick() {
    let formPopup = document.querySelector('.popup');
    formPopup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', showClick);

function closeClick() {
    let formPopup = document.querySelector('.popup');
    formPopup.classList.remove('popup_opened');
}

popupCloseIcon.addEventListener('click', closeClick);

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about-yourself');
let profileTitle = profileInfo.querySelector('.profile__title');

nameInput.value = profileTitle.textContent;

let profileSubtitle = profileInfo.querySelector('.profile__subtitle');

jobInput.value = profileSubtitle.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    closeClick();
}

formElement.addEventListener('submit', formSubmitHandler);
