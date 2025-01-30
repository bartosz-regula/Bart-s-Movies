import { toast } from 'react-toastify';

export const notify = (message, type = 'success') => {
  const options = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'dark',
  };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  }
};
