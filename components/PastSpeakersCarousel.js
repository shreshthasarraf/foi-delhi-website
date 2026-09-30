'use client';

import { useEffect, useRef } from 'react';
import FlyLink from './FlyLink';
import SpeakerAvatar, { avatarBg } from './SpeakerAvatar';

// Endless drifting strip (list rendered twice); drag/swipe to scrub, click opens the speaker.
export default function PastSpeakersCarousel({ list, speed = 0.45 }) {
  const wrap = useRef(null);
  const track = useRef(null);
  const dragged = useRef(false);

  useEffect(() => {
    const w = wrap.current, t = track.current;
    let pos = 0, half = 1, isDown = false, startX = 0, startPos = 0, raf;
    const measure = () => { half = t.scrollWidth / 2 || 1; };
    const wrapPos = () => { if (pos > 0) pos -= half; if (pos <= -half) pos += half; };
    const frame = () => {
      if (!isDown) { pos -= speed; wrapPos(); }
      t.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(frame);
    };
    const down = (x) => { isDown = true; startX = x; startPos = pos; dragged.current = false; w.classList.add('dragging'); };
    const move = (x) => {
      if (!isDown) return;
      if (Math.abs(x - startX) > 4) dragged.current = true;
      pos = startPos + x - startX;
      wrapPos();
    };
    const up = () => { isDown = false; w.classList.remove('dragging'); };
    const onMouseDown = (e) => { down(e.clientX); e.preventDefault(); };
    const onMouseMove = (e) => move(e.clientX);
    const onTouchStart = (e) => down(e.touches[0].clientX);
    const onTouchMove = (e) => move(e.touches[0].clientX);

    measure();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', measure);
    w.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', up);
    w.addEventListener('touchstart', onTouchStart, { passive: true });
    w.addEventListener('touchmove', onTouchMove, { passive: true });
    w.addEventListener('touchend', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      w.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', up);
      w.removeEventListener('touchstart', onTouchStart);
      w.removeEventListener('touchmove', onTouchMove);
      w.removeEventListener('touchend', up);
    };
  }, [speed]);

  return (
    <div className="ps-carousel" ref={wrap}>
      <div className="ps-track" ref={track}>
        {[0, 1].map((rep) => list.map((sp) => (
          <FlyLink
            key={rep + sp.id}
            href={`/speakers/${sp.id}`}
            className="ps-item"
            draggable={false}
            aria-hidden={rep === 1 || undefined}
            tabIndex={rep === 1 ? -1 : undefined}
            onClick={(e) => { if (dragged.current) e.preventDefault(); }}
          >
            <div className="ps-avatar" style={avatarBg(sp)}><SpeakerAvatar sp={sp} size={98} /></div>
            <div className="ps-name">{sp.name}</div>
            <div className="ps-role">{sp.role}</div>
          </FlyLink>
        )))}
      </div>
    </div>
  );
}
