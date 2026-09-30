'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-10-29T09:30:00+05:30').getTime();
const pad = (n) => String(n).padStart(2, '0');

function remaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return [Math.floor(diff / 86400000), Math.floor((diff % 86400000) / 3600000), Math.floor((diff % 3600000) / 60000), Math.floor((diff % 60000) / 1000)];
}

export default function Countdown() {
  // Starts at zeros so server and client HTML match; real values fill in after mount.
  const [parts, setParts] = useState([0, 0, 0, 0]);
  useEffect(() => {
    setParts(remaining());
    const t = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="countdown-row">
      {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((lbl, i) => (
        <div key={lbl} className="cd-box"><div className="num">{pad(parts[i])}</div><div className="lbl">{lbl}</div></div>
      ))}
    </div>
  );
}
