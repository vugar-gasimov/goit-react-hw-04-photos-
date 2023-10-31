import React, { useEffect, useState } from 'react';
import { ImageGallery } from './Image-finder/ImageGallery';
import { Searchbar } from './Image-finder/Searchbar';
import { LoadMoreButton } from './Image-finder/Button';
import { Modal } from './Modal-window/Modal';
import { fetchPics } from '../Services/api';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';

import {
  AppContainer,
  TitleContainer,
  ContentContainer,
  GalleryTitle,
  LoaderContainer,
} from './App.Styled';

// import { INITIAL_STATE_POSTS } from './Image-finder/InitialState.js';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [total, setTotal] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [q, setQ] = useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    console.log('componentDidMount');
  }, []);
  useEffect(() => {
    console.log('ComponentDidUpdate');
    const getPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetchPics({
          per_page,
          page,
          q,
        });
        if (response.total === undefined || response.total <= 0) {
          setError('Total count is missing or invalid');
          setLoading(false);

          toast.error('Total count is missing or invalid');
        } else {
          setPhotos(prev => [...prev, ...response.hits]);
          setTotal(response.total);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPhotos();
  }, [page, q]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSetQuery = q => {
    setQ(q);
    setPhotos([]);
    setTotal(null);
    setPage(1);
  };
  const toggleModal = photo => {
    setIsOpened(prev => !prev);
    if (isOpened) {
      toast.success('Wow what a beauty 😁');
    } else {
      toast.success("Let's choose another photo 😁");
    }
    return {
      isOpened,
      currentPhotoIndex: photos.indexOf(photo),
    };
  };

  const handleLikes = photo => {
    setPhotos(prev =>
      prev.map(el => (el.id === photo.id ? { ...el, likes: el.likes + 1 } : el))
    );
  };
  const handleNext = () => {
    if (Array.isArray(photos) && photos.length > 0) {
      setCurrentPhotoIndex((currentPhotoIndex + 1) % photos.length);
    } else {
      console.error('No photos or invalid photos array!');
    }
  };

  const handleBack = () => {
    if (Array.isArray(photos) && photos.length > 0) {
      setCurrentPhotoIndex((currentPhotoIndex - 1) % photos.length);
    } else {
      console.error('No photos or invalid photos array!');
    }
  };

  return (
    <AppContainer>
      <TitleContainer>React homework template</TitleContainer>
      <ContentContainer>
        <Searchbar setQuery={handleSetQuery} />
        {q && (
          <GalleryTitle>
            Image Gallery search request: {q} and results: {total}
          </GalleryTitle>
        )}
        <h2>{error}</h2>
        {loading && !photos.length ? (
          <LoaderContainer>
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </LoaderContainer>
        ) : (
          <ImageGallery
            photos={photos}
            handleLikes={handleLikes}
            toggleModal={() => {
              setIsOpened(!isOpened);
            }}
          />
        )}
        {total > photos.length ? (
          <LoadMoreButton loading={loading} onClick={handleLoadMore} />
        ) : null}
        {isOpened && selectedPhoto ? (
          <Modal
            close={() => setIsOpened(false)}
            selectedPhoto={selectedPhoto}
            next={handleNext}
            back={handleBack}
            changePhoto={index => setCurrentPhotoIndex(index)}
          />
        ) : null}
      </ContentContainer>
    </AppContainer>
  );
};
