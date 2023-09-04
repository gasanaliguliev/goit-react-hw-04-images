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
      setPage(page + 1);
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
    if(query === '') return;
    const fetchData = async () => {
      try{
        const{ data } = await fetchImages(query, page);

        setImages(prev => [...prev,...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {} 
      finally {
          setIsLoading(false); 
        }
      };

    fetchData();
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





