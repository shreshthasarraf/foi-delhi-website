import PageHead from '../../components/PageHead';
import VolunteerForm from '../../components/VolunteerForm';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/volunteers');

export default function VolunteersPage() {
  return (
    <section className="page" id="page-volunteers">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="JOIN THE TEAM" title="Join the Organising Team!" />
          </div>
          <div className="vol-form">
            <VolunteerForm />
          </div>
        </div>
      </div>
    </section>
  );
}
