import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';

class Modal extends React.Component {
  static propTypes = {
    imageForModal: PropTypes.string.isRequired,
    onClickModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClickModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handelBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.imageForModal} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
