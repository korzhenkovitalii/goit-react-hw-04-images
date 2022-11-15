import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ imageForModal, onClickModal }) => {
  useEffect(() => {
    const handelKeyDown = e => {
      if (e.code === 'Escape') {
        onClickModal();
      }
    };
    window.addEventListener('keydown', handelKeyDown);

    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, [onClickModal]);

  const handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClickModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handelBackdropClick}>
      <div className={css.modal}>
        <img src={imageForModal} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageForModal: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
};
