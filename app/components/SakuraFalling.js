'use client';
import { useEffect, useState } from 'react';
import styles from './SakuraFalling.module.css';

export default function SakuraFalling({ count = 15 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      left: Math.random() * 100,
      size: Math.random() * 10 + 8, // 8px ~ 18px
      animDurationFall: Math.random() * 10 + 10, // 10s ~ 20s
      animDelayFall: Math.random() * 15,
      animDurationSway: Math.random() * 3 + 2, // 2s ~ 5s
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div className={styles.sakuraContainer}>
      {petals.map((p, i) => (
        <div 
          key={i}
          className={styles.petalWrap}
          style={{
            left: `${p.left}vw`,
            animation: `fall ${p.animDurationFall}s linear ${p.animDelayFall}s infinite`
          }}
        >
          <div 
            className={styles.petal}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `sway ${p.animDurationSway}s ease-in-out infinite alternate`
            }}
          />
        </div>
      ))}
    </div>
  );
}
