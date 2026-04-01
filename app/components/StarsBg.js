'use client';
import { useEffect, useRef } from 'react';

export default function StarsBg({ count = 60 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      // Alternate between white, pink, gold stars
      const colors = ['255,255,255','249,168,212','245,158,11','167,139,250'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      s.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        background: rgb(${color});
        opacity:${Math.random()*0.7+0.1};
        animation-duration:${Math.random()*4+2}s;
        animation-delay:${Math.random()*4}s;
      `;
      c.appendChild(s);
    }
  }, [count]);
  return <div ref={ref} className="stars-bg" />;
}
