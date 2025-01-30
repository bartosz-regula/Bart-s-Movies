'use client';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toaster() {
  return <ToastContainer transition={Zoom} />;
}
