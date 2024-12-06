import { Ring } from 'react-css-spinners';

export default function Spinner({ size = 30, className }) {
  return <Ring color="#1E57D8" size={size} className={className} />;
}
