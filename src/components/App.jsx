import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import  fetchImages from './API/api'; 
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
        setPage(page + 1);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  const handleImageClick = (clickedImage) => {
    setSelectedImage(clickedImage);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (query !== '') {
      fetchImages(query, page)
        .then((response) => {
          setImages(response.data.hits);
          setTotalHits(response.data.totalHits);
          setPage(2);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && totalHits > images.length && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;





