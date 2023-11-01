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
    case 'handleLikes':
      return {
        ...state,
        photos: state.photos.map(el =>
          el.id === action.payload.id ? { ...el, likes: el.likes + 1 } : el
        ),
      };

    case 'handleNext':
      return {
        ...state,
        currentPhotoIndex: (state.currentPhotoIndex + 1) % state.photos.length,
        selectedPhoto:
          state.photos[(state.currentPhotoIndex + 1) % state.photos.length],
      };

    case 'handleBack':
      return {
        ...state,
        currentPhotoIndex: (state.currentPhotoIndex - 1) % state.photos.length,
        selectedPhoto:
          state.photos[(state.currentPhotoIndex - 1) % state.photos.length],
      };

    case 'closeModal':
      return {
        ...state,
        isOpened: false,
      };
    default:
      return state;
  }
};

export default photosReducer;
