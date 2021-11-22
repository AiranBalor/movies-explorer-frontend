import handleOriginalResponse from "./utils";

class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  register = (name, email, password) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  authorize = (email, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  getContent = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data;
      })
  }
}

export const auth = new Auth({
  baseUrl: 'https://api.korotkov.movies.nomoredomains.work',
})
