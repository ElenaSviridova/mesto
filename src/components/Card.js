export default class Card {
    constructor(data, cardSelector, handleCardClick, userId, deleteSubmitCard, toggleLike, removeLike) {
        this._text = data.name;
        this._image = data.link;
        this._likes = data.likes.length;
        this._myLike = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._cardOwnerId = data.owner._id;
        this._deleteSubmitCard = deleteSubmitCard;
        this._toggleLike = toggleLike;
        this._removeLike = removeLike;
        this._cardId = data._id;
    }
    
    _setLike() {
        this._likeNumbers = this._element.querySelector('.element__like-numbers');
        this._setLikesCount(this._likes);
        this._updateLikeView();
    }

    _setLikesCount(likesCount) {
        this._likeNumbers.textContent = likesCount;
    }

    _getTemplateCard() {
        const elementTemplate = document.querySelector(this._cardSelector).content
        const cardElement = elementTemplate
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplateCard();
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._titleElement = this._element.querySelector('.element__title');
        this._imageElement = this._element.querySelector('.element__image');
        this._imageElement.src = this._image;
        this._titleElement.textContent = this._text;
        this._setLike();
        this._addDeleteButton();
        this._setEventListeners();
        return this._element;
    }

    _addDeleteButton() {
        if (this._isCardOwner()) {
            this._deleteButton.classList.add('element_visible');
        }
    }

    _isCardOwner() {
        return (this._cardOwnerId === this._userId);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click',() => {
           if (this._checkLikeId()) {
            this._removeLike()
           }
           else {
               this._toggleLike();
           } 
        });      
        this._deleteButton.addEventListener('click', this._deleteSubmitCard);
        this._imageElement.addEventListener('click', this._handleCardClick);
      } 

    
    deleteCard() {
            this._element.remove();
            this._element = null;
    }

    handleLikes(data) {
        this._myLike = data.likes;
        this._setLikesCount(this._myLike.length);
        this._updateLikeView();
    }
      
    _checkLikeId() {
        return this._myLike.find(el => el._id === this._userId)
    }

    _updateLikeView() {
        if (this._checkLikeId()) {
            this._likeButton.classList.add('element__like_active');
        }
        else {
            this._likeButton.classList.remove('element__like_active');
        }
        
            }
               
}
