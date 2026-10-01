const paths = {
  talks: (
    <path
      d="M8 10h8M8 14h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),

  stalls: (
    <path
      d="M4 9l1-5h14l1 5-1 1v9H5v-9L4 9z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),

  competitions: (
    <path
      d="M12 2.6 3.6 6.9 12 11.2l8.4-4.3L12 2.6zM6 9.8v5.2l6 3.1 6-3.1V9.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),

  rupee: (
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="16"
      fontWeight="700"
      fill="currentColor"
    >
      ₹
    </text>
  ),

  books: (
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
};

export default function ProgIcon({ name }) {
  return (
    <div className="prog-icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths[name]}
      </svg>
    </div>
  );
}
