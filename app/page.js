import Image from 'next/image';
import FlyLink from '../components/FlyLink';
import Countdown from '../components/Countdown';
import MemoriesMosaic from '../components/MemoriesMosaic';
import PastSpeakersCarousel from '../components/PastSpeakersCarousel';
import NotifyForm from '../components/NotifyForm';
import { pastSpeakers } from '../data/speakers';
import { absoluteUrl, SITE_NAME, SOCIAL_LINKS, staticPageMetadata } from '../lib/seo';

export const metadata = staticPageMetadata('/');

// Describe the same brand and official profiles that visitors see on this page.
const siteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      alternateName: 'Festival of Ideas',
      url: absoluteUrl('/'),
      publisher: { '@id': absoluteUrl('/#organization') },
    },
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      alternateName: 'Festival of Ideas',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/assets/logo-butterfly.png'),
      description: 'A joint initiative by the Festival of Ideas Foundation and Shri Ram College of Commerce celebrating ideas across the life, culture and economy of the Indian people.',
      sameAs: Object.values(SOCIAL_LINKS),
    },
  ],
};

const HERO_LOGO = 'https://github.com/shreshthasarraf/fest-images/blob/main/ChatGPT%20Image%20Sep%2022,%202026,%2010_40_29%20PM.png?raw=true';

const Eyebrow = ({ children }) => <div className="eyebrow"><span className="rule" /><span>{children}</span></div>;

const registerOptions = [
  { href: '/attendees', title: 'Attendees', text: 'Join and enjoy the festival.', icon: <><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M5 20c.7-3.6 3-5.5 7-5.5s6.3 1.9 7 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></> },
  { href: '/delegates', title: 'Delegates', text: 'Take part as a delegate.', icon: <><path d="M7 20V8.5A2.5 2.5 0 0 1 9.5 6h8A2.5 2.5 0 0 1 20 8.5V20H7Z" stroke="currentColor" strokeWidth="1.7" /><path d="M7 20H4V9.5A2.5 2.5 0 0 1 6.5 7H7M10 10h6M10 14h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></> },
  { href: '/volunteers', title: 'Volunteers', text: 'Join the festival team.', icon: <><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M5 20c.7-3.6 3-5.5 7-5.5s6.3 1.9 7 5.5M19 5l1 2 2 .3-1.5 1.5.4 2.2L19 10l-1.9 1-.4-2.2L15.2 7.3l2-.3 1-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></> },
];

export default function Home() {
  return (
    <section className="page" id="page-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteIdentity).replace(/</g, '\\u003c') }}
      />
      <div className="wrap">
        {/* Hero + countdown */}
        <div className="hero">
          <Image className="hero-logo" src={HERO_LOGO} alt="Festival of Ideas logo" width={120} height={120} priority />
          <h1 className="hero-title">Festival of <span className="grad">Ideas</span></h1>
          <p className="hero-sub">Ideas from the Life, Culture &amp; Economy of the Indian People!</p>
          <div className="hero-actions">
            <FlyLink className="btn-primary" href="/programmes">Explore the Festival</FlyLink>
            <FlyLink className="btn-ghost" href="/volunteers">Volunteer Programme</FlyLink>
          </div>
          <Countdown />
        </div>

        {/* About */}
        <div className="about-teaser">
          <Eyebrow>ABOUT FESTIVAL OF IDEAS</Eyebrow>
          <h2>Let noble thoughts come to us from all directions!</h2>
          <p>The Festival of Ideas Delhi 2026 (formerly the DU Litfest at SRCC) is a premier intellectual forum bringing together leading voices across the life, culture and economy of the Indian people. A joint initiative by the Festival of Ideas Foundation and Shri Ram College of Commerce, the platform aims at celebrating ideas that spark positive economic and social change in a rapidly evolving global order. Join us as we endeavour to create an accessible space that fosters curiosity, open debate, diverse perspectives, and a shared purpose among young inquisitive minds.</p>
        </div>

        {/* Venue + socials */}
        <div className="home-grid" style={{ marginTop: 70 }}>
          <div className="info-card">
            <h3><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" /></svg>Venue Details</h3>
            <div className="venue-row"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.6" /></svg><span>29th, 30th, 31st October &amp; 1st November 2026</span></div>
            <div className="venue-row"><svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" /></svg><span>Shri Ram College of Commerce, University of Delhi</span></div>
            <div className="venue-row"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg><span>Gates open 9:30 AM</span></div>
          </div>

          <div className="info-card">
            <h3><svg viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 1 0-11.32 2.7L4 21l7-2 7 2-2.68-10.3A6 6 0 0 0 18 8Z" stroke="currentColor" strokeWidth="1.6" /></svg>Follow us!</h3>
            <p style={{ fontSize: 14, opacity: 0.75, margin: '0 0 18px' }}>Behind-the-scenes, speaker announcements and highlight reels.</p>
            <div className="social-row">
              <a className="social-btn" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /></svg></a>
              {/* ponytail: X and Facebook have no account URLs yet; add an href when they exist */}
              <span className="social-btn" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="none"><path d="M18.5 4h2.7l-5.9 6.7L22 20h-5.5l-4.3-5.6L7.2 20H4.5l6.3-7.2L3 4h5.6l3.9 5.1L18.5 4Z" fill="currentColor" /></svg></span>
              <a className="social-btn" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" /><path d="M7 10v7M7 7v.01M11 17v-4.5c0-1.5 1-2.5 2.3-2.5 1.3 0 2.2 1 2.2 2.5V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></a>
              <span className="social-btn" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none"><path d="M15 8h2V4h-2c-2.2 0-4 1.8-4 4v2H9v4h2v6h4v-6h2.5l.5-4H15V8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg></span>
            </div>
          </div>
        </div>

        {/* Memories mosaic */}
        <section className="photo-grid-section" aria-labelledby="homePhotoGridTitle">
          <Eyebrow>MOMENTS FROM THE FESTIVAL</Eyebrow>
          <h2 className="home-section-title" id="homePhotoGridTitle">Memories From The Festival</h2>
          <MemoriesMosaic />
        </section>

        {/* Past speakers */}
        <div className="past-speakers-section">
          <div className="past-speakers-head">
            <h3><svg viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" /></svg>Past Speakers</h3>
            <FlyLink className="see-more-speakers" href="/speakers">See more <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></FlyLink>
          </div>
          <PastSpeakersCarousel list={pastSpeakers} />
        </div>

        {/* Registration */}
        <section className="register-section" aria-labelledby="registerTitle">
          <Eyebrow>REGISTER</Eyebrow>
          <h2 className="home-section-title" id="registerTitle">Register for the Festival</h2>
          <p className="home-section-desc">Choose how you want to take part.</p>
          <div className="register-grid">
            {registerOptions.map((o) => (
              <article key={o.href} className="register-card">
                <div className="register-icon"><svg viewBox="0 0 24 24" fill="none">{o.icon}</svg></div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <FlyLink className="register-btn" href={o.href}>Register</FlyLink>
              </article>
            ))}
          </div>
        </section>

        {/* Notify */}
        <div className="notify-band">
          <h3>Get notified</h3>
          <p>Leave your email — we&apos;ll send the schedule and speaker line-up as it&apos;s announced.</p>
          <NotifyForm />
        </div>
      </div>
    </section>
  );
}
