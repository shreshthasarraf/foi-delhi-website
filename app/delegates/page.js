import PageHead from '../../components/PageHead';
import CheckList from '../../components/CheckList';
import RegistrationForm from '../../components/RegistrationForm';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/delegates');

export default function DelegatesPage() {
  return (
    <section className="page" id="page-delegates">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="JOIN THE DELEGATION" title="Register as a Delegate" desc="Take part as a delegate and engage more closely with the festival programme." descStyle={{ marginBottom: 0 }} />
            <CheckList items={['Participate in selected festival sessions', 'Connect with speakers, students and fellow delegates', 'Receive delegate-specific festival information']} />
          </div>
          <RegistrationForm kind="delegate" fields={[
            ['Name', 'text', 'Your name'],
            ['Phone Number', 'tel', 'Whatsapp Preferred'],
            ['Email', 'email', 'you@example.com'],
            ['Organisation Associated', 'text', ''],
          ]} />
        </div>
      </div>
    </section>
  );
}
