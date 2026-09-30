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
            <p>Conversations for a better tomorrow. Hosted by Shri Ram College of Commerce, University of Delhi.</p>
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
