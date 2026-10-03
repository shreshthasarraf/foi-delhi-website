import { notFound } from 'next/navigation';
import BackLink from '../../../components/BackLink';
import { programmes, findProgramme } from '../../../data/programmes';
import { pageMetadata } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () =>
  programmes.map((p) => ({
    id: p.id,
  }));

export async function generateMetadata({ params }) {
  const programme = findProgramme((await params).id);
  if (!programme) notFound();
  return pageMetadata({
    path: `/programmes/${programme.id}`,
    title: programme.detailTitle,
    description: programme.blurb,
    image: programme.image,
  });
}

export default async function ProgrammeDetail({ params }) {
  const pr = findProgramme((await params).id);

  if (!pr) {
    notFound();
  }

  return (
    <section className="page" id="page-prog-detail">

      <div className="wrap">

        <BackLink href="/programmes">
          Back to Festival Layout
        </BackLink>

        <div className="detail-grid">

          <img
            className="detail-image"
            src={pr.image}
            alt={pr.detailTitle}
          />

          <div>

            <h2 className="detail-name">
              {pr.detailTitle}
            </h2>

            <p className="detail-bio">
              {pr.description}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
