import PageHead from '../../components/PageHead';

export const metadata = { title: 'Partners' };

// FIXME: this screenshot was deleted from the fest-images repo (404). Upload the partners image and update the URL.
const PARTNERS_IMG = 'https://github.com/shreshthasarraf/fest-images/blob/main/Screenshot%202026-09-23%20234501.png?raw=true';

export default function PartnersPage() {
  return (
    <section className="page" id="page-partners">
      <div className="wrap">
        <PageHead eyebrow="MADE POSSIBLE BY" title="Partners" />
        <div className="partners-image-wrap">
          <img className="partners-image" src={PARTNERS_IMG} alt="Festival of Ideas partners and sponsors" />
        </div>
      </div>
    </section>
  );
}
