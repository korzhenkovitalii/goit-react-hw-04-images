import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Searchbar from 'components/Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchMovies } from '../service/API';

//Styles App
import css from 'components/App.module.css';

class App extends React.Component {
  state = {
    search: '',
    page: 1,
    images: [],
    showModal: false,
    imageForModal: null,
    error: null,
    status: 'idle',
  };

  //Загрузка страницы по поиску
  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetchMovies(page, search)
        .then(images => {
          //Если по запросу ничего не найдено

          if (images.total === 0) {
            this.setState({ status: 'idle' });
            return alert(`Sorry,nothing found for request '${search}'`);
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  //Получение инпута в стейт App
  handleFormSubmit = searchQuery => {
    this.setState({ search: searchQuery, page: 1, images: [] });
  };

  //Откр и закр модалки и запись в стейт картинки для модалки
  toggleModal = largeImageUrl => {
    this.setState(({ showModal, imageForModal }) => ({
      showModal: !showModal,
      imageForModal: largeImageUrl,
    }));
  };

  //Показать больше картинок
  showMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, showModal, imageForModal } = this.state;
    console.log(images);
    if (status === 'idle') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <div>Введите запрос</div>
          <ToastContainer autoClose={2000} />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />
          <ImageGallery images={images} toggleModal={this.toggleModal} />
          <ToastContainer autoClose={2000} />
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <h1>{error.message}</h1>
          <ToastContainer autoClose={2000} />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div className={css.app}>
          <Searchbar onSubmit={this.handleFormSubmit} />

          <ImageGallery
            images={this.state.images}
            toggleModal={this.toggleModal}
          />
          {showModal && (
            <Modal
              imageForModal={imageForModal}
              onClickModal={this.toggleModal}
            />
          )}

          {!(images.length < 12) && (
            <Button text="Show more" clickHandler={this.showMoreImages} />
          )}

          <ToastContainer autoClose={2000} />
        </div>
      );
    }
  }
}

export default App;
