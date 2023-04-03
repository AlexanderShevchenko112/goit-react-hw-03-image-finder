import PropTypes from 'prop-types';
import css from 'components/button/Button.module.css';
const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.loadmoreBtn} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
