import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/imageGalleryItem/ImageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.onSelect(this.props.largeImageURL);
  };

  render() {
    const { webformatURL, tags } = this.props;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImg}
          src={webformatURL}
          alt={tags}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
