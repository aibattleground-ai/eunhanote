'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SakuraFalling from './components/SakuraFalling';
import styles from './page.module.css';

export default function RootPage() {
  const router = useRouter();
  const [phase, setPhase] = useState('video'); // 'video' | 'splash'

  useEffect(() => {
    if (phase === 'splash') {
      const t = setTimeout(() => router.push('/login'), 2800);
      return () => clearTimeout(t);
    }
  }, [phase, router]);

  const handleVideoEnd = () => {
    setPhase('splash');
  };

  return (
    <div className={styles.container}>
      {phase === 'video' && (
        <div className={styles.videoWrap} onClick={handleVideoEnd}>
          <video 
            src="/123.mov" 
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideoEnd}
            className={styles.introVideo}
          />
          <div className={styles.skipHint}>화면을 터치해서 스킵하기</div>
        </div>
      )}

      {phase === 'splash' && (
        <div className={styles.splash}>
          <SakuraFalling count={30} />
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
      )}
    </div>
  );
}
