import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/modal/Modal.module.css';
class ModalComponent extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    selectedImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.selectedImage} alt="" />
        </div>
      </div>
    );
  }
}

export default ModalComponent;
