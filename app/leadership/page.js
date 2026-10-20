import PageHead from '../../components/PageHead';
import SpeakerAvatar, { avatarBg } from '../../components/SpeakerAvatar';
import { leadership } from '../../data/leadership';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/leadership');

const bg = avatarBg({ color: ['#3B1653', '#C23764'] });

export default function LeadershipPage() {
  return (
    <section className="page" id="page-leadership">
      <div className="wrap">
        <PageHead eyebrow="ABOUT US" title="Leadership" />
        {leadership.map((group) => (
          <div key={group.title} className="leader-group">
            <h3>{group.title}</h3>
            <div className="speaker-grid leader-grid">
              {group.people.map((p) => (
                <div key={p.name} className="speaker-card">
                  <div className="avatar-btn" style={p.image ? undefined : bg}>
                    <SpeakerAvatar sp={p} size={260} />
                  </div>
                  {p.tag && <span className="tag">{p.tag}</span>}
                  <h4>{p.name}</h4>
                  <div className="role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
