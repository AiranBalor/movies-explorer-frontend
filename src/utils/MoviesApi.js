import handleOriginalResponse from './utils.js';

export const getMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET", //метод можно убрать. проверить.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  })
    .then(handleOriginalResponse)
};
