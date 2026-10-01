import Link from 'next/link';
import PageHead from './PageHead';
import Faq from './Faq';
import { aboutSections } from '../data/about';

const panels = {
  'festival-of-ideas': (
    <>
      <h3>Festival of Ideas</h3>
      <div className="about-copy">
        <p>The Festival of Ideas Delhi 2026 (formerly DU Litfest at SRCC) is an intellectual and thought-leadership forum bringing together distinguished voices from the life and culture of the Indian people in a fast-moving global economic order.</p>
        <p>A joint initiative by the Festival of Ideas Foundation and Shri Ram College of Commerce, the festival brings together conversations across business, politics, economics, policy, military, global affairs, art, culture, environment, literature and beyond.</p>
        <p>May ideas come to us from everywhere.</p>
      </div>
    </>
  ),
  '100-years-of-srcc': (
    <>
      <h3>SRCC @ 100 Glorious Years</h3>
      <div className="about-copy">
        <p>Anchoring the fourth edition of the Festival of Ideas Delhi, Shri Ram College of Commerce (SRCC) celebrates a monumental landmark - 100 glorious years of shaping India&apos;s commerce, economics, and management education - a historic milestone lauded by Hon&apos;ble Prime Minister Narendra Modi.</p>
        <p>Established in 1926 as The Commercial College, the premier institute has evolved into one of the nation&apos;s most distinguished centers of learning, producing world-class leaders who shape business, finance, governance, law, cinema, and media today.</p>
        <p>Standing firmly as Asia&apos;s foremost college of commerce, the Shri Ram College of Commerce embodies a century of academic excellence and an unparalleled legacy of leadership. As it steps into its second century, the college advances with an ambitious vision - to emerge as an institution of Global Choice.</p>
        <p><strong><a href="https://www.srcc.edu/centenary-celebrations-srcc" target="_blank" rel="noopener noreferrer">For more information, click on SRCC.EDU</a></strong></p>
      </div>
    </>
  ),
  'fortress-india': (
    <>
      <h3>Fortress India</h3>
      <div className="about-copy">
        <p>Fortress India is a national movement calling upon Indians to recognise that the defence of our Republic is no longer the task of the soldier alone. National security now rests equally on how we treat our land, history, ecology, institutions, values and our understanding of each. India&apos;s strength will depend not on weaponry or rhetoric, but on the discipline, foresight, and unity of its people.</p>
        <p><strong><a href="https://fortressindia.in/" target="_blank" rel="noopener noreferrer">For more information, click on FortressIndia.in</a></strong></p>
      </div>
    </>
  ),
};

export default function AboutView({ slug }) {
  return (
    <section className="page" id="page-about">
      <div className="wrap">
        <PageHead eyebrow="ABOUT US" title="ABOUT" />
        <div className="about-tabs" role="tablist" aria-label="About Us sections">
          {aboutSections.map((s) => (
            <Link key={s.slug} href={`/about/${s.slug}`} scroll={false} role="tab" aria-selected={s.slug === slug} className={`about-tab${s.slug === slug ? ' active' : ''}`}>{s.tab}</Link>
          ))}
        </div>
        <div className="about-panel active" role="tabpanel" key={slug}>
          <div className="about-content-card">{panels[slug]}</div>
        </div>
        <Faq />
      </div>
    </section>
  );
}
