'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './BottomNav.module.css';

const NAV = [
  { href: '/home',          icon: '🏠', label: '홈' },
  { href: '/saju',          icon: '☯',  label: '사주' },
  { href: '/people',        icon: '👥', label: '관계노트' },
  { href: '/coach',         icon: '💬', label: '코치AI' },
  { href: '/charge',        icon: '💎', label: '구슬' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <div className={styles.navGlow} />
      {NAV.map(n => {
        const active = pathname?.startsWith(n.href);
        return (
          <Link key={n.href} href={n.href} className={`${styles.item} ${active ? styles.active : ''}`}>
            {active && <div className={styles.activeBlob} />}
            <span className={styles.icon}>{n.icon}</span>
            <span className={styles.label}>{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
