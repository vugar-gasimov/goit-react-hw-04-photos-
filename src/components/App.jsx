import React, { useContext, useEffect, useState, useReducer } from 'react';
import { ImageGallery } from './Image-finder/ImageGallery';
import { Searchbar } from './Image-finder/Searchbar';
import { LoadMoreButton } from './Image-finder/Button';
import { Modal } from './Modal-window/Modal';
import { fetchPics } from '../Services/api';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';

import {
  ContentContainer,
  GalleryTitle,
  LoaderContainer,
  LoginForm,
  InputField,
  LoginButton,
} from './App.Styled';
import photosReducer, { initialState } from '../Store/reducer';
import { MyContext } from 'Context/ContextProvider';

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
  } = state;
  const { user, isLoggedIn, login, logout } = useContext(MyContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const getPhotos = async ({ page, q }) => {
      dispatch({ type: 'leading', payload: true });
      try {
        const response = await fetchPics({
          per_page,
          page,
          q,
        });
        if (response.total === undefined || response.total <= 0) {
          dispatch({
            type: 'error',
            payload: 'Total count is missing or invalid',
          });
          toast.error('Total count is missing or invalid');
          dispatch({ type: 'leading', payload: false });

          toast.error('Total count is missing or invalid');
        } else {
          dispatch({ type: 'setPhotos', payload: response.hits });

          dispatch({ type: 'setTotal', payload: response.total });
          dispatch({ type: 'leading', payload: false });
        }
      } catch (error) {
        dispatch({ type: 'error', payload: error.message });
        toast.error(error.message);
      } finally {
        dispatch({ type: 'loading', payload: false });
      }
    };
    getPhotos({ page, q });
  }, [page, q, per_page]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleLoadMore = () => {
    dispatch({ type: 'loadMore' });
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
      currentPhotoIndex: photos.indexOf(selectedPhoto),
    };
  };

  const handleLikes = photo => {
    dispatch({ type: 'handleLikes', payload: photo });
  };
  const handleNext = () => {
    if (Array.isArray(photos) && photos.length > 0) {
      dispatch({ type: 'handleNext' });
    } else {
      console.error('No photos or invalid photos array!');
    }
  };

  const handleBack = () => {
    if (Array.isArray(photos) && photos.length > 0) {
      dispatch({ type: 'handleBack' });
    } else {
      console.error('No photos or invalid photos array!');
    }
  };
  const handleLogin = () => {
    login(username, password);

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <ContentContainer>
        {!isLoggedIn ? (
          <div>
            <LoginForm>
              <InputField
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <LoginButton onClick={handleLogin}>Login</LoginButton>
            </LoginForm>
          </div>
        ) : (
          <div>
            <div>
              <Searchbar setQuery={handleSetQuery}></Searchbar>
              <GalleryTitle>Welcome, {user}!</GalleryTitle>
              <LoginButton onClick={handleLogout}>Logout</LoginButton>
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
                    height="250"
                    width="250"
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
                  close={() => dispatch({ type: 'closeModal' })}
                  selectedPhoto={selectedPhoto}
                  next={handleNext}
                  back={handleBack}
                  changePhoto={index =>
                    dispatch({ type: 'changePhoto', payload: index })
                  }
                />
              ) : null}
            </div>
          </div>
        )}
      </ContentContainer>
    </div>
  );
};
