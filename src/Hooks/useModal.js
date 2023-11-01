// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// export const useModal = () => {
//   const [isOpened, setIsOpened] = useState(false);
//   const [selectedPhoto, setSelectedPhoto] = useState({});
//   const [next, setNext] = useState(() => {});
//   const [back, setBack] = useState(() => {});

//   const openModal = (photo, nextFunc, backFunc) => {
//     setIsOpened(true);
//     setSelectedPhoto(photo);
//     setNext(() => nextFunc);
//     setBack(() => backFunc);
//     document.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeModal = () => {
//     setIsOpened(false);
//     setSelectedPhoto({});
//     setNext(() => {});
//     setBack(() => {});
//     document.removeEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'visible';
//     toast.info('Modal closed');
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Escape') {
//       closeModal();
//       toast.info('Modal closed by Escape');
//     }
//   };

//   const handleClickOutside = ({ target, currentTarget }) => {
//     if (target === currentTarget) {
//       closeModal();
//       toast.info('Modal closed by click on backdrop');
//     }
//   };

//   useEffect(() => {
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'visible';
//     };
//   }, [close]);

//   return {
//     isOpened,
//     openModal,
//     closeModal,
//     selectedPhoto,
//     next,
//     back,
//     handleClickOutside,
//   };
// };
