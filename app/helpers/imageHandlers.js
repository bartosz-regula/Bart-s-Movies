export const handleImageClick = (index, setActiveImage) => {
  setActiveImage(index);
};

export const handleNextImage = (images, activeImage, setActiveImage) => {
  setActiveImage((prevIndex) => {
    const nextIndex = (prevIndex + 1) % images.length;
    return nextIndex < 0 ? images.length - 1 : nextIndex;
  });
};

export const handlePrevImage = (images, activeImage, setActiveImage) => {
  setActiveImage((prevIndex) => {
    const prevIndexWrap = (prevIndex - 1 + images.length) % images.length;
    return prevIndexWrap < 0 ? images.length - 1 : prevIndexWrap;
  });
};
