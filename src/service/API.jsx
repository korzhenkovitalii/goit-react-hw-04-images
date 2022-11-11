import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '30192145-bc6bde8f91b5db4561ffa14da';
const PER_PAGE = 12;

export const fetchMovies = (page, search) => {
  return fetch(
    `${BASE_URL}?q=${search}&page=${page}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`We didn't find any images by request ${search}`)
    );
  });
};

fetchMovies.propTypes = {
  page: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
};