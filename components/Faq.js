'use client';

import { useState } from 'react';

const faqs = [
  ['Who can attend Festival of Ideas?', 'The festival is open to students, faculty and the public. Some workshops have limited seats and require registration.'],
  ['Is there an entry fee?', 'Entry to the venue is free. One must register as an attendee in order to enter the venue. Seats are on a first come, first served basis.'],
  ['Can I still apply to volunteer?', 'Volunteer applications are now closed. Thank you for your interest; shortlisted applicants will be contacted directly by the team.'],
  ['Where can I see the schedule?', 'Detailed day-wise timings are shared under Festival Layout closer to the festival, and by email if you sign up on the Home page.'],
  ['How can my organisation partner with the festival?', 'Reach out through the contact details in the footer — the partnerships team reviews proposals on a rolling basis.'],
];

export default function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        <div key={q} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {q}
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          {/* ponytail: fixed max-height instead of measuring; answers are one or two lines */}
          <div className="faq-a" style={{ maxHeight: open === i ? 300 : null }}><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}
