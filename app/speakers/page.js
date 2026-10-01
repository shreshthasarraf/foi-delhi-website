import Link from 'next/link';
import FlyLink from '../../components/FlyLink';
import PageHead from '../../components/PageHead';
import SpeakerAvatar, { avatarBg } from '../../components/SpeakerAvatar';
import { pastSpeakers } from '../../data/speakers';

export const metadata = { title: 'Speakers' };

const tabs = [
  { key: 'expected', label: 'Expected Speakers', href: '/speakers?tab=expected' },
  { key: 'past', label: 'Past Speakers', href: '/speakers' },
];

export default async function SpeakersPage({ searchParams }) {
  const tab = (await searchParams).tab === 'expected' ? 'expected' : 'past';

  return (
    <section className="page" id="page-speakers">
      <div className="wrap">
        <PageHead eyebrow="WHO'S SPEAKING" title="Speakers" />

        <div className="tab-row" role="tablist">
          {tabs.map((t) => (
            <Link key={t.key} href={t.href} scroll={false} replace role="tab" aria-selected={tab === t.key} className={`tab-btn${tab === t.key ? ' active' : ''}`}>{t.label}</Link>
          ))}
        </div>

        <div className="speaker-grid">
          {tab === 'expected' ? (
            // ponytail: expected list kept in data/speakers.js; render it here once the line-up is announced
            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', fontSize: 22, fontWeight: 600, color: 'var(--plum)' }}>Coming soon!</p>
          ) : pastSpeakers.map((sp) => (
            <div key={sp.id} className="speaker-card">
              <FlyLink href={`/speakers/${sp.id}`} className="avatar-btn" style={avatarBg(sp)}>
                <SpeakerAvatar sp={sp} size={260} />
              </FlyLink>
              <h4>{sp.name}</h4>
              <div className="role">{sp.role}</div>
              <span className="tag">Featured</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
