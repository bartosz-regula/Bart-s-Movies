import Footer from './components/Footer';
import Navbar from './components/Navbar';
import '@/app/globals.css';
import Toaster from './components/Toaster';
import NavbarMobile from './components/NavbarMobile';
import MobileNavigation from './components/MobileNavigation';
import HamburgerMenu from './components/HamburgerMenu';

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
        <NavbarMobile />
        {/* <HamburgerMenu /> */}
        {/* <MobileNavigation /> */}
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
