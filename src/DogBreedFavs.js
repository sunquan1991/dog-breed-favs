import React, { useState, useCallback } from 'react';
import { getSearchBreed } from "./dogAPI.js"
import styles from './DogBreedFavs.module.css';
import { capitalize } from "./utils"

const DogBreedFavs = () => {
  const [search, setSearch] = useState('hound');
  const [result, setResult] = useState('');
  const [favs, setFavs] = useState([]);

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const addBreedToFavs = useCallback((name, image) => {
    const breed = { name, image };
    const existingBreed = favs.find(b => breed.name === name);
    if (existingBreed) {
      setResult(`Breed "${capitalize(name)}" is already in your favorites.`)
    } else {
      setFavs(state => [...state, breed]);
      setResult(`Found and added breed "${capitalize(name)}".`)
    }
  }, [favs]);

  const handleSearchClick = useCallback(() => {
    getSearchBreed(search.toLowerCase(), addBreedToFavs, setResult);
  }, [search, addBreedToFavs]);

  return (
    <div className={styles.container}>
      <h1>Dog Breed Favorites</h1>

      <div className={styles.section}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className={styles.button}
          onClick={handleSearchClick}
        >
          Search for and Add a Breed
        </button>
      </div>

      <div className={styles.section}>
        <button className={styles.button}>Add a Random Breed</button>
      </div>

      <div className={styles.result}>{result}&nbsp;</div>

      <div className={styles.section}>
        <h2>Your Current Favorites</h2>
        {favs.length > 0
          ? favs.map(f =>
            <div className={styles.breed} key={f.name}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url("${f.image}")` }}
              />
              <h3 className={styles.breedName}>
                {f.name}
              </h3>
            </div>)
          : <span>Nothing here yet</span>
        }
      </div>
    </div>

  );
}

export default DogBreedFavs;
