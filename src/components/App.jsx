import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Helper } from 'components/Helper/Helper';
import 'react-toastify/dist/ReactToastify.css';

//Components
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchMovies } from '../service/API';

//Styles App
import css from 'components/App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageForModal, setImageForModal] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!search) {
      return;
    }
    setStatus('pending');
    fetchMovies(page, search)
      .then(images => {
        if (images.total === 0) {
          setStatus('idle');
          return alert(`Sorry,nothing found for request '${search}'`);
        }
        setImages(state => [...state, ...Helper(images.hits)]);
        setStatus('resolved');
      })
      .catch(error => (setError(error), setStatus('rejected')));
  }, [search, page]);

  //Получение инпута в стейт App
  const handleFormSubmit = searchQuery => {
    setSearch(searchQuery);
    setPage(1);
    setImages([]);
  };

  //Откр и закр модалки и запись в стейт картинки для модалки
  const toggleModal = largeImageUrl => {
    setShowModal(!showModal);
    setImageForModal(largeImageUrl);
  };

  //Показать больше картинок
  const showMoreImages = () => {
    setPage(page + 1);
  };

  if (status === 'idle') {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <div>Введите запрос</div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} toggleModal={toggleModal} />
        <Loader />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <h1>{error.message}</h1>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit} />

        <ImageGallery images={images} toggleModal={toggleModal} />
        {showModal && (
          <Modal imageForModal={imageForModal} onClickModal={toggleModal} />
        )}

        {!(images.length < 12) && (
          <Button text="Show more" clickHandler={showMoreImages} />
        )}

        <ToastContainer autoClose={2000} />
      </div>
    );
  }
};

export default App;
