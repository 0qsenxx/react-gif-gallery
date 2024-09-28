import styles from "./GifSearch.module.css";

const GifSearch = ({ getImagesByInput }) => (
  <header className={styles.Searchbar}>
    <form className={styles.SearchForm} onSubmit={getImagesByInput}>
      <input
        className={styles["SearchForm-input"]}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="searchbarInput"
      />
      <button type="submit" className={styles["SearchForm-button"]}>
        <span className={styles["SearchForm-button-label"]}>search</span>
      </button>
    </form>
  </header>
);

export default GifSearch;
