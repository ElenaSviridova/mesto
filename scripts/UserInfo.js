export default class UserInfo {
    constructor({nameSelector, aboutYourselfSelector}) {
        this._title = document.querySelector(nameSelector);
        this._subtitle = document.querySelector(aboutYourselfSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._title.textContent;
        this._userInfo.profession = this._subtitle.textContent;
        return this._userInfo;//возвращает объект с данными пользователя
    }

    setUserInfo({name, job}) {
    //     const myInputValues = popupProfile._getInputValues();
    //     profileTitle.textContent= myInputValues.Author;
    //  profileSubtitle.textContent=myInputValues.Profile;
        this._title.textContent = name;
        this._subtitle.textContent = job;//принимает новые данные и добавляет на страницу

    }

}