import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from 'components/imageGallery/ImageGallery.module.css';
class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const { images, onSelect } = this.props;

    return (
      <ul className={css.imageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onSelect={() => onSelect(largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
