import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FcLike } from 'react-icons/fc';
import {
  StyledWrapper,
  RightCenterButton,
  LeftCenterButton,
  UnderPhotoButton,
  ImageContainer,
  StyledImage,
  Title,
  LikeButton,
  ImageInfo,
  DeleteButton,
} from './Modal.Styled';
import propTypes from 'prop-types';

export const Modal = ({ selectedPhoto, close, next, back }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        close();
        toast.info('Modal closed by Escape');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [close]);

  const handleClickOutside = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
      toast.info('Modal closed by click on backdrop');
    }
  };
  return (
    <StyledWrapper onClick={handleClickOutside}>
      <RightCenterButton onClick={next}>→</RightCenterButton>
      <LeftCenterButton onClick={back}>←</LeftCenterButton>
      <UnderPhotoButton onClick={close}>✕</UnderPhotoButton>

      <div>
        <div>
          <ImageContainer>
            <StyledImage
              src={selectedPhoto.largeImageURL}
              alt={selectedPhoto.tags}
            />
            <ImageInfo>
              <Title>{selectedPhoto.tags}</Title>
              <LikeButton>
                <FcLike />
                {selectedPhoto.likes}
              </LikeButton>
              <DeleteButton>Delete</DeleteButton>
            </ImageInfo>
          </ImageContainer>
        </div>
      </div>
    </StyledWrapper>
  );
};

Modal.propTypes = {
  close: propTypes.func.isRequired,
  selectedPhoto: propTypes.object.isRequired,
  next: propTypes.func.isRequired,
  back: propTypes.func.isRequired,
};
