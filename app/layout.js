import Footer from './components/Footer';
import Navbar from './components/Navbar';
import '@/app/globals.css';

export const metadata = {
  title: `Bart's Movies`,
  description: 'Your Movie Database',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
