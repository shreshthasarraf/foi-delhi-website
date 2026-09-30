import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/base.css';
import '../styles/nav.css';
import '../styles/home.css';
import '../styles/mosaic.css';
import '../styles/speakers.css';
import '../styles/pages.css';
import '../styles/gallery.css';
import '../styles/forms.css';

export const metadata = {
  metadataBase: new URL('https://festivalofideas.org'),
  title: { default: 'Festival of Ideas — Delhi | 4th Edition', template: '%s | Festival of Ideas — Delhi' },
  description: 'Ideas from the Life, Culture & Economy of the Indian People! 29 October – 1 November 2026 at Shri Ram College of Commerce, University of Delhi.',
  icons: { icon: '/assets/logo-butterfly.png' },
};

const bfly = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 11c-1.5-4-6-7-9-6-1 3 1 7 5 8-3 1-5 4-4 7 3 1 7-1 8-4 1 3 5 5 8 4 1-3-1-6-4-7 4-1 6-5 5-8-3-1-7.5 2-9 6Z" opacity=".9" /></svg>;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="bfly-layer" aria-hidden="true">
          {['b1', 'b2', 'b3', 'b4'].map((b) => <div key={b} className={`bfly ${b}`}>{bfly}</div>)}
        </div>
        <div id="flyOverlay" />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
