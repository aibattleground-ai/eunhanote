'use client';
import Link from 'next/link';
import styles from './TopBar.module.css';

export default function TopBar({ title, backHref, rightAction }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {backHref ? (
          <Link href={backHref} className={styles.backBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </Link>
        ) : (
          <div className={styles.logo}>
            <span className={styles.logoStar}>✦</span>
            <span className={styles.logoText}>은하노트</span>
          </div>
        )}
      </div>

      {title && <h1 className={styles.title}>{title}</h1>}

      <div className={styles.right}>
        {rightAction || (
          <Link href="/charge" className={styles.marbleBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#F9A8D4" stroke="none">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span className={styles.marbleCount}>12</span>
            <span className={styles.marbleLabel}>구슬</span>
          </Link>
        )}
      </div>
    </header>
  );
}
