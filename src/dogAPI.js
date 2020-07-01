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

export { getSearchBreed }
