import AboutView from '../../components/AboutView';
import { aboutSections } from '../../data/about';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return <AboutView slug={aboutSections.find((s) => s.default).slug} />;
}
