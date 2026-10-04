import FlyLink from './FlyLink';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/assets/logo-footer-full.png" alt="Festival of Ideas Delhi" style={{ width: 220, maxWidth: '100%', height: 'auto' }} />
            <p>Ideas from the Life, Culture and Economy of the Indian People! Hosted by the Festival of Ideas Foundation &amp; SRCC</p>
          </div>
          <div className="foot-col">
            <h5>EXPLORE</h5>
            <FlyLink href="/speakers">Speakers</FlyLink>
            <FlyLink href="/programmes">Festival Layout</FlyLink>
            <FlyLink href="/gallery">Gallery</FlyLink>
          </div>
          <div className="foot-col">
            <h5>FESTIVAL</h5>
            <FlyLink href="/about">About Us</FlyLink>
            <FlyLink href="/partners">Past Partners</FlyLink>
            <FlyLink href="/volunteers">Volunteers</FlyLink>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Festival of Ideas, SRCC. All rights reserved.</span>
          <span>Celebrating 100 years of Shri Ram College of Commerce</span>
        </div>
      </div>
    </footer>
  );
}
