import PageHead from '../../components/PageHead';
import VolunteerForm from '../../components/VolunteerForm';

export const metadata = {
  title: 'Volunteers',
  description: 'Apply to join the Festival of Ideas Delhi 2026 organising team — 29 October to 1 November at SRCC, University of Delhi.',
};

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
