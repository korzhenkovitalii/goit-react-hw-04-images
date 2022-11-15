import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from 'components/Searchbar/Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Input search!');
      return;
    }

    onSubmit(searchQuery);

    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
