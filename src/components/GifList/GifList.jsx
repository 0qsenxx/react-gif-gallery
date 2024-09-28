import styles from "./GifList.module.css";

const GifList = ({ gifs, getGifSrcForModal }) => (
  <ul className={styles.GifGallery}>
    {gifs.map((gif) => (
      <li className={styles.GifGalleryItem} key={gif.id}>
        <img
          src={gif.images.original.url}
          alt={gif.alt_text}
          className={styles["GifGalleryItem-image"]}
          onClick={getGifSrcForModal}
        />
      </li>
    ))}
  </ul>
);

export default GifList;
