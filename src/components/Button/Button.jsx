import css from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, clickHandler }) => {
  return (
    <button className={css.button} type="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};