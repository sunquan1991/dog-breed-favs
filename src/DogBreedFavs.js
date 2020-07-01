import React from 'react';
import styles from './DogBreedFavs.module.css';

const DogBreedFavs = () => {
  return (
    <div className={styles.container}>
      <h1>Dog Breed Favorites</h1>

      <div className={styles.section}>
        <input type="text" />
        <button className={styles.button}>Search for and add a Breed</button>
      </div>

      <div className={styles.section}>
        <button className={styles.button}>Add a Random Breed</button>
      </div>

      <div className={styles.section}>
      </div>
    </div>

  );
}

export default DogBreedFavs;
