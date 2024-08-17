export default function handleKeyPress(event, activeImage, closeModal, handlePrevImage, handleNextImage) {
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowLeft' && activeImage !== null) {
    handlePrevImage();
  } else if (event.key === 'ArrowRight' && activeImage !== null) {
    handleNextImage();
  }
}
