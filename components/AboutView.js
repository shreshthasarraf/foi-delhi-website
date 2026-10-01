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
      <h3>100 Years @ SRCC</h3>
      <div className="about-copy">
        <p>A century of excellence. A legacy of leadership. A future of possibilities.</p>
        <p>In 2026, Shri Ram College of Commerce (SRCC) celebrates 100 years of shaping commerce, economics and management education in India — a milestone recognised by the Honourable Prime Minister and commemorated by India Post with a special postage stamp. Founded in 1926 as The Commercial College in a modest bungalow at 8, Daryaganj, it was renamed SRCC in 1951 in honour of founder Sir Shri Ram, and moved to Delhi University&apos;s North Campus in 1954. Since then, SRCC has grown into one of India&apos;s most distinguished institutions, producing leaders across business, finance, public life, law, cinema, media and literature.</p>
        <p>Today, that legacy is reflected in its A++ NAAC grade and its long-standing recognition for commerce education. As part of its centenary, SRCC is the official partner of the Festival of Ideas, bringing together eminent voices from business, policy, literature and economics. Stepping into its second century, SRCC carries this legacy forward with one ambitious vision: to become a college of global choice.</p>
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
