import PageHead from '../../components/PageHead';
import CheckList from '../../components/CheckList';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/attendees');

export default function AttendeesPage() {
  return (
    <section className="page" id="page-attendees">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="JOIN THE FESTIVAL" title="Register as an Attendee" desc="Come experience the talks, people, ideas and activities across the festival." descStyle={{ marginBottom: 0 }} />
            <CheckList items={['Access the festival programme and sessions', 'Explore the bazaar, gallery and festival spaces', 'Receive festival updates and registration details']} />
          </div>
          <div className="vol-form registration-detail-form">
            <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--plum)' }}>Coming soon</h3>
            <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>Attendee registration will open soon. Stay tuned!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
