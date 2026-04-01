'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SakuraFalling from './components/SakuraFalling';
import styles from './page.module.css';

export default function RootPage() {
  const router = useRouter();
  const [phase, setPhase] = useState('start'); // 'start' | 'video' | 'splash'
  const [canSkip, setCanSkip] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/eunhanote' : '';

  useEffect(() => {
    if (phase === 'splash') {
      const t = setTimeout(() => router.push('/login'), 2800);
      return () => clearTimeout(t);
    }
  }, [phase, router]);

  const handleStart = () => setPhase('video');
  const handleVideoEnd = () => setPhase('splash');

  return (
    <div className={styles.container}>
      {phase === 'start' && (
        <div className={styles.startWrap} onClick={handleStart}>
          <div className={styles.startPill}>
            <span>🌸 화면을 터치해 시작하기</span>
          </div>
        </div>
      )}
      {phase === 'video' && (
        <div className={styles.videoWrap} onClick={() => canSkip && handleVideoEnd()}>
          <video 
            src={`${basePath}/intro.mp4`} 
            autoPlay 
            playsInline 
            onTimeUpdate={(e) => {
              if (e.target.currentTime > 5 && !canSkip) {
                setCanSkip(true);
              }
            }}
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className={styles.introVideo}
          />
          {canSkip && <div className={styles.skipHint}>화면을 터치해서 스킵하기</div>}
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
