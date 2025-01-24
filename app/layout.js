import Footer from './components/Footer';
import Navbar from './components/Navbar';
import '@/app/globals.css';

export const metadata = {
  title: `Bart's Movies - Your Movie Database`,
  description: 'Your Movie Database',
  icons: {
    icon: '/favicon-32x32.png',
  },
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
