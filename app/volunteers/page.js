import PageHead from '../../components/PageHead';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/volunteers');

export default function VolunteersPage() {
  return (
    <section className="page" id="page-volunteers">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="VOLUNTEER PROGRAMME" title="Applications are closed" desc="Thank you for your interest in joining the Festival of Ideas organising team." />
          </div>
          <div className="vol-form volunteer-closed" role="status">
            <span className="volunteer-closed-label">APPLICATIONS CLOSED</span>
            <h3>We’re no longer accepting applications.</h3>
            <p>Thank you to everyone who applied. The team will contact shortlisted applicants directly with next steps.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
