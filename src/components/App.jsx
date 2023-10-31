import React, { useEffect, useReducer, useState } from 'react';
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
import { initialState, photosReducer } from 'Store/reducer';

export const App = () => {
  const [state, dispatch] = useReducer(photosReducer, initialState);
  const {
    loading,
    error,
    photos,
    isOpened,
    total,
    selectedPhoto,
    page,
    per_page,
    q,
    currentPhotoIndex,
  } = state;
  useEffect(() => {
    console.log('componentDidMount');
    const getPhotos = async ({ page, q }) => {
      dispatch({ type: 'leading', payload: true });
      try {
        const response = await fetchPics({
          per_page,
          page,
          q,
        });
        if (response.total === undefined || response.total <= 0) {
          setError('Total count is missing or invalid');
          dispatch({ type: 'leading', payload: false });

          toast.error('Total count is missing or invalid');
        } else {
          // setPhotos(prev => [...prev, ...response.hits]);
          dispatch({ type: 'setPhotos', payload: photos });
          // setTotal(response.total);
          dispatch({ type: 'setTotal', payload: response.total });
          // setLoading(false);
          dispatch({ type: 'leading', payload: false });
        }
      } catch (error) {
        // setError(error.message);
        dispatch({ type: 'error', payload: error.message });
        toast.error(error.message);
      } finally {
        // setLoading(false);
        dispatch({ type: 'loading', payload: false });
      }
    };
    getPhotos() && q;
  }, [page, q]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleLoadMore = () => {
    dispatch({ type: loadMore });
  };

  const handleSetQuery = q => {
    dispatch({ type: 'setQ', payload: q });
  };
  const toggleModal = selectedPhoto => {
    dispatch({ type: 'toggleModal', payload: selectedPhoto });
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
            toggleModal={toggleModal}
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
