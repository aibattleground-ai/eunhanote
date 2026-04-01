'use client';
import styles from './GlowingGlobe.module.css';

export default function GlowingGlobe() {
  return (
    <div className={styles.globeContainer}>
      <div className={styles.globeGlow} />
      <div className={styles.globeCore}>
        {/* We use CSS patterns for the dots/atmosphere */}
        <div className={styles.atmosphere} />
        <div className={styles.dotPattern} />
      </div>
    </div>
  );
}
