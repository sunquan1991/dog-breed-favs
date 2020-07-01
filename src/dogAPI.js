import { capitalize } from "./utils"

const BASE_URL = 'https://dog.ceo/api';
const CONNECTION_ERROR_MESSAGE = 'There might be something wrong with the database or your internet.'

const getSearchBreed = (name, cb, rcb) => {
  fetch(`${BASE_URL}/breed/${name}/images/random`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        cb(name, data.message)
      } else {
        rcb(`Breed "${capitalize(name)}" cannot be found. Please enter a valid breed name.`);
      }
    })
    .catch(err => {
      if (err.code === 404) {
      } else {
        rcb(CONNECTION_ERROR_MESSAGE);
      }
    });
}

const getBreedList = (l, cb) => {
  fetch(`${BASE_URL}/breeds/list/all`)
    .then(res => res.json())
    .then(data => {
      l.push(...Object.keys(data.message));
    })
    .catch(err => {
      if (err.code === 404) {
      } else {
        cb(CONNECTION_ERROR_MESSAGE);
      }
    });
}

const getRandomBreed = (name, cb, rcb) => {
  fetch(`${BASE_URL}/breed/${name}/images/random`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        cb(name, data.message)
      } else {
        rcb(`Breed "${capitalize(name)}" cannot be found. Please verify your input`);
      }
    })
    .catch(err => {
      if (err.code === 404) {
      } else {
        rcb(CONNECTION_ERROR_MESSAGE);
      }
    });
}

export { getSearchBreed, getBreedList, getRandomBreed }
