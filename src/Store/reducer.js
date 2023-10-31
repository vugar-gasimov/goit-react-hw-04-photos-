import React from 'react';
export const initialState = {
  loading: false,
  error: null,
  photos: [],
  isOpened: false,
  total: null,
  selectedPhoto: null,
  page: 1,
  per_page: 12,
  q: '',
  currentPhotoIndex: 0,
};

const photosReducer = (state, action) => {
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case 'loadMore':
      return {
        ...state,
        page: state.page + 1,
      };

    case 'leading':
      return {
        ...state,
        loading: payload,
      };
    case 'setPhotos':
      return {
        ...state,
        photos: [...state.photos, ...payload],
      };
    case 'setTotal':
      return {
        ...state,
        total: payload,
      };
    case 'error':
      return {
        ...state,
        error: payload,
      };
    case 'setQ':
      return {
        ...state,
        total: null,
        q: payload,
        photos: [],
        page: 1,
      };
    case 'toggleModal':
      return { ...state, isOpened: !state.isOpen, selectedPhoto: payload };
    default:
      return state;
  }
  return <div>reducer</div>;
};

export default reducer;
