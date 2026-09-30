import AboutView from '../../../components/AboutView';
import { aboutSections } from '../../../data/about';

export const dynamicParams = false;
export const generateStaticParams = () => aboutSections.map((s) => ({ section: s.slug }));

export async function generateMetadata({ params }) {
  const { section } = await params;
  return { title: aboutSections.find((s) => s.slug === section).tab };
}

export default async function AboutSectionPage({ params }) {
  return <AboutView slug={(await params).section} />;
}
