import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { getSearchBreed, getBreedList, getRandomBreed } from "./dogAPI.js"
import styles from './DogBreedFavs.module.css';
import { capitalize } from "./utils"

let breedList = [];

const DogBreedFavs = () => {
  const [search, setSearch] = useState('hound');
  const [result, setResult] = useState('');
  const [favs, setFavs] = useState([]);

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const addBreedToFavs = useCallback((name, image) => {
    const breed = { name, image };
    setFavs(state => {
      const existingBreed = state.find(b => b.name === name);
      if (existingBreed) {
        setResult(`Breed "${capitalize(name)}" is already in your favorites.`);
        return state;
      } else {
        setResult(`Found and added breed "${capitalize(name)}".`);
        return [...state, breed]
      }
    });
  }, []);

  const handleSearchClick = useCallback(() => {
    getSearchBreed(search.toLowerCase(), addBreedToFavs, setResult);
  }, [search, addBreedToFavs]);

  useEffect(() => {
    getBreedList(breedList, setResult)
  }, [])

  const notYetAddedBreeds = useMemo(() => {
    const addedBreeds = favs.map(f => f.name)
    return breedList.filter(name => !addedBreeds.includes(name))
  }, [favs])

  const handleRandomClick = useCallback(() => {
    // Should not use the random endpoint of Dog API, because in this way,
    // if the breed is already in the favorites, another request needs to be
    // sent in order to get a unique breed. This is very inefficient and will
    // result in infinite cycle when all breeds are added to the favorites.
    // Instead, figure out the random breed name to request within React
    const index = Math.floor(Math.random() * notYetAddedBreeds.length);
    const name = notYetAddedBreeds[index];
    getRandomBreed(name, addBreedToFavs, setResult)
  }, [notYetAddedBreeds, addBreedToFavs])

  const removeBreed = useCallback((name) => {
    setFavs(state => state.filter(b => b.name !== name))
  }, [])

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
        <button
          className={styles.button}
          onClick={handleRandomClick}
        >
          Add a Random Breed
        </button>
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
              <button onClick={removeBreed.bind(null, f.name)}>Remove</button>
            </div>)
          : <span>Nothing here yet</span>
        }
      </div>
    </div>

  );
}

export default DogBreedFavs;
