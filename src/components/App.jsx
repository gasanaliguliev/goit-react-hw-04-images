import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImages();
    }
  }, [query]);

  const fetchImages = () => {
    setIsLoading(true);

    const apiKey = '38971521-301f5cb08025e3967497dc80d';
    axios
      .get(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=12`
      )
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
        setPage((prevPage) => prevPage + 1);
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

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (clickedImage) => {
    setSelectedImage(clickedImage);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && totalHits > images.length && (
        <Button onClick={fetchImages} />
      )}
      {showModal && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;


