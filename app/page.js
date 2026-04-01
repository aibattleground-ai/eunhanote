'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StarsBg from './components/StarsBg';
import styles from './page.module.css';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2600);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.splash}>
      <StarsBg count={80} />
      <div className={styles.center}>
        <div className={styles.magicCircle}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
          <div className={styles.innerGlow} />
          <span className={styles.mainStar}>✦</span>
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>은하노트</h1>
          <p className={styles.subtitle}>사주로 읽는 나와 관계의 이야기</p>
        </div>
        <div className={styles.loadingDots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
