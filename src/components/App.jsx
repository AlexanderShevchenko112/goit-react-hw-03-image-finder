import { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import ModalComponent from 'components/modal/Modal';
import { getImages } from 'Helpers/fetch';
import css from 'components/app.module.css';
class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    status: 'idle',
    selectedImage: null,
    isShowModal: false,
    isShowLoadmore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    getImages(searchQuery, currentPage)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isShowLoadmore:
            this.state.currentPage < Math.ceil(images.totalHits / 12),
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  createSearchQuerry = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      currentPage: 1,
      status: 'pending',
    });
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  onSelectImage = largeImageURL => {
    this.setState({ selectedImage: largeImageURL, isShowModal: true });
  };

  handleLoadmore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      })
    );
  };

  render() {
    const { images, status, isShowModal, selectedImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.createSearchQuerry}></Searchbar>
        {status === 'idle' && (
          <h2 className={css.appHeaders}>Please enter your search query</h2>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <h2 className={css.appHeaders}>
            Oops, something went wrong. Please try again later.
          </h2>
        )}
        {status === 'resolved' && (
          <>
            {images.length > 0 ? (
              <>
                <ImageGallery images={images} onSelect={this.onSelectImage} />
                {this.state.isShowLoadmore && (
                  <Button onClick={this.handleLoadmore}>Load more</Button>
                )}
              </>
            ) : (
              <h2 className={css.appHeaders}>
                Nothing was found. Please try another search.
              </h2>
            )}
          </>
        )}
        {isShowModal && (
          <ModalComponent
            onClose={this.toggleModal}
            selectedImage={selectedImage}
          ></ModalComponent>
        )}
      </div>
    );
  }
}
export default App;
