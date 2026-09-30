const paths = {
  talks: <><path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" /></>,
  stalls: <path d="M4 9l1-5h14l1 5M4 9v10h16V9M4 9h16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  competitions: <path d="M12 2l2.6 6.3L21 9l-5 4.4L17.4 21 12 17.3 6.6 21 8 13.4 3 9l6.4-.7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  performances: <><path d="M9 18V5l11-2v13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" /><circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" /></>,
  books: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13ZM20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" stroke="currentColor" strokeWidth="1.5" />,
};

export default function ProgIcon({ name }) {
  return <div className="prog-icon"><svg viewBox="0 0 24 24" fill="none">{paths[name]}</svg></div>;
}
