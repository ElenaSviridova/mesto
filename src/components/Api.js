export default class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token;
    }

    getProfileInfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
          .then((data) => {
            return data
          })  
        }

    changeProfileInfo(profileName, profileAbout) {
        return fetch(`${this._adress}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              name: profileName,
              about: profileAbout
            })
        })
        .then(response => response.ok
            ? console.log(response.json())
            : Promise.reject(`Ошибка${response.status}`))
    }

    getInitialCards() {
        return  fetch(`${this._adress}/cards`,{
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    addCards(data) {
        return fetch(`${this._adress}/cards`, {
            method: 'POST',
            headers: {
                authorization:this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(response => response.ok
            ? response.json()
            : Promise.reject(`Ошибка${response.status}`))
    }

    removeCards(id) {
        return  fetch(`${this._adress}/cards/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => response.ok
            ? response.json()
            : Promise.reject(`Ошибка${response.status}`))  
    }

    setLike(cardId) {
        return fetch(`${this._adress}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization:this._token,
            }
        })    
        .then(response => response.ok
            ? response.json()
            : Promise.reject(`Ошибка${response.status}`))
    }

    deleteLike(cardId) {
        return fetch(`${this._adress}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization:this._token
            }
        })
        .then(response => response.ok
            ? response.json()
            : Promise.reject(`Ошибка${response.status}`))
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              avatar: avatarLink
            })
        })
        .then(response => response.ok
            ? response.json()
            : Promise.reject(`Ошибка${response.status}`))
    }
}

//создать класс
//вызвать метод с 