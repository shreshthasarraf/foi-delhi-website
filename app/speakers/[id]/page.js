import { notFound } from 'next/navigation';
import BackLink from '../../../components/BackLink';
import SpeakerAvatar, { avatarBg } from '../../../components/SpeakerAvatar';
import { allSpeakers, findSpeaker } from '../../../data/speakers';

export const dynamicParams = false;
export const generateStaticParams = () => allSpeakers.map((s) => ({ id: s.id }));

export async function generateMetadata({ params }) {
  const sp = findSpeaker((await params).id);
  return { title: sp?.name, description: sp?.role };
}

export default async function SpeakerDetail({ params }) {
  const sp = findSpeaker((await params).id);
  if (!sp) notFound();
  return (
    <section className="page" id="page-speaker-detail">
      <div className="wrap">
        <BackLink href="/speakers">Back to Speakers</BackLink>
        <div className="detail-grid">
          <div className="detail-avatar" style={avatarBg(sp)}><SpeakerAvatar sp={sp} size={400} /></div>
          <div>
            <h2 className="detail-name">{sp.name}</h2>
            <div className="detail-role">{sp.role}</div>
            <p className="detail-bio">{sp.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
