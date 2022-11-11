import { PropTypes } from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onClickItem,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItem_image}
        id={id}
        src={webformatURL}
        onClick={() => onClickItem(largeImageURL)}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickItem: PropTypes.func.isRequired,
};