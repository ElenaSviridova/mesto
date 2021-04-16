export default class UserInfo {
    constructor({nameSelector, aboutYourselfSelector, avatarSelector}) {
        this._title = document.querySelector(nameSelector);
        this._subtitle = document.querySelector(aboutYourselfSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._title.textContent;
        this._userInfo.profession = this._subtitle.textContent;
        return this._userInfo;//возвращает объект с данными пользователя
    }

    setUserInfo({name, job}) {
        this._title.textContent = name;
        this._subtitle.textContent = job;//принимает новые данные и добавляет на страницу
    }

    loadImage(imageUrl) {
          const image = this._avatarSelector;
          image.src = imageUrl;
    }
}