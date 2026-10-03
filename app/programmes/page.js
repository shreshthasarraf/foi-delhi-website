import FlyLink from '../../components/FlyLink';
import PageHead from '../../components/PageHead';
import ProgIcon from '../../components/ProgIcon';
import { programmes } from '../../data/programmes';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/programmes');

export default function ProgrammesPage() {
  return (
    <section className="page" id="page-programmes">
      <div className="wrap">

        <PageHead title="Festival Layout" />

        <div className="prog-grid">

          {programmes.map((p) => (
            <FlyLink
              key={p.id}
              href={`/programmes/${p.id}`}
              className="prog-card"
            >

              <img
                className="prog-image"
                src={p.image}
                alt={p.alt}
                loading="lazy"
              />

              <ProgIcon name={p.icon} />

              <h4>{p.title}</h4>

              <p>{p.blurb}</p>

            </FlyLink>
          ))}

        </div>

      </div>
    </section>
  );
}
