import { toast, Zoom } from 'react-toastify';

export const notify = (message, type = 'success') => {
  const options = {
    position: 'top-center',
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
    transition: Zoom,
  };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  }
};
