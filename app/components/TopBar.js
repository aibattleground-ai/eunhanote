'use client';
import Link from 'next/link';
import styles from './TopBar.module.css';

export default function TopBar({ title, backHref, marbles = 12 }) {
  return (
    <header className={styles.bar}>
      <div className={styles.barGlow} />
      <div className={styles.left}>
        {backHref ? (
          <Link href={backHref} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </Link>
        ) : (
          <div className={styles.logo}>
            <span className={styles.logoStar}>✦</span>
            <span className={styles.logoText}>은하노트</span>
          </div>
        )}
      </div>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.right}>
        <Link href="/charge" className={styles.marbleBadge}>
          <span className={styles.marbleDot}>💎</span>
          <span className={styles.marbleNum}>{marbles}</span>
          <span className={styles.marbleLabel}>구슬</span>
        </Link>
      </div>
    </header>
  );
}
