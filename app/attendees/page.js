import PageHead from '../../components/PageHead';
import CheckList from '../../components/CheckList';
import RegistrationForm from '../../components/RegistrationForm';

export const metadata = { title: 'Register as an Attendee' };

export default function AttendeesPage() {
  return (
    <section className="page" id="page-attendees">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="JOIN THE FESTIVAL" title="Register as an Attendee" desc="Come experience the talks, people, ideas and activities across the festival." descStyle={{ marginBottom: 0 }} />
            <CheckList items={['Access the festival programme and sessions', 'Explore the bazaar, gallery and festival spaces', 'Receive festival updates and registration details']} />
          </div>
          <RegistrationForm kind="attendee" fields={[
            ['Name', 'text', 'Your name'],
            ['Phone Number', 'tel', 'Whatsapp Preferred'],
            ['College', 'text', 'College Name'],
            ['Course', 'text', ''],
            ['Year', 'text', ''],
            ['Email', 'email', 'you@example.com'],
          ]} />
        </div>
      </div>
    </section>
  );
}
