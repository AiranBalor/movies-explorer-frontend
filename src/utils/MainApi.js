import handleOriginalResponse from './utils.js';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(handleOriginalResponse)
      .then(data => {
        return data
      })
  }

  editProfile(name, email) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, email})
    })
      .then(handleOriginalResponse);
  }

  saveMovie(movieInfo) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movieInfo.country,
        director: movieInfo.director,
        duration: movieInfo.duration,
        year: movieInfo.year,
        description: movieInfo.description,
        image: movieInfo.image,
        trailer: movieInfo.trailer,
        nameRU: movieInfo.nameRU,
        nameEN: movieInfo.nameEN,
        thumbnail: movieInfo.thumbnail,
        movieId: movieInfo.movieId,
      })
    })
      .then(handleOriginalResponse);
  }

  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies/`, {
      headers: this.headers
    })
      .then(handleOriginalResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(handleOriginalResponse);
  }
}

export const api = new MainApi({
  baseUrl: 'https://api.korotkov.movies.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

//https://api.korotkov.movies.nomoredomains.work