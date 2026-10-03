'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FlyLink from './FlyLink';
import { aboutSections } from '../data/about';

const speakerLinks = [
  { href: '/speakers', label: 'Past Speakers' },
  { href: '/speakers?tab=expected', label: 'Expected Speakers' },
];
const aboutLinks = aboutSections.map((s) => ({ href: `/about/${s.slug}`, label: s.tab }));

const Chev = (props) => (
  <svg className="chev" viewBox="0 0 24 24" fill="none" {...props}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Drop({ id, label, links, open, setOpen, close }) {
  return (
    <div className={`drop${open ? ' open' : ''}`} onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      <button type="button" aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        {label}
        <Chev />
      </button>
      <div className="drop-menu" id={id}>
        {links.map((l) => <FlyLink key={l.href} href={l.href} onClick={close}>{l.label}</FlyLink>)}
      </div>
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(null); // 'speakers' | 'about' | null
  const [mobile, setMobile] = useState(false);
  const [mSub, setMSub] = useState({ speakers: false, about: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onDocClick = () => setDrop(null);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  const closeAll = () => { setDrop(null); setMobile(false); };
  const navLink = (href, label) => (
    <FlyLink href={href} onClick={closeAll} className={`nav-link${pathname === href ? ' active' : ''}`}>{label}</FlyLink>
  );
  const mLink = (href, label) => <FlyLink href={href} onClick={closeAll} className="m-link">{label}</FlyLink>;
  const mToggle = (key, label, links) => (
    <>
      <button type="button" className="m-link" aria-expanded={mSub[key]} onClick={() => setMSub({ ...mSub, [key]: !mSub[key] })}>
        {label}
        <Chev width="12" height="12" style={{ float: 'right' }} />
      </button>
      <div className={`mobile-sub${mSub[key] ? ' open' : ''}`}>
        {links.map((l) => <FlyLink key={l.href} href={l.href} onClick={closeAll}>{l.label}</FlyLink>)}
      </div>
    </>
  );

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="siteNav">
        <div className="wrap nav-inner">
          <FlyLink href="/" className="brand" onClick={closeAll}>
            <img src="/assets/logo-butterfly.png" alt="" />
          </FlyLink>

          <nav className="links">
            {navLink('/', 'Home')}
            <Drop id="speakerMenu" label="Speakers" links={speakerLinks} open={drop === 'speakers'} setOpen={(o) => setDrop(o ? 'speakers' : null)} close={() => setDrop(null)} />
            {navLink('/partners', 'Past Partners')}
            {navLink('/programmes', 'Festival Layout')}
            {navLink('/gallery', 'Gallery')}
            <Drop id="aboutMenu" label="About Us" links={aboutLinks} open={drop === 'about'} setOpen={(o) => setDrop(o ? 'about' : null)} close={() => setDrop(null)} />
            {navLink('/volunteers', 'Volunteer Programme')}
          </nav>

          <button className={`burger${mobile ? ' open' : ''}`} aria-label="Open menu" onClick={() => setMobile(true)}><span /><span /><span /></button>
        </div>
      </header>

      <div className={`scrim${mobile ? ' show' : ''}`} onClick={() => setMobile(false)} />
      <div className={`mobile-panel${mobile ? ' open' : ''}`} inert={!mobile}>
        <div className="close-row">
          <button className="burger open" aria-label="Close menu" style={{ display: 'flex' }} onClick={() => setMobile(false)}><span /><span /><span /></button>
        </div>
        {mLink('/', 'Home')}
        {mToggle('speakers', 'Speakers', speakerLinks)}
        {mLink('/partners', 'Past Partners')}
        {mLink('/programmes', 'Festival Layout')}
        {mLink('/gallery', 'Gallery')}
        {mToggle('about', 'About Us', aboutLinks)}
        {mLink('/volunteers', 'Volunteer Programme')}
      </div>
    </>
  );
}
