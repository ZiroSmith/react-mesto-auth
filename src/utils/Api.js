export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

   //обработка запроса
   _checkRequest(url, options) {
    const fetchAddress = `${this._baseUrl}/${url}`

    return fetch(fetchAddress, options).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }


  //Метод для запроса информации о пользователе с сервера
  getUserInfo() {
    return this._checkRequest(`users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  //Метод для загрузки массива карточек с сервера
  getInitialCards() {
    return this._checkRequest(`cards`, {
      headers: this._headers
    }
    )
  }

  //Метод для редактирования информации в профиле
  editUserInfo({ name, about }) {
    return this._checkRequest(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
  }

  //Метод для изменения аватара пользователя
  editAvatar(data){
    return this._checkRequest(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: this._headers
    })
  }

  //Метод для добавления новой карточки (отправляет данные на сервер)
  addCard(data) {
    return this._checkRequest(`cards`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this._headers,
    })
  }

  ///Метод для удаления карточки (запрашивает удаление данных с сервера)
  removeCard(cardId) {
    return this._checkRequest(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //Метод для добавления Like на карточке (запрашивает изменение данных на сервере)
  addLike(cardId) {
    return this._checkRequest(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

   //Метод для удаления Like на карточке (запрашивает изменение данных на сервере)
  deleteLike(cardId) {
    return this._checkRequest(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //Метод-переключатель лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId)
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '15675c85-a31a-4d79-a966-1f79c69a2b3e',
    'Content-Type': 'application/json'
  }
}
);

