let formPopup = document.querySelector('.popup');
console.log(formPopup.className);
let formPopupContainer = document.querySelector('.popup__container');
console.log(formPopupContainer.className);
let popupCloseIcon = formPopupContainer.querySelector('.popup__close-icon');
console.log(popupCloseIcon.className);
let profileInfo = document.querySelector('.profile__info');
console.log(profileInfo.className);
let profileEditButton = profileInfo.querySelector('.profile__edit-button');
console.log(profileEditButton.className);
function showClick() {
    let formPopup = document.querySelector('.popup');
    formPopup.classList.add('popup_opened');
    console.log(formPopup.className);
}

profileEditButton.addEventListener('click', showClick);

function closeClick() {
    let formPopup = document.querySelector('.popup');
    formPopup.classList.remove('popup_opened');
    console.log(formPopup.className);
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
    console.log(formSubmitHandler);
    closeClick();
}

formElement.addEventListener('submit', formSubmitHandler);
