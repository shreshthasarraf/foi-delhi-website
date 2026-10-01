import FlyLink from './FlyLink';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <img src="/assets/logo-footer.png" alt="" style={{ width: 32, height: 32 }} />
              <span className="brand-text"><span className="name" style={{ color: '#fff' }}>Festival of Ideas</span></span>
            </div>
            <p>Ideas from the Life, Culture and Economy of the Indian People! Hosted by the Festival of Ideas Foundation &amp; SRCC</p>
          </div>
          <div className="foot-col">
            <h5>EXPLORE</h5>
            <FlyLink href="/speakers">Speakers</FlyLink>
            <FlyLink href="/programmes">Programmes</FlyLink>
            <FlyLink href="/gallery">Gallery</FlyLink>
          </div>
          <div className="foot-col">
            <h5>FESTIVAL</h5>
            <FlyLink href="/about">About Us</FlyLink>
            <FlyLink href="/partners">Partners</FlyLink>
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
