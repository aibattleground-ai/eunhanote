'use client';
import { useEffect, useRef } from 'react';

export default function StarsBg({ count = 60 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.7 + 0.1};
        animation-duration: ${Math.random() * 4 + 2}s;
        animation-delay: ${Math.random() * 3}s;
      `;
      container.appendChild(star);
    }
  }, [count]);

  return <div ref={containerRef} className="stars-bg" />;
}
