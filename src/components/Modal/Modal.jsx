import styles from "./Modal.module.css";

const Modal = ({ imgSrc, closeModal }) => {
  const overlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={overlayClick}>
      <div className={styles.Modal}>
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
};

export default Modal;
