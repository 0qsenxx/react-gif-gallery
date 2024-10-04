import styles from './Button.module.css'

const Button = ({ loadMoreFn }) => (
  <button type="button" className={styles.Button} onClick={loadMoreFn}>
    Load more
  </button>
);

export default Button;
