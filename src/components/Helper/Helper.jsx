import PropTypes from 'prop-types';

export const Helper = images => {
  return images.map(({ largeImageURL, id, webformatURL }) => ({
    largeImageURL,
    id,
    webformatURL,
  }));
};

Helper.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
