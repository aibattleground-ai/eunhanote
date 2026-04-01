'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StarsBg from './components/StarsBg';
import styles from './page.module.css';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.push('/login'), 2800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className={styles.splash}>
      <StarsBg count={90} />
      <div className={styles.center}>
        <div className={styles.magicCircle}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
          <div className={styles.ring4} />
          <div className={styles.innerGlow} />
          <div className={styles.circleStars}>
            <span>✦</span><span>✧</span><span>★</span>
            <span>✦</span><span>✧</span><span>⋆</span>
          </div>
          <span className={styles.orbStar}>✦</span>
        </div>
        <div className={styles.titleGroup}>
          <p className={styles.titleSub}>✦ A I  M A G I C  N O T E ✦</p>
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
